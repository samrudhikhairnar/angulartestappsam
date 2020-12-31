import { GraphQLServer } from 'graphql-yoga'
import * as jwt from "jsonwebtoken";
const { forwardTo, Prisma } = require('prisma-binding')
import { rule, shield, and, or, not } from 'graphql-shield'
import { auth } from './auth/auth';
import { customMutation } from './resolvers/Mutation/customMutation';
import { mergeTypes } from 'merge-graphql-schemas';
import { customtypeDefs } from './resolvers/customResolver/customSchema';
import { customResolver, customQuery} from './resolvers/customResolver/customResolver';
import { typeDefs } from './generated/prisma-schema';
import { countriesQueries } from './resolvers/customResolver/countriesResolver';

const resolvers = {
  Query : {
    ...auth,
    ...customQuery,
    ...countriesQueries,
    plugin                    : forwardTo ('db'),
    // plugins                   : forwardTo ('db'),
    connector                 : forwardTo ('db'),
    // connectors                : forwardTo ('db'),
    pluginCategory            : forwardTo ('db'),
    pluginCategories          : forwardTo ('db'),
    entity                    : forwardTo ('db'),
    entities                  : forwardTo ('db'),
    entityMap                 : forwardTo ('db'),
    entityMaps                : forwardTo ('db'), 
    field                     : forwardTo ('db'), 
    fields                    : forwardTo ('db'), 
    fieldMap                  : forwardTo ('db'), 
    fieldMaps                 : forwardTo ('db'), 
    process                   : forwardTo ('db'), 
    processes                 : forwardTo ('db'), 
    schedule                  : forwardTo ('db'), 
    // schedules                 : forwardTo ('db'),
    testimonial               : forwardTo ('db'),
    testimonials              : forwardTo ('db'),
    log                       : forwardTo ('db'), 
    // logs                      : forwardTo ('db'), 
    pluginParam               : forwardTo ('db'), 
    pluginParams              : forwardTo ('db'), 
    user                      : forwardTo ('db'), 
    users                     : forwardTo ('db'), 
    processHistory            : forwardTo ('db'),
    processHistories          : forwardTo ('db'),
    subcriptionHistory        : forwardTo ('db'),
    // subscriberProcess         : forwardTo ('db'),
  //  subscriberProcesses       : forwardTo ('db'),
    subscriberEntity          : forwardTo ('db'),
    subscriberEntities        : forwardTo ('db'),
    subscriberEntityMap       : forwardTo ('db'),
    subscriberEntityMaps      : forwardTo ('db'),
    subscriberField           : forwardTo ('db'),
    subscriberFields          : forwardTo ('db'),
    subscriberFieldMap        : forwardTo ('db'),
    subscriberFieldMaps       : forwardTo ('db'),
  //  subscriptionIntegration   : forwardTo ('db'),
   // subscriptionIntegrations  : forwardTo ('db'),
    subcriptionHistories      : forwardTo ('db'),
    // dashboardAPI              : forwardTo ('db')

  },
  Mutation : {
    createPlugin                        : forwardTo('db'),
    createConnector                     : forwardTo('db'),
    createField                         : forwardTo('db'),
    createFieldMap                      : forwardTo('db'),
    createEntity                        : forwardTo('db'),
    createEntityMap                     : forwardTo('db'),
    createSchedule                      : forwardTo('db'),
    createProcess                       : forwardTo('db'),
    createSubcriptionHistory            : forwardTo('db'),
    createPluginCategory                : forwardTo('db'),
    createLog                           : forwardTo('db'),
    createPluginParam                   : forwardTo('db'),
    createTestimonial                   : forwardTo('db'),
    createProcessHistory                : forwardTo('db'),
    // createSubscriptionIntegration       : forwardTo('db'),
    createSubscriberProcess             : forwardTo('db'),
    createSubscriberEntity              : forwardTo('db'),
    createSubscriberEntityMap           : forwardTo('db'),
    createSubscriberField               : forwardTo('db'),
    createSubscriberFieldMap            : forwardTo('db'),

    deleteManyEntityMaps                : forwardTo('db'),
    deleteManySchedules                 : forwardTo('db'),
    deleteManyLogs                      : forwardTo('db'),
    deleteManyProcesses                 : forwardTo('db'),
    deleteManyFieldMaps                 : forwardTo('db'),
    deleteManyPluginParams              : forwardTo('db'),
    deleteManyTestimonials              : forwardTo('db'),
    deleteManyDatabaseUsers             : forwardTo('db'),
    deleteSchedule                      : forwardTo('db'),
    deleteManyConnectors                : forwardTo('db'),
    deleteManyPluginCategories          : forwardTo('db'),
    deleteManyFields                    : forwardTo('db'),
    deleteManyPlugins                   : forwardTo('db'),
    deleteManyUsers                     : forwardTo('db'),
    deleteManyEntities                  : forwardTo('db'),
    deleteProcessHistory                : forwardTo('db'),
    deleteSubscriberProcess             : forwardTo('db'),
    deleteSubscriptionIntegration       : forwardTo('db'),
    deleteEntityMap                     : forwardTo('db'),
    deleteFieldMap                      : forwardTo('db'),
    deletePluginParam                   : forwardTo('db'),
    deleteTestimonial                   : forwardTo('db'),
    deleteSubscriberEntity              : forwardTo('db'),
    deleteSubscriberEntityMap           : forwardTo('db'),
    deleteSubscriberField               : forwardTo('db'),
    deleteSubscriberFieldMap            : forwardTo('db'),
    deletePluginCategory                : forwardTo('db'),
    deleteField                         : forwardTo('db'),

    updateProcess                       : forwardTo('db'),
    updateEntityMap                     : forwardTo('db'),
    updateSchedule                      : forwardTo('db'),
    updateLog                           : forwardTo('db'),
    updateFieldMap                      : forwardTo('db'),
    updatePluginParam                   : forwardTo('db'),
    updateTestimonial                   : forwardTo('db'),
    updateDatabaseUser                  : forwardTo('db'),
    updateConnector                     : forwardTo('db'),
    updatePluginCategory                : forwardTo('db'),
    updateField                         : forwardTo('db'),
    updatePlugin                        : forwardTo('db'),
    updateUser                          : forwardTo('db'),
    updateEntity                        : forwardTo('db'),
    updateProcessHistory                : forwardTo('db'),
    updateSubscriberProcess             : forwardTo('db'),
    updateSubscriptionIntegration       : forwardTo('db'),
    updateSubscriberEntity              : forwardTo('db'),
    updateSubscriberEntityMap           : forwardTo('db'),
    updateSubscriberField               : forwardTo('db'),
    updateSubscriberFieldMap            : forwardTo('db'),
    updateSubcriptionHistory            : forwardTo('db'),
    updateManySchedules                 : forwardTo('db'),
    ...customMutation,
    ...customResolver,
  }
}

