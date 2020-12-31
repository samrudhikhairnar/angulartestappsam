import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'


export const auth = {

  async databaseUsers(parent, args, ctx) {
    args = args.where;//Getting arguments from where condition
    if (args && args.Name && args.Password) {
            const where = {
                            Name : args.Name
                          }
            
            const dbuser = await ctx.db.query.databaseUsers({ where })
            if (!dbuser) {  //First checking if user exist or not in database
              throw new Error(`No such database user found for Name: ${args.Name}`)
            }
          
            const valid = await bcrypt.compare(args.Password, dbuser[0].Password)
            if (!valid) { //check for comparing User enterd password and database password
              throw new Error('Invalid password')
            }
            
            return [{
              Name : dbuser[0].Name,
              Claims : dbuser[0].Claims,
              Token: jwt.sign({ Client_Claims : dbuser[0].Claims }, process.env.APP_SECRET)
            }]
    } else {
            throw new Error(`Enter the DatabaseUser Name and Password to get the token `);
    }
  },

}
