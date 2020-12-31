import {continents, countries, languages} from 'countries-list';
let csc = require('country-state-city').default
// console.log("csc")
// console.log(csc.getCityById("3"))

// console.log(csc.getStatesOfCountry("103"))
// console.log("getAllCountries(22)")
// console.log(csc.getAllCountries())
export const countriesQueries = {

  async Countries(parent, args, ctx, info) { 
    let cw = csc.getAllCountries()
    // console.log(cw)
    return cw
    },


  async State(parent, args, ctx, info){
    // return Conntries()
    return csc.getStatesOfCountry(args.Countries_id)
  },

  async City(parent, args, ctx, info){
    return csc.getCitiesOfState(args.State_id)
  }


    // async countries(parent, args, ctx) {
      
    //     return Object.entries(countries).map(([code, country]) => ({
    //         ...country,
    //         code
    //     }));
        
    //     },
      
    //   async  country(parent, {code}, ctx) {
    //     console.log("country")

    //         const country = countries[code];
    //         console.log(countries)
    //         return {
    //           ...country,
    //           code
    //         };

    //       },  
          
    //       async Conntries(){ 
    //           let cw = csc.getAllCountries()
    //           console.log(cw)
    //       }
           
    }
  