// JWT Token verification for request
function getClaims(req) {
  let token;
  try {
      let Authorization = req.request.get("Authorization")
      if ( Authorization) {
            const tokenStr = Authorization.replace('Bearer ', '')
            
            token = jwt.decode(tokenStr)
           
            return token.Client_Claims
            
      } else {
            return null;
      }
  } catch (e) {   
    console.log(e)  
    return null;
      
  }
}



// JWT Token verification for request
function getTenantId(req) {
  let token;
  try {
      let Authorization = req.request.get("Authorization")
      console.log("auth")
      console.log(Authorization)
      if ( Authorization) {
            const tokenStr = Authorization.replace('Bearer ', '')
            
            token = jwt.decode(tokenStr)
            console.log("AUTHORIZATION")
            console.log(token)
           return token.TenantId
            
      } else {
            return null;
      }
  } catch (e) {   
    console.log(e)  
    return null;
      
  }
}




// Rules

const canRead = rule()(async (parent, args, ctx, info) => {
  return (ctx.claims === 'READWRITE' || ctx.claims === 'READONLY');
});

const canWrite = rule()(async (parent, args, ctx, info) => {
  return ctx.claims === 'READWRITE';
});

// Permissions
// Permissions assigned for prisma Query and Mutations
const permissions = shield({
  Query: {
    
          entityMap                 : and(canRead), 
          entityMaps                : and(canRead), 
          log                       : and(canRead), 
          // logs                      : and(canRead), 
          pluginParam               : and(canRead), 
          pluginParams              : and(canRead), 
          user                      : and(canRead), 
          users                     : and(canRead), 
          entity                    : and(canRead), 
          entities                  : and(canRead), 
          field                     : and(canRead), 
          fields                    : and(canRead), 
          fieldMap                  : and(canRead), 
          fieldMaps                 : and(canRead), 
          schedule                  : and(canRead), 
          // schedules                 : and(canRead),
          processHistories          : and(canRead),
          processHistory            : and(canRead),
          subcriptionHistory        : and(canRead),
         // subscriberProcesses       : and(canRead),
          // subscriberProcess         : and(canRead),
          subscriberEntity          : and(canRead),
          subscriberEntities        : and(canRead),
          subscriberEntityMap       : and(canRead),
          subscriberEntityMaps      : and(canRead),
          subscriberField           : and(canRead),
          subscriberFields          : and(canRead),
          subscriberFieldMap        : and(canRead),
          subscriberFieldMaps       : and(canRead),
          subscriptionIntegration   : and(canRead),
          subscriptionIntegrations  : and(canRead),
          subcriptionHistories      : and(canRead),
          getIntegraionConfiguration: and(canRead),
          // dashboardAPI              : and(canRead),
  },
  Mutation : {
         
                createPlugin                        : and(canWrite),
                createConnector                     : and(canWrite),
                createField                         : and(canWrite),
                createFieldMap                      : and(canWrite),
                createEntity                        : and(canWrite),
                createEntityMap                     : and(canWrite),
                createSchedule                      : and(canWrite),
                createProcess                       : and(canWrite),
                createSubcriptionHistory            : and(canWrite),
                createPluginCategory                : and(canWrite),
                createLog                           : and(canWrite),
                createPluginParam                   : and(canWrite),
                createTestimonial                   : and(canWrite),
                createProcessHistory                : and(canWrite),
                // createSubscriptionIntegration       : and(canWrite),
                createSubscriberProcess             : and(canWrite),
                createSubscriberEntity              : and(canWrite),
                createSubscriberEntityMap           : and(canWrite),
                createSubscriberField               : and(canWrite),
                createSubscriberFieldMap            : and(canWrite),

                deleteManyEntityMaps                : and(canWrite),
                deleteManySchedules                 : and(canWrite),
                deleteManyLogs                      : and(canWrite),
                deleteManyProcesses                 : and(canWrite),
                deleteManyFieldMaps                 : and(canWrite),
                deleteManyPluginParams              : and(canWrite),
                deleteManyTestimonials              : and(canWrite),
                deleteManyDatabaseUsers             : and(canWrite),
                deleteSchedule                      : and(canWrite),
                deleteManyConnectors                : and(canWrite),
                deleteManyPluginCategories          : and(canWrite),
                deleteManyFields                    : and(canWrite),
                deleteManyPlugins                   : and(canWrite),
                deleteManyUsers                     : and(canWrite),
                deleteManyEntities                  : and(canWrite),
                deleteProcessHistory                : and(canWrite),
                deleteSubscriberProcess             : and(canWrite),
                deleteSubscriptionIntegration       : and(canWrite),
                deleteEntityMap                     : and(canWrite),
                deleteFieldMap                      : and(canWrite),
                deletePluginParam                   : and(canWrite),
                deleteTestimonial                   : and(canWrite),
                deleteSubscriberEntity              : and(canWrite),
                deleteSubscriberEntityMap           : and(canWrite),
                deleteSubscriberField               : and(canWrite),
                deleteSubscriberFieldMap            : and(canWrite),
                deletePluginCategory                : and(canWrite),
                deleteField                         : and(canWrite),

                updateProcess                       : and(canWrite),
                updateEntityMap                     : and(canWrite),
                updateSchedule                      : and(canWrite),
                updateLog                           : and(canWrite),
                updateFieldMap                      : and(canWrite),
                updatePluginParam                   : and(canWrite),
                updateTestimonial                   : and(canWrite),
                updateDatabaseUser                  : and(canWrite),
                updateConnector                     : and(canWrite),
                updatePluginCategory                : and(canWrite),
                updateField                         : and(canWrite),
                updatePlugin                        : and(canWrite),
                updateUser                          : and(canWrite),
                updateEntity                        : and(canWrite),
                updateProcessHistory                : and(canWrite),
                updateSubscriberProcess             : and(canWrite),
                updateSubscriptionIntegration       : and(canWrite),
                updateSubscriberEntity              : and(canWrite),
                updateSubscriberEntityMap           : and(canWrite),
                updateSubscriberField               : and(canWrite),
                updateSubscriberFieldMap            : and(canWrite),
                updateSubcriptionHistory            : and(canWrite),
                updateManySchedules                 : and(canWrite),
                UpdateDailySchedule                 : and(canWrite),
                updatedailyOccurcEveryschedule      : and(canWrite),
                updateWeeklyScheduleAPI             : and(canWrite),
                updateMonthlySchedule               : and(canWrite),
                updateIntegrationConfiguration      : and(canWrite)
              }
});

// Here it merge the custom schema and prisma schema typeDefinitions for final schema to GraphQl-Server
let mergedTypes = mergeTypes([customtypeDefs,typeDefs], {all: true});

const server = new GraphQLServer({
  // typeDefs: './src/schema.graphql',
  typeDefs    : mergedTypes,
  resolvers,
  middlewares : [permissions],
  context: request => ({
    ...request,
    db        : new Prisma ({
                  typeDefs  : "./src/schema.graphql",
                  endpoint  : process.env.PRISMA_ENDPOINT,
                  secret    : process.env.PRISMA_SECRET
                }),
    claims    : getClaims(request), 
    TenantId  : getTenantId(request)
  }),
  resolverValidationOptions : { requireResolversForResolveType : false },
})
server.start({port: process.env.NODE_PORT}) 
console.log(`Server is running on 192.168.0.168:`+ process.env.NODE_PORT)
// server.start() 
 