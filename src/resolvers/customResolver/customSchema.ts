  export const customtypeDefs = /* GraphQL */ `

  input SignupInput {
    FirstName       : String
    LastName        :String
    UserName        : String
    Address         : String
    PhoneNumber     : String
    PhoneCode       : String
    Email           : String
    TenantId        : String 
    CompanyName     : String  
    ZipCode         : String
    Country         : String
    State           : String
    City            : String
    IsAdmin         : String
    Password        : String!
    ConfirmPassword : String
    ConnectorsID    : [String!]
  }

  type SignupResult {
    Message : String
  }
  input SignupKeyCloakUserInput {
    FirstName       : String
    LastName        :String
    UserName        : String
    Address         : String
    PhoneNumber     : String
    PhoneCode      : String
    Email           : String
    TenantId        : String 
    CompanyName     : String  
    ZipCode         : String
    Country         : String
    State           : String
    City            : String
    IsAdmin         : String
    Password        : String!
    ConfirmPassword : String
    
    ConnectorsID    : [String!]
  }

  type SignupKeyCloakUserResult {
    Message : String
  }

  type LoginResult {
    Token   : String
    Status  : Int
  }

  type subcriptionResult {
    SubscriptionIntegrationId : ID
    TenantID                  : ID
  }

  input updateintegrationStatus {
    Status                    : Status
    SubscriptionIntegrationId : String
  }
  input updatesubscribeprocess {
    Status              : Status
    SubscriberProcessID : String
  }

  input updatedailyschedule {
    ScheduleID  : ID
    OccursAt    : String
    ScheduleType : String
  }
  type updatedailyschedulemessage {
    Message : String
  }

  input updatedailyOccurcEveryschedule {
    ScheduleID  : ID
    StartTime   : String
    OccursAt    : String
    EndTime     : String
    ScheduleType : String
    DailyInterval : String
    DailyIntervalSpan : String
  }
  type updatedailyoccurceerveryschedule {
    Message : String
  }

  input updateWeeklySchedule {
    ScheduleID  : String
    WeekDays    : [Int]
    OccursAt    : String
    ScheduleType  : String
  }

  type updateweeklyinputmessage {
    Message : String
  }

  input updatemonthlyschedule {
    ScheduleID  : ID
    OccursAt    : String
    DayofMonth  : String
    ScheduleType : String
  }

  type updatemonthlyscheduleinput {
    Message : String
  }
  
  type integrationStatus {
    Message : String
  }

  type updatesubscribeprocessstatus {
    Message : String
  }

  input updateEntityConnStrctjsonInput {  
    Name              : String
    Value             : String
    PluginId          : String!
    EntityID          : String!
    Question          : String
    FieldType         : String
    LookupValues      : String
    FieldLength       : Int
    IsRequired        : Boolean
    IsEditable        : Boolean 
    IsViewable        : Boolean
    FieldName         : String!
    Answers           : String
  }

  input updateIntegrationConfigDataInput {
    SubscriptionIntegrationId : String!
    configuration             : [updateEntityConnStrctjsonInput!]!
  }

  type updateIntegrationConfigurationResult {
      Message : String
  }

  input startprocessinput {
    SubscriptionIntegrationId : String
    SubscriberProcessID       : String
  }

  type startprocessresult {
    Message : String
    Status  : String 
  }

  input stopprocessinput {
    SubscriptionIntegrationId : String
    SubscriberProcessID       : String
  }

  type stopprocessresult {
    Message : String
    Status :  String
  }

  input testconnectionstructure {
    Name  : String!
    Label : String
    Value : String
  }

  input testconnectioninput {
    PluginID : String!
    SubscriptionIntegrationId : String
    connectionStructure : [testconnectionstructure!]
  }
  
  type testconncetionresult{
    Message : String
    
  }
  type changepasswordresult{
    Message : String
  }

  input Changepassword{
    UserName : String!, 
    Password : String!, 
    OldPassword :  String!,
    ConfirmPassword : String!
  }

  type forgotpasswordresult {
    Message : String
  }

  input ForgotPassword {
    UserName : String
    Email : String
  }

  input Resetpasswordinput{
    UserName : String, 
    Password : String!
  }

  type resetpasswordresult{
    Message: String
  }
  
  

  type Mutation {
    Signup( data : SignupInput) : SignupResult
    SignupKeyCloakUser( data : SignupKeyCloakUserInput) : SignupKeyCloakUserResult
    login( UserName : String!, password : String!) : LoginResult
    Changepassword (UserName : String!, Password : String! , OldPassword : String!): changepasswordresult
    forgotpassword (UserName: String, Email : String): forgotpasswordresult
    resetpassword (data : Resetpasswordinput) : resetpasswordresult
    
    setSchedule(data:setschedule) : setscheduleResult
    updateconnectionstructure(data : connectionstructureInput): setconnectionstructure
    createsubscriptionintegration( data : createsubscriptionintegrationinput) : setsubscriptionintegration
    updateIntegrationstatus(data : updateintegrationStatus) : integrationStatus
    updatesubscribeprocessStatus(data: updatesubscribeprocess) : updatesubscribeprocessstatus
    UpdateDailySchedule(data: updatedailyschedule) : updatedailyschedulemessage
    updatedailyOccurcEveryschedule(data: updatedailyOccurcEveryschedule) : updatedailyoccurceerveryschedule
    updateWeeklyScheduleAPI(data: updateWeeklySchedule) : updateweeklyinputmessage
    updateMonthlySchedule(data: updatemonthlyschedule) : updatemonthlyscheduleinput
    updateIntegrationConfiguration( data : updateIntegrationConfigDataInput! ) : updateIntegrationConfigurationResult
    startProcess(where: startprocessinput) : startprocessresult
    stopProcess(where: stopprocessinput) : stopprocessresult
    testconnection(data : testconnectioninput) : testconncetionresult
  }

  
  type Country {
    code      : String
    name      : String    
    phone     : String   
    currency  : String  
    states    : [State]   
  }

  type State {
    code: String
    name: String
    country: Country
  }


  type contries {
    phonecode : String
    name      : String
    id        : String
  }

  type state {
    id : String
    name: String
    country_id : String
  }

  type city {
    id : String
    name : String
    state_id : String
  }

  type count {
    Process     : Int
    Integration : Int
    Schedule    : Int
    Logs        : Int
  }
  type countresult {
    Label : String
    Count : Int
  }
  type syncresult {
    Label : String
    Count : Int
  }

  input getIntegraionConfigurationInput {
    SubscriptionIntegrationId : String!
  }

  

  type Query {    
   
    Countries                   : [contries]
    State(Countries_id:String)  : [state]
    City(State_id:String)       : [city]
    displaycount                : [countresult] 
    displaySyncProcess          : [syncresult] 
    displaylogs (where:displaylogsinput)          : [Log]
    displayuserprofile(where:userprofileinput) : [User]
    displayuserconnector(where:userprofileconnectorinput) : [SubscriptionIntegration]
    subscriberProcessesentitty(where: SubscriberProcessentittymap) : [FieldMap]
    subscriberprocessesinteg(where : subscriberprocessesinput ) : [SubscriberProcess]
    displayConnectiondata(where : displayconnectiondata) : [displayConnectionresult]
    getIntegraionConfiguration( where : getIntegraionConfigurationInput ) : [EntityConnStrctjsonresult]
    ScheduleProcessgetdata (where : Scheduleprocessgetdata) : [Schedule]
    dashboardAPI(where : getdashboardProcessSyncInput) : [dashboardProcessSyncResult!]!
   }


  type dashboardProcessSyncResult{
    Date  : String
    Count : Int
    Day   : Int
  }

  input getdashboardProcessSyncInput {
    startDate  : String
    endDate    : String
  }


  input Scheduleprocessgetdata {
    SubscriberProcess : String
    ScheduleID        : String
    ScheduleType      : String
  }


  input SubscriberProcessentittymap {
    SubscriberProcessID : String
  }

  input subscriberprocessesinput {
    ConnectorId : String
  }

  input displayconnectiondata {
    PluginID : String
    SubscriptionIntegrationId : String
  }

  type displayConnectionresult {
    Name  : String
    Label : String
    Value : String
    IsRequired : Boolean
    IsEditable  : Boolean
    IsViewable : Boolean 
    dropdownfieldName : [String]
   
    FieldType         : String
    LookupValues      : [String]
    SortOrder : Int 
  }
  
  type EntityConnStrctjsonresult {  
    Name              : String
    Value             : String
    PluginId          : String
    EntityID          : String 
    Question          : String
    FieldType         : String
    LookupValues      : [String]
    FieldLength       : Int
    IsRequired        : Boolean
    FieldName         : String
    Answers           : String  
    IsEditable        : Boolean 
    IsViewable        : Boolean 
  }

  enum Stages {
    START
    STOP
    DAILY
    WEEKLY
    MONTHLY
  }
  enum Stage {
    IDLE
    RUNNING
    QUEUED
  }

  enum DailyOccursType {
    OCCURSONCEAT
    OCCURSEVERY
  }

  input displaylogsinput {   
    SubscriptionIntegrationId : String   
  }

  input userprofileinput {   
    TenantId : String   
  }

  input userprofileconnectorinput {   
    TenantId : String   
  }


  input setschedule {
    WeekDays                  : [Int]
    DayofMonth                : String
    OccursAt                  : String 
    SubscriberProcess         : String!
    ScheduleType              : String!   
    SubscriptionIntegrationId : String!
    NextOccurence             : String
    Status                    : Stage
    CreatedDate               : String    
    CreatedBy                 : String
    Active                    : String 
    Type                      : Stages
    DailyOccurence            : String
    DailyRecurrenceType       : DailyOccursType   
    DailyInterval             : String
    DailyIntervalSpan         : String
    LastExecuted              : String
    StartTime                 : String
    EndTime                   : String    
    ModifiedDate              : String
    ModifiedBy                : String
  } 

  type setscheduleResult {
    Message : String
  }

input createsubscriptionintegrationinput {
    PrimaryPluginId   : String!
    SecondaryPluginId : String!
  }

  type setsubscriptionintegration {
    Message : String
  }

  input connectionstructure {
    Name  : String!
    Label : String
    Value : String!
  }

  input connectionstructureInput {
    PluginID                  : String!
    SubscriptionIntegrationId : String!
    connectionstructure       : [connectionstructure]
  }

 
  type setconnectionstructure {
    result : String
  }
`