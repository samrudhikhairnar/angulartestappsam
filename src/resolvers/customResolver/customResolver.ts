
import { Context } from '../../utils'
import { Guid } from "guid-typescript";
import { create } from 'domain';
import { error } from 'util';
import { compareSync } from 'bcryptjs';
import { response } from 'express';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { RunQuery } from '../databaseHelper/databaseHelper'
import { EROFS, SSL_OP_SSLEAY_080_CLIENT_DH_BUG, RSA_NO_PADDING } from 'constants';
import { WrongCredentialsError  } from './errorResolver';
import { get } from 'https';
import { toUnicode } from 'punycode';
import { argsToArgsConfig } from 'graphql/type/definition';
import { throws, rejects } from 'assert';
import { Agent } from 'http';
import { continents } from 'countries-list';
import { prisma as generatedPrisma  } from '../../generated/index';
import { resolve } from 'dns';
import { count } from 'console';
// const { errorName } = require('../../constants')
const moment = require('moment');
var rp = require('request-promise');
var key = 'Pri$maData secret keys to Checking password'; 
var encryptor = require('simple-encryptor')(key);
// var decrypted = encryptor.decrypt(encrypted);
let utcTime = "7/17/2020 7:14:14 AM";

let localText = moment.utc(utcTime).local().format("L LTS");
console.log("localText")
console.log(localText)

// let i  = aaa
// if (isNaN(i)) {
//     console.log('This is not number');
// }

// var isoDate = new Date('2020-05-14T08:09:54.203Z').toLocaleString()
// console.log("checklog date")
// console.log(isoDate)
// var date = new Date('7/17/2020 7:14:14 AM');
// date.toLocaleString()
// let data = (date.getTimezoneOffset())
// let ssss= data.toString()
// console.log(data)
// "Wed Jun 29 2011 09:52:48 GMT-0700 (PDT)"
// console.log(date.toString())

// let datdd = new Date('2020-05-14T08:04:12.815Z').toLocaleString()
// console.log("2020-05-14T08:04:12.815Z")
// console.log(datdd)


function get24hTime(str){
    str = String(str).toLowerCase().replace(/\s/g, '');
    var has_am = str.indexOf('am') >= 0;
    var has_pm = str.indexOf('pm') >= 0;
    // first strip off the am/pm, leave it either hour or hour:minute
    str = str.replace('am', '').replace('pm', '');
    // if hour, convert to hour:00
    if (str.indexOf(':') < 0) str = str + ':00';
    // now it's hour:minute
    // we add am/pm back if striped out before 
    if (has_am) str += ' am';
    if (has_pm) str += ' pm';
    // now its either hour:minute, or hour:minute am/pm
    // put it in a date object, it will convert to 24 hours format for us 
    var d = new Date("1/1/2011 " + str);
    // make hours and minutes double digits
    var doubleDigits = function(n){
        return (parseInt(n) < 10) ? "0" + n : String(n);
    };
    return doubleDigits(d.getHours()) + ':' + doubleDigits(d.getMinutes());
}
// console.log("con+")
// console.log(get24hTime('6:11')); // 18:11

function convertTime(time24) {
    let ts = time24;
    let H = +ts.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h < 10)?(0+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
//   let timeOutput = convertTime('2:00')
//   console.log('timeOutput:',timeOutput)

// ******* get currentdate function *******
function getcurrentDate(isDateOnly?){
    let date_ob = new Date();
    // console.log(date_ob)
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
   
    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
  

    let currentDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    let dateonly = year + "-" + month + "-" + date + " ";
 
    if (isDateOnly) 
        return dateonly;
    else
        return currentDate
    
}

function getTomorrowDate(isDateOnly?){
    let date_ob = new Date();
    // console.log(date_ob)
    let date = ("0" + (date_ob.getDate() + 1)).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    // console.log(year + "-" + month + "-" + date);

    let currentDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    let dateonly = year + "-" + month + "-" + date + " ";
 
    if (isDateOnly) 
        return dateonly;
    else
        return currentDate
    
}


const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}:00`;
  }
   
// Daily Occurce At Date
function DailyOccuresAtDate(selectedTime){
    //Selected time will be sent from user with AM and PM e.g. '01:02 PM'  
    let response = { "OccursAt" : null, "NextOccurance" : null };
    let date_ob = new Date();
    let currTime = date_ob.getTime();
    let userDate = getcurrentDate(true) + convertTime12to24(selectedTime);
    console.log("convertTime12to24(selectedTime)")
    console.log(convertTime12to24(selectedTime))
    console.log("getcurrentDate(true)")
    console.log(getcurrentDate(true))
    console.log("userdate")
    console.log(userDate)
    let userNewDate = new Date(userDate);
    let userTime =  userNewDate.getTime();
    if (currTime < userTime)  
    {
        /**
         * current time is 4PM user selected time is 5PM then 
         * occurs at and nextoccurance will be current day with user time
         */
        response.OccursAt       = getcurrentDate(true) + selectedTime;
        console.log("occurceat")
        console.log(response.OccursAt)

        // response.NextOccurance  = userDate; 
        response.NextOccurance  = new Date(userDate).toISOString();
        
    }
    else 
    {

        /**
         * current time is 5PM user selected time is 4PM then 
         * occurs at and nextoccurance date will be tomorrow's day with user time
         */
        // var today = new Date();
        // today.setHours(today.getHours() + 4);
        response.OccursAt       = getTomorrowDate(true) + selectedTime;
        console.log("1")
        // let newdate = new Date().o;
        
        let tomorrowDate       = getTomorrowDate(true) + convertTime12to24(selectedTime); 
        console.log("step2")
        console.log(tomorrowDate)
        // response.NextOccurance  = tomorrowDate;
        response.NextOccurance  = new Date(tomorrowDate).toISOString();
        
    }

    return response;
}

/**
 * This function returns the date occursAt and nextOccurance Date format 
 */
function getTimeByHour(StartTime: any,  forTomorrowDate: boolean ) {
    let returnJson                = {"occursAt" : null , "nextOccurance" : null };
    const [date, time]            = StartTime.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    let returnVal                 = "";
    let occursAtTime              = null;
    // let _hr                       = parseInt(hours) + parseInt(DailyInterval);
    // daily every occurse at start with start with
    let _hr                       = parseInt(hours);
    let hh                        = null;
    if ( hours >= 24 ) 
    {   //As hours from startTime greater than 24 Hours then converting to 12 for occrsAt
          hh  = hours;
          occursAtTime  = `${("0" + (hh - 12)).slice(-2)}:${minutes} PM`;
    } 
    else if ( _hr >= 24 ) 
    {   //As hours + provided hours greater than 24 Hours then converting 12 format with startTime Hours
          hh  = hours
          occursAtTime  = `${("0" + (hh - 12)).slice(-2)}:${minutes} PM`;
    } 
    else  
    {   //As dailyInterval + Hours less than 24 then setting AM/PM format for occursAt Date
          hh  = _hr
          if ( hh > 12 )
              occursAtTime  = `${("0" + (hh - 12)).slice(-2)}:${minutes} PM`;
          else 
              occursAtTime  = `${("0" + hh).slice(-2)}:${minutes} AM`;
    }

    returnVal                 = `${("0" + hh).slice(-2)}:00:00`;
    returnJson.occursAt       = occursAtTime;
    returnJson.nextOccurance  = returnVal;
    return returnJson;
}

/**
 * This function returns timeFormat for occursAt and nextOccurance 
 * based on the minutes provided by the user
 */
function getTimeByMinutes(StartTime: any, forTomorrowDate: boolean ) {
    let returnJson                = {"occursAt" : null , "nextOccurance" : null };
    const [date, time]            = StartTime.split(' ');
    let [hours, minutes, seconds] = time.split(':');
    let returnVal                 = "";
    let occursAtTime              = null;
    let _min                      = parseInt(minutes) ;  
    if ( _min >= 60 ) 
    {
        //As minutes are 60+ then add 1 Hour and set minutes to 0
        let tempHr  = hours;
        tempHr      = parseInt(tempHr) + 1 ;
        if ( tempHr > 24 ) 
        {   //As added hours are greater than 24 then following startTime date and time format
            _min    = minutes;
        } 
        else 
        {   // As genrated hours are less than 24 Then following updated time format
            hours   = tempHr;
            _min    = parseInt('00');
        }
    }
    if ( hours > 12 ) 
    {   //Setting PM format format for occursAt Date
          occursAtTime  = `${("0" + (hours - 12)).slice(-2)}:${("0" + _min).slice(-2)} PM`;
    } 
    else  
    {   //Setting AM format format for occursAt Date
          occursAtTime  = `${("0" + hours).slice(-2)}:${("0" + _min).slice(-2)} AM`;
    }

    returnVal                 = `${("0" + hours).slice(-2)}:${("0" + _min).slice(-2)}:00`;
    returnJson.occursAt       = occursAtTime;
    returnJson.nextOccurance  = returnVal;
    return returnJson;
}

/**
 * 
 * @param DailyInterval     time in Minutes or Hours
 * @param DailyIntervalSpan for hours 1 and Minutes 2
 * @param StartTime         Stores with 24Hrs format with user entered time  
 * @param EndTime           Stores with 24Hrs format with user entered time
 */
function DailyOccurceEveryDate(DailyInterval: any, DailyIntervalSpan: any, StartTime: String, EndTime: String) {
    // console.log(`\n\n============== For startTime ${ StartTime } ===============`);
    // console.log(`============== DailyInterval ${ DailyInterval } ${ DailyIntervalSpan == '1' ? ' Hours' : 'Minutes'} ===============`);
    let response = { 
                      "DailyIntervalSpan" : DailyIntervalSpan, 
                      "DailyInterval"     : DailyInterval,
                      "StartTime"         : null,
                      "EndTime"           : null,
                      "OccursAt"          : null,
                      "NextOccurance"     : null,
                      "error"             : null
                  };
    try {
        let StartDateTime   = getcurrentDate(true) + get24hTime(StartTime);
        console.log("StartDateTime occuse every schedule")
        console.log(StartDateTime)
        // let StartDateTime   = getcurrentDate(true) + convertTime12to24(StartTime);
        let _startTime      = (new Date(StartDateTime)).getTime();
        let EndDateTime     = getcurrentDate(true) + get24hTime(EndTime);
        // let EndDateTime     = getcurrentDate(true) + convertTime12to24(EndTime);
        let _endTime        =  (new Date(EndDateTime)).getTime();
        let currentDateTime = new Date();
        let currentTime     = currentDateTime.getTime();
       
        if ( _startTime > _endTime ) {
            console.log("_starttime")
            console.log(_startTime)
            console.log("_endtime")
            console.log(_endTime)
            // response.error  = "End time must be greater than start time";
            response.error = "Invalid time for today please select time till 11.59PM only"
        } 
        else if(_startTime == _endTime){
            response.error = "Invalid time for today please select time till 11.59PM only"
        }
        else 
        {
            response.StartTime  = StartDateTime;
            response.EndTime    = EndDateTime;
            let occursAt        = null;
            let nextOccurance   = null;
            switch (DailyIntervalSpan) {
                case "1" :      //For Hours
                          let timeFormats     = getTimeByHour(StartDateTime, false);
                          let _intervalHr     = getcurrentDate(true) + timeFormats.nextOccurance;
                          // console.log("timeFormats");
                          // console.dir(timeFormats);
                          let _intervalHrTime = (new Date(_intervalHr)).getTime();
                          
                          if (currentTime < _intervalHrTime) 
                          {   //User entered time is still not passed
                              /**
                               * As time is not passed, add interval hours to startTime provided 
                               * i.e. if start time is 4PM then occursAt will be 5PM with today's date
                               *  */  
                              // console.log("\nSameTime as startTime + hour given : ");
                              occursAt      = getcurrentDate(true) + timeFormats.occursAt;
                              // nextOccurance = _intervalHr;
                              console.log("timeFormats.occursAt For Today:  ", timeFormats.occursAt);
                              console.log("DailyOccurceEveryDate OccursAt For Today :  ", occursAt);
                              
                              // nextOccurance = new Date(_intervalHr).toISOString();
                              nextOccurance = getcurrentDate(true) + timeFormats.nextOccurance;
                              nextOccurance = new Date(nextOccurance).toISOString();
                              console.log("timeFormats.nextOccurance For Today :  ", timeFormats.nextOccurance);
                              console.log("DailyOccurceEveryDate nextOccurance For Today :  ", nextOccurance);
                          }
                          else
                          {   //User entered time is passed select tomorrow's date
                              /**
                               * As time is passed then consider the startTime provided for occursAt and nextOccurance
                               * i.e. if currentTime is 5PM  and startTime is 4PM then occursAt will be 4PM with tomorrow's date
                               *  */  
                              // console.log("Tomorrow's date with same as startTime: ");
                              occursAt      = getTomorrowDate(true) + timeFormats.occursAt;
                              console.log("timeFormats.occursAt For Tomorrow :  ", timeFormats.occursAt);
                              console.log("DailyOccurceEveryDate OccursAt For Tomorrow :  ", occursAt);
                              nextOccurance = getTomorrowDate(true) + timeFormats.nextOccurance;
                              console.log("timeFormats.nextOccurance For Tomorrow :  ", timeFormats.nextOccurance);
                              console.log("DailyOccurceEveryDate nextOccurance For Tomorrow :  ", nextOccurance);
                              nextOccurance = new Date(nextOccurance).toISOString();
                          }
                          break;
              
                case "2" :      //For Minutes
                          let minTimeFormats      = getTimeByMinutes(StartDateTime,false);
                          console.log("minTimeFormats----")
                          console.log(minTimeFormats)
                          let _intervalMinute     = getcurrentDate(true) + minTimeFormats.nextOccurance;
                          // console.log("minute TimeFormats");
                          // console.dir(minTimeFormats);
                          let _intervalMinuteTime = (new Date(_intervalMinute)).getTime();
                          
                          if (currentTime < _intervalMinuteTime) 
                          {   //User entered time is still not passed
                              /**
                               * As time is not passed, add interval minutes to startTime provided 
                               * i.e. if start time is 4PM then occursAt will be 5PM with today's date
                               *  */  
                              // console.log("\nSameTime as startTime + minutes given : ");
                              occursAt      = getcurrentDate(true) + minTimeFormats.occursAt;
                              // nextOccurance = _intervalMinute;
                              nextOccurance = new Date(_intervalMinute).toISOString();
                          }
                          else
                          {   //User entered time is passed then select tomorrow's date
                              /**
                               * As time is passed then consider the startTime provided for occursAt and nextOccurance
                               * i.e. if currentTime is 5PM  and startTime is 4PM then occursAt will be with tomorrow's date
                               *  */  
                              // console.log("Tomorrow's date with same as startTime: ");
                             
                              occursAt      = getTomorrowDate(true) + minTimeFormats.occursAt;
                              nextOccurance = getTomorrowDate(true) + minTimeFormats.nextOccurance;
                              nextOccurance = new Date(nextOccurance).toISOString();                            
                          }
                          break;
                
                default  :
                          response.error = "Provide the valid DailyIntervalSpan value";
                          break;
              }
            // minTimeFormats
            // test1 = minTimeFormats.StartDateTime
            console.log('Final OccursQt Date for DailyOccurceEveryDate ', occursAt);
            response.OccursAt       = occursAt;
            response.NextOccurance  = nextOccurance;
        }
    } 
    catch (e) 
    {
        console.log("-------Error inside DailyOccurceEveryDate function ----------");
        console.dir(e);
        response.error  = e;
    }
 
    return response;
}

/**
 * This Function return the occursAt and nextOccuranceAt date for monthly schedule
 */
function getMonthDateByDay(DayofMonth : String, _OccursAt : String) {
    console.log(`\n\nFor DayOfMonth ${DayofMonth} AND OccursAt ${_OccursAt}`);
    let returnJson  = { 
                        "DayofMonth"        : DayofMonth,
                        "OccursAt"          : null,
                        "NextOccurance"     : null,
                        "error"             : null
                      }
    try 
    {
        let currentDate       = getcurrentDate(false);
        let user24HrTime      = convertTime12to24(_OccursAt); //Holds 24 Hours converted format for user's 12Hr time 
        let date              = new Date();
        let currMonth         = date.getMonth() + 1;  //Month format start form 0 - January so adding + 1
        let tempDate          = `${date.getFullYear()}-${("0" + currMonth).slice(-2)}-${("0" + DayofMonth).slice(-2)}`;
        let tempUserDateTime  = new Date(`${tempDate} ${user24HrTime}`);
        let newDayOfMonth     = (tempUserDateTime.getDate()).toString();
        DayofMonth            = ("0" + DayofMonth).slice(-2);
        newDayOfMonth         = ("0" + newDayOfMonth).slice(-2);
        if ( newDayOfMonth != DayofMonth ) 
        {   
          /**
           * Here checking if month is feb and user enters 30 date so it will automatically take the 
           * march month's 1st Date
           */
            DayofMonth              = newDayOfMonth;
            returnJson.DayofMonth   = DayofMonth;
            currMonth               = currMonth + 1
            tempDate                = `${date.getFullYear()}-${("0" + currMonth).slice(-2)}-${("0" + DayofMonth).slice(-2)}`;
        }
        
        if (tempUserDateTime.getTime() > date.getTime() ) 
        {   //User provided time is not Passed then set the occuranceAt and nextOccurance as users provided date
            returnJson.OccursAt       = tempDate + ' ' + _OccursAt;
            returnJson.NextOccurance  = tempDate + ' ' + user24HrTime;
            
        }
        else
        {
            // console.log("Set Next Month's date as user provided date time is passed");
            let YYYY  = date.getFullYear();
            let MM    = null;
            if ( (currMonth + 1) > 12) 
            {   //As if added month is 13 then set the year to next year and month to january
                YYYY                      =  YYYY + 1;
                MM                        = '01';
                let newYearDate           = `${YYYY}-${("0" + MM).slice(-2)}-${("0" + DayofMonth).slice(-2)}`;
                returnJson.OccursAt       = newYearDate + ' ' + _OccursAt;
                returnJson.NextOccurance  = newYearDate + ' ' + user24HrTime;
            } 
            else 
            {
                let MM                    = currMonth + 1;
                let finalDate             = `${ YYYY }-${ ("0" + MM).slice(-2) }-${("0" + DayofMonth).slice(-2)}`;
                returnJson.OccursAt       = finalDate + ' ' + _OccursAt;
                returnJson.NextOccurance  = finalDate + ' ' + user24HrTime;
            }
        }
        returnJson.NextOccurance  = new Date(returnJson.NextOccurance).toISOString();
    } 
    catch (e) 
    {
      console.log("Error inside getMonthDateByDay function: ");
      console.dir(e);
      returnJson.error  = e;
    }
    return returnJson;
}




/**
 * It returns the weekly schedule OccursAt and NextOccurance date
 * @param weekDays    Array of string ['1', '0'] where  ( 0 - Sunday, 1 - Monday ...etc )
 * @param _OccursAt   time From user in 12Hr with AM/PM
 */
function getWeeklySchedultDate(weekDays : any, _OccursAt : String ) {
    // console.log(`\n\n Weekly schedule called for OccursAt ${_OccursAt} and weekDays:  ` );
    // console.dir(weekDays);
    weekDays              = weekDays.sort();  //Sorting weeks array as needs to calculate date further
    let responseJson      = { 
                              "weekDays"          : weekDays,
                              "OccursAt"          : null,
                              "NextOccurance"     : null,
                              "error"             : null
                            }
    try{

    
    let date              = new Date();
    let currDay           = date.getDate();
    let currMonth         = ("0" + (date.getMonth() + 1)).slice(-2);
    let user24HrTime      = convertTime12to24(_OccursAt);
    let tempDate          = null; //To hold format for the Temporary date creation
    let tempNewDate       = null; //To hold actual Date object of tempDate
    let selectedWeekDay   = null; 
    let _nextDay          = null; 
    let _nextDate         = null;

    /**
     * Here checking if first week is 0 i.e. sunday and if other weekDays selected then
     * start week count from monday Or any other day currently present  
     */
    if (weekDays.length > 0 && weekDays[0] == '0' ) 
            selectedWeekDay     = parseInt(weekDays[1]);    //First Week day is sunday so selecting index 1 week Day
    else            
            selectedWeekDay     = parseInt(weekDays[0]);    //Only one week day selected so selecting default 0 index
        
    tempDate          = `${date.getFullYear()}-${currMonth}-${currDay} ${user24HrTime}`;
    tempNewDate       = new Date(tempDate);
    _nextDay          = nextDay(tempNewDate, selectedWeekDay);  // It returns the current occurance of the date
    _nextDate         = nextDate(selectedWeekDay, tempNewDate); // It returns the next week's occurance of the week day

    if ( _nextDay.getTime() > date.getTime() ) 
    {   // User provided time and selected week day is not passed yet so selecting provided weekDay and date 
        // console.log("NextDay Date selected ");
        responseJson.OccursAt       = `${_nextDay.getFullYear()}-${("0" + (_nextDay.getMonth() + 1)).slice(-2)}-${("0" + (_nextDay.getDate())).slice(-2)} ${_OccursAt}`;
        responseJson.NextOccurance  = `${_nextDay.getFullYear()}-${("0" + (_nextDay.getMonth() + 1)).slice(-2)}-${("0" + (_nextDay.getDate())).slice(-2)} ${user24HrTime}`;
        responseJson.NextOccurance  = new Date(responseJson.NextOccurance).toISOString();
    } 
    else 
    {   // As user provided time or selected week day is passed, so selecting next week's occurance for date 
        // console.log("NextDate Date selected ");
        responseJson.OccursAt       = `${_nextDate.getFullYear()}-${("0" + (_nextDate.getMonth() + 1)).slice(-2)}-${("0" + (_nextDate.getDate())).slice(-2)} ${_OccursAt}`;
        responseJson.NextOccurance  = `${_nextDate.getFullYear()}-${("0" + (_nextDate.getMonth() + 1)).slice(-2)}-${("0" + (_nextDate.getDate())).slice(-2)} ${user24HrTime}`;
        responseJson.NextOccurance  = new Date(responseJson.NextOccurance).toISOString();
    }
    }
    catch(error){
        responseJson.error = error
    }
    return responseJson;

}

/**
 * USED FOR SET_SCHEDULE Weekly Type
 * This function returns the date from the next weeks for provided weekDay
 * @param d     DateTime
 * @param dow   week Index ( 0 - sunday, 1- Monday, etc...)
 */
function nextDay(d, dow){
  d.setDate(d.getDate() + (dow+(7-d.getDay())) % 7);
  return d;
}

/**
 * USED FOR SET_SCHEDULE Weekly Type
 * This function returns the nextOccurance date for weekly schedule date formation
 * @param dayIndex    Week Index ( 0 - sunday, 1 - Monday, etc... )
 * @param userDate    DateTime
 */
function nextDate(dayIndex, userDate) {
  var today = new Date(userDate);
  today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
  return today;
}



// ******* All Custom Mutation **********

export const customResolver = {
    // ******* create new user ********
  async Signup(parent, args, ctx: Context, info) 
  {
    console.log("signup")
    let Message ;
    let errorMessage = '';
    let cretaedUser ;
    let validconnectors = [];
    let TenantId =  Guid.create().toString();  
    let userdata = {
        FirstName       : args.data.FirstName,
        LastName        : args.data.LastName,
        UserName        : args.data.UserName,
        Address         : args.data.Address,
        PhoneNumber     : args.data.PhoneNumber,
        PhoneCode       : args.data.PhoneCode,
        Email           : args.data.Email,
        TenantId        : TenantId ,
        CompanyName     : args.data.CompanyName , 
        ZipCode         : args.data.ZipCode,
        Country         : args.data.Country,
        City            : args.data.City,
        State           : args.data.State,
        IsAdmin         : args.data.IsAdmin,
        Password        : args.data.Password,
        ConfirmPassword : args.data.ConfirmPassword
    }
    console.log("userdata")
    console.log(userdata)
    
    
    return checkconnector(args.data.ConnectorsID,ctx, "first")
        .then((allconnectorres) => {
            console.log("===== Valid COnnectors check response for signup ======");
            console.log(allconnectorres);
            ///HERE IF CONDITION IS ADDED IF ANY ERROR OCCURS WHILE CHECKING VALID CONNECTORS
            if ( allconnectorres.error == null ) {
                validconnectors = allconnectorres.data;
                // throw new Error("loginerror")
                var encryptedPassword       = encryptor.encrypt(userdata.Password);
                userdata.Password           = encryptedPassword;
                userdata.ConfirmPassword    = encryptedPassword;
                return ctx.db.mutation.createUser({data: userdata }); 
            }
            else {
                ///HERE ELSE CONDITION IS ADDED IF ANY ERROR OCCURS WHILE CHECKING VALID CONNECTORS
                console.log('Error while checking the valid connectors for signup ');
                errorMessage = allconnectorres.error;
                throw new Error(errorMessage);
            }
        }).then((createduser) => {
            console.log("createduser")
            console.log(createduser)
            cretaedUser = createduser;
           
            if (createduser)
            {
                return addUsertoIdserver(createduser, args.data).then((idserverresult) => {
                   console.log("ID_Server_Registration_Success_Response");
                   console.log(idserverresult);
                    return idserverresult;       
                }).catch((error) =>{
                    console.log("error from IDServer while creating new user");
                    console.log(error)
                    return  ctx.db.mutation.deleteUser({  where: cretaedUser.UserId }).then((userresult) => { 
                       throw new Error(error)    
                    });
                });
            }
            else {
                errorMessage = "User is not created";
                throw new Error(errorMessage);
            }   
        }).then((response) => {
            if (response == 'Success')
            {
                return  subscriptinintegration(args.data.ConnectorsID, ctx, cretaedUser.TenantId, args, info,validconnectors)
            }
            else
            {
                console.log('Success Response Not returned from Identity sever for registration process');
                errorMessage = "Internal Server Error, please enter the valid data";
                // throw new Error(errorMessage);
                //HERE NEW CHANGE ADDED TO FIRST DELETE PRISMA DB CREATED USER AND THEN THROWING ERROR
                return  ctx.db.mutation.deleteUser({  where: cretaedUser.UserId }).then((userresult) => { 
                    throw new Error(errorMessage);
                 });                
            }
        }).then((res) => {
            return { Message: "User is created" }
        })
        .catch((err) => {
            console.log('SignUp Catch Error ');
            console.dir(err);
            
            // ctx = setSignUpErrorContext(ctx, "Enter Valid Information");
            try  {
                if ( err && err.message != undefined && err.message != null) {
                    console.log("err.message :");
                    console.log(err.message);
                    errorMessage = err.message;
                }
            } catch (e) {
                console.log('error while reading error objects messages ');
                console.dir(e);
            }
            
            //HERE ERROR MESSAGE SENT IF ANY ERROR OCCURED IN SIGNUP PROCESS
            ctx = setSignUpErrorContext(ctx, errorMessage);
            
            // throw new Error(error.toString());
            throw new Error(errorMessage);
        })
  },

///HANDLES KEYCLOAK'S USER REGISTRATION USER ADD TO GUMU DB
async SignupKeyCloakUser(parent, args, ctx: Context, info) 
  {
    console.log("SignupKeyCloakUser")
    let Message ;
    let errorMessage = '';
    let cretaedUser ;
    let validconnectors = [];
    // let TenantId =  Guid.create().toString();  
    let userdata = {
        FirstName       : args.data.FirstName,
        LastName        : args.data.LastName,
        UserName        : args.data.UserName,
        Address         : args.data.Address,
        PhoneNumber     : args.data.PhoneNumber,
        PhoneCode       : args.data.PhoneCode,
        Email           : args.data.Email,
        TenantId        : args.data.TenantId ,
        CompanyName     : args.data.CompanyName , 
        ZipCode         : args.data.ZipCode,
        Country         : args.data.Country,
        City            : args.data.City,
        State           : args.data.State,
        IsAdmin         : args.data.IsAdmin,
        Password        : args.data.Password,
        ConfirmPassword : args.data.ConfirmPassword
    }
    console.log("Keycloak user data");
    console.log(userdata);
    
    
    return checkconnector(args.data.ConnectorsID,ctx, "first")
        .then((allconnectorres) => {
            console.log("===== Valid COnnectors check response for signup ======");
            console.log(allconnectorres);
            ///HERE IF CONDITION IS ADDED IF ANY ERROR OCCURS WHILE CHECKING VALID CONNECTORS
            if ( allconnectorres.error == null ) {
                validconnectors = allconnectorres.data;
                // throw new Error("loginerror")
                var encryptedPassword       = encryptor.encrypt(userdata.Password);
                userdata.Password           = encryptedPassword;
                userdata.ConfirmPassword    = encryptedPassword;
                return ctx.db.mutation.createUser({data: userdata }); 
            }
            else {
                ///HERE ELSE CONDITION IS ADDED IF ANY ERROR OCCURS WHILE CHECKING VALID CONNECTORS
                console.log('Error while checking the valid connectors for signup ');
                errorMessage = allconnectorres.error;
                throw new Error(errorMessage);
            }
        }).then((createduser) => {
            console.log("User created in gumu db with keycloak user credentials ")
            console.log(createduser);
            cretaedUser = createduser;
            ///HERE EXISTING FLOW  TO CALL IDENTITY SERVER REMOVED AND DIRECTLY PROCEEDING FURTHER
            return cretaedUser;
        }).then((response) => {
                ///HERE AFTER USER CREATION DIRECTLY CREATIG ITS SUBSCRIBTION INTEGRATION MAPPINGS WITH THE CONNECTORS PROVIDED
                return subscriptinintegration(args.data.ConnectorsID, ctx, cretaedUser.TenantId, args, info,validconnectors);
        }).then((res) => {
            return { Message: "User is created" };
        })
        .catch((err) => {
            console.log('SignUp Catch Error ');
            console.dir(err);
            
            // ctx = setSignUpErrorContext(ctx, "Enter Valid Information");
            try  {
                if ( err && err.message != undefined && err.message != null) {
                    console.log("err.message :");
                    console.log(err.message);
                    errorMessage = err.message;
                }
            } catch (e) {
                console.log('error while reading error objects messages ');
                console.dir(e);
            }
            
            //HERE ERROR MESSAGE SENT IF ANY ERROR OCCURED IN SIGNUP PROCESS
            ctx = setSignUpErrorContext(ctx, errorMessage);
            
            // throw new Error(error.toString());
            throw new Error(errorMessage);
        })
  },


//   ******* login Function ******
    async login(parent, args, ctx) {
        console.log('Inside Login');
        ///HOLDS THE ERROR MESAGE IF ANY ERROR OCCURS
        let errorMessage = "";
        let internalServerErrorMsg = "Invalid Username or Password";
        if (args && args.UserName && args.password) 
        {
            let loginwhere = {
                UserName : args.UserName
            }
                return rp.post(process.env.ID_SERVER_LOGIN   , {
                form:{
                    UserName        : args.UserName,            
                    Password        : args.password,
                    'grant_type'    : 'password',
                    'client_id'     : 'pocketcloud'
                },
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }    
                }).then(res => {
                    console.log('Response from ID Server' );
                    console.dir(res);
                    if (res) 
                    {
                        
                        let token = JSON.parse(res)
                        if (token.access_token)
                        {
                            return {Token : token.access_token, ...token}
                        }
                        else 
                        {

                            errorMessage = "Invalid Username or Password";
                            ctx = setLoginErrorContext(ctx, errorMessage);
                            throw new Error(errorMessage);
                            // ctx = setLoginErrorContext(ctx, "Invalid Username or Password");
                            // throw new Error("Invalid Username or Password");
                        }
                    }
                    else
                    {
                        errorMessage = internalServerErrorMsg;
                        ctx = setLoginErrorContext(ctx, errorMessage);
                        throw new Error(errorMessage);
                    }
                }).catch(err => {
                    console.dir('Actual Error Object ');
                    console.dir(err);
                    if ( errorMessage.length < 1) {
                        errorMessage = internalServerErrorMsg;
                    } else {
                        errorMessage = err;
                    }
                    // ctx = setLoginErrorContext(ctx, "Invalid Username or Password");
                    ctx = setLoginErrorContext(ctx, errorMessage);
                    throw new Error(errorMessage);
                    // throw new Error("Invalid Username or Password")
                });
            } 
            else 
            {
                    ctx = setLoginErrorContext(ctx, "Enter the UserName and Password");
                    throw new Error(`Enter the UserName and Password`);
            }
    },

    // changepassword API
    async Changepassword(parent, args, ctx, info){
        if(ctx.TenantId){
        let userdatapas= {            
            UserName        : args.UserName,           
            Password        : args.Password,            
        }
        let passwhere = {            
            UserName: args.UserName
        }

        let passdata = {            
            UserName: args.UserName
        }

        var encryptedPassword           = encryptor.encrypt(args.Password);

        
        // var oldencryptedPassword        = encryptor.encrypt(args.data.OldPassword);

        return ctx.db.query.users({where:passdata}).then((userdata) =>{
            console.log("userlist")
            console.log(userdata);

            if(userdata.length > 0){
                //userdata password decrept
                var decrypted = encryptor.decrypt(userdata[0].Password);
                console.log("decretpt password");
                console.log(decrypted)
                if(args.OldPassword == decrypted){
                    
                    return idserverchangepassword(args).then((idserverresult) => {
                        console.log("idserverchangepassword")
                        console.dir(idserverresult)
                        let idchnagepass = JSON.parse(idserverresult)
                        console.log("chnage pass check")
                        console.log(idchnagepass.Status)
                         // return idserverresult
                        //  return { Message: idserverresult }
                        if(idchnagepass.Status == 'success'){
                            
                            
                            
                            let passdata = {
                                Password : encryptedPassword,
                                ConfirmPassword : encryptedPassword
                            }
                            return   ctx.db.mutation.updateUser({  where: passwhere, data: passdata}).then((passworddataresult) => {
                                console.log("check updated password")
                                console.log(passworddataresult)
                                return { Message: "Password changed successfully" }
                            //    return passworddataresult
                               
                          
                            }).catch((err)=>{
                                console.log("change password")
                                throw new Error(err)
                            })
                
                        }
                        else{
                            throw new Error(idchnagepass);
                        }
                        
                     }).catch((error) =>{
                         console.log("errorid")
                         console.log(error)
                         throw new Error(error)
                     })
                }else{
                    throw new Error("old password is wrong")
                }
            }else{
                throw new Error("UserName is invalid");
            }

        })
        
                }
        else{
            throw new Error("User Not Valid")
        }
    },

    //  ****************** reset password API ****************** //
    async resetpassword(parent, args, ctx, info){
        if(ctx.TenantId){
        let userdatapas= {            
            UserName        : args.data.UserName,           
            Password        : args.data.Password,            
        }
        let passwhere = {            
            UserName: args.data.UserName
        }
        let passdata = {
            Password : args.data.Password
        }

         return   ctx.db.mutation.updateUser({  where: passwhere, data: passdata}).then((passworddataresult) => {
                console.log("check updated password")
                console.log(passworddataresult)
                // return { Message: "User is created" }
            //    return passworddataresult
                return idserverresetpassword(passworddataresult, args.data).then((idserverresult) => {
                   console.log("idserverchangepassword")
                   console.log(idserverresult)
                    // return idserverresult
                    return { Message: idserverresult }
                   
                }).catch((error) =>{
                    console.log("errorid")
                    console.log(error)
                })
          
            }).catch((err)=>{
                console.log("chage password")
                throw new Error(err)
            })
        }
        else{
            throw new Error("User Not Valid")
        }
    },

    // ********************** Forgot Password******************** //
    async forgotpassword(parent, args, ctx, info){
        console.log("forgotpassword")
        let errmsg = '';
        let passworddataresult = {
            UserName: args.UserName,
            Email : args.Email
        }
        return idserverforgotpassword(passworddataresult).then((result)=>{
            console.log("forgotpassword result")
            console.dir(result)
            console.log("check status")
            let datastore = JSON.parse(result)
            // result = {"Status": "success", "Password": "w{!Z2tjI"}
            console.log("check status success")
            console.log(datastore.Status)
            if(datastore.Status == 'success'){
                let userwhere = {            
                    UserName: args.UserName
                }
                console.log("userwhere")
                console.log(userwhere)
                console.log(datastore.Password)
                var encryptedPassword           = encryptor.encrypt(datastore.Password);
                console.log("encrypted password")
                console.log(datastore.Password)
                console.log(encryptedPassword)
                let passwhere = {            
                    Password:encryptedPassword
                }            
                return  ctx.db.mutation.updateUser( {where:userwhere, data: passwhere} ).then((result)=>{
                    console.log("updateuserpassword")
                    console.log(result)
                     return { Message: "Please check your email to reset your password." }
                }).catch((err)=>{
                    console.log("conosle errr")
                    throw new Error(err)
                })

            }else{
                errmsg = datastore.Message
                throw new Error(errmsg)

            }
           
        }).catch((err)=>{
            throw new Error(errmsg)
        })


    },


//******** create subscription integration //********
    async createsubscriptionintegration(parent, args, ctx, info) {
        throw new Error("Temporary not in use ")
        console.log("createsubscriptionintegration")
        if (args && args.data.PrimaryPluginId && args.data.SecondaryPluginId) {
            return checkvalidplugin(args.data.PrimaryPluginId, args.data.SecondaryPluginId, ctx)
            .then((res) => {
                console.log("final response")
                console.log(res)
                if(res && res.length > 0){
                    let connectorid : any = []
                    connectorid.push(res[0].ConnectorId)
                    
                    let checkintegration = {
                        AND: [
                            { ConnectorId: { ConnectorId:res[0].ConnectorId } },
                            { TenantId: { TenantId: ctx.TenantId } }
                          ]
                    }
                                    
                    return  ctx.db.query.subscriptionIntegrations({  where: checkintegration}).then((intgres) => {
                    
                        if(intgres && intgres.length == 0){
                        return  subscriptinintegration(connectorid, ctx, ctx.TenantId, args, info, null).then((response) => {
                            return{ "Message" : "subscription created" }      
                        }).catch(() => {
                            throw new Error("error")
                        })
                    }
                    else{
                    throw new Error("Connector not present.....")
                    }
                    }).catch(() => {
                        throw new Error("connector error ")
                    })
                } else {
                    throw new Error("Error")
                }            
            }).catch(() => {
                throw new Error("subscription Integration is already exits")
            })                
        }else {
            throw new Error(`connector is not available`);
        }
    },

    // new api start stop API (subscribe process)
    async startProcess(parent, args, ctx, info){
     
        console.log("start");
        if (ctx.TenantId){
        let scheduledata ;
        let checksheduleentry ;
        let startScheduleType       = "5";
        let stopScheduleType        = "6";
        let scheduleStartType       = "START";
        let scheduleStatus          = "RUNNING";
        let scheduleStartStatus     = "IDLE";
        let processstage            = "RUNNING";
        let scheduleDetails         = null;
        let NextOccurceAt = (new Date(getcurrentDate())).toISOString();
        // throw new Error()
        checksheduleentry = {
            AND: [
                { TenantId                  : { TenantId: ctx.TenantId } },
                { SubscriptionIntegrationId : { SubscriptionIntegrationId: args.where.SubscriptionIntegrationId } },
                { SubscriberProcess         : { SubscriberProcessID: args.where.SubscriberProcessID } },
                { ScheduleType_in           : [ startScheduleType, stopScheduleType ] }
            ]
        }
       
        let scheduleprodata = `{ ScheduleID,SubscriberProcess {SubscriberProcessID,Stage}}`
        return await ctx.db.query.schedules({  where: checksheduleentry }, scheduleprodata)
            .then((createScheduleresult) => {
                let processstart1   : boolean = false;
                let processupdate1  : boolean = false;
                
                if (createScheduleresult.length > 0) 
                {
                    if(createScheduleresult[0].SubscriberProcess.Stage == scheduleStartStatus)
                        processupdate1 = true;
                }
                else
                    processstart1 = true;

                if (processstart1 == true)
                { 
                    scheduledata = {                           
                                    OccursAt        : getcurrentDate(),     
                                    SubscriberProcess : { connect : { SubscriberProcessID : args.where.SubscriberProcessID } },
                                    SubscriptionIntegrationId : { connect : { SubscriptionIntegrationId : args.where.SubscriptionIntegrationId } },
                                    TenantId        : { connect : { TenantId : ctx.TenantId } },
                                    ScheduleType    : startScheduleType,
                                    NextOccurence   : NextOccurceAt,
                                    Status          : scheduleStatus,
                                    CreatedDate     : getcurrentDate(),
                                    CreatedBy       : "gumuadmin",
                                    Type            : scheduleStartType
                                }
                return ctx.db.mutation.createSchedule({  data: scheduledata }).then((createScheduleresultd) => {
                    scheduleDetails = createScheduleresultd;
                    let updateprocessstagedata ={
                        Stage :processstage
                    }
                    let updateprocesswhere = {
                        SubscriberProcessID : args.where.SubscriberProcessID
                    }
                    return ctx.db.mutation.updateManySubscriberProcesses({where : updateprocesswhere, data : updateprocessstagedata }).then((startprocessresponce) => {
                        return schedulerConnection(ctx,ctx.TenantId, args.where.SubscriberProcessID, startScheduleType, scheduleDetails.ScheduleID)
                        .then(() => {  
                            return {
                                        "Message"   :   "Process started successfully",
                                        "Status"    :   processstage//startprocessresponce.Stage                            
                                    }
                        }).catch (() => {
                             return {
                                        "Message"   :   "Process started successfully",
                                        "Status"    :   processstage//startprocessresponce.Stage                            
                                    }
                        })
                      
                    }).catch((err) =>{
                        throw new Error("Error Occure while starting process")
                    })
                    

                }).catch((scheduleerr) =>{
                    throw new Error(scheduleerr)
                })
            }
            else if (processupdate1 == true)
            {
                let updatedata = {
                                    ScheduleType    : startScheduleType,
                                    Status          : scheduleStatus,
                                    Type            : scheduleStartType
                                }

                let updatewhere = { ScheduleID : createScheduleresult[0].ScheduleID }
                return ctx.db.mutation.updateSchedule({  data: updatedata, where: updatewhere })
                    .then((updatestas) =>{
                        let updateprostagedata ={
                            Stage :processstage
                        }
                        let updateproswhere = {
                            SubscriberProcessID : args.where.SubscriberProcessID
                        }
                        return ctx.db.mutation.updateSubscriberProcess({data:updateprostagedata, where: updateproswhere }).then((updateprostage) =>{
                                return schedulerConnection(ctx,ctx.TenantId, updateprostage.SubscriberProcessID, startScheduleType, updatestas.ScheduleID)
                                .then(() => {     
                                    return {
                                        "Message"   : "Process Started successfully",
                                        "Status"    : updateprostage.Stage                             
                                }
                                }).catch (() => {
                                     return {
                                        "Message"   : "Process Started successfully",
                                            "Status"    : updateprostage.Stage                              
                                }
                                })

                        }).catch((err) =>{
                            throw new Error("error occure while updating stage")
                        })
                        
                    }).catch((err) =>{
                        throw new Error()
                    })
            }
            else
            {
                throw new Error("Process is already Started");
            }   
            })
        }else{
            throw new Error(`User is Unauthorized`);
        }
    }, 

    // Stop process in subscriber process
    async stopProcess(parent, args, ctx, info){
        let checksheduleentry1 ;
        let scheduledatastop ;
        let scheduledatastopdata;
        
        if(ctx.TenantId){
            let scheduleStopStatus  = "IDLE";
            
            let processstage = "IDLE"
            checksheduleentry1 = {
                AND: [
                    { TenantId                  : { TenantId: ctx.TenantId } },
                    { SubscriptionIntegrationId : { SubscriptionIntegrationId: args.where.SubscriptionIntegrationId } },
                    { SubscriberProcess         : { SubscriberProcessID: args.where.SubscriberProcess } }
                ]
            }
            return await ctx.db.query.schedules({  where: checksheduleentry1 }).then((createScheduleresult1) =>{
             

                let processstart1   : boolean = false;
                let processupdate1  : boolean = false;
                
                if (createScheduleresult1.length > 0) 
                {
                    processstart1 = true;
                }
                else
                    processupdate1 = true;                    

                if (processstart1 == true)
                { 
                    scheduledatastop = {                     
                                AND: [
                                        { SubscriberProcess: { SubscriberProcessID : args.where.SubscriberProcess } },
                                        { TenantId: { TenantId : ctx.TenantId } } ,
                                        { SubscriptionIntegrationId: { SubscriptionIntegrationId : args.where.SubscriptionIntegrationId } }
                                    ]
                                        }
                    scheduledatastopdata = {
                                            Status          : scheduleStopStatus
                                        }
                    return  ctx.db.mutation.updateManySchedules({  where: scheduledatastop,data :scheduledatastopdata })
                        .then((createScheduleresult1) => {
                            let updateprostagedata1 ={
                                Stage :processstage
                            }
                            let updateproswhere1 = {
                                SubscriberProcessID : args.where.SubscriberProcessID
                            }
                            return ctx.db.mutation.updateSubscriberProcess({data: updateprostagedata1, where:updateproswhere1 }).then((stopproresult) =>{
                              
                                console.log("stopppp")
                                console.log(stopproresult)
                                return {
                                    "Message"   : "Process Stopped Successfully",
                                    "Status"    : stopproresult.Stage
                                }
                            }).catch((err) =>{
                                throw new Error("Schedule Stopped Successfully")
                            })
                        }).catch((scheduleerr1) => {
                            throw new Error(scheduleerr1)
                        })  
            }
            else if (processupdate1 == true)
            {
                let updateprostagedata21 ={
                    Stage :processstage
                }
                let updateproswhere21 = {
                    SubscriberProcessID : args.where.SubscriberProcessID
                }
                return ctx.db.mutation.updateSubscriberProcess({data:updateprostagedata21, where: updateproswhere21}).then((updateSubscriberProcess) =>{
                                return {
                                    "Message"   : "Process upadate Stop successfully",
                                    "Status"    : updateSubscriberProcess.Stage,
                                }
                            }).catch((error) =>{
                               
                                throw new Error("update process error")
                            })              
            }
            else
            {
                throw new Error("Process is already Stop");
            }   
            })
        }
    },

// ******* set schedule function (daily, weekly, mothly)
    async setSchedule(parent, args, ctx, info) { 
        if (ctx.TenantId)
        {       
            let checksheduleentryMonthly;
            let scheduledatadaily;
            let scheduledataweekly;
            let checksheduleentryWeekly;
            let scheduledatamothly;
            let dailyScheduleType       = "1";
            switch(args.data.ScheduleType){       
                case "1" :
                    let scheduleDailyStatus = "IDLE";
                    if (args.data.OccursAt)
                    {
                        let dbTime = DailyOccuresAtDate(args.data.OccursAt)
                    scheduledatadaily = {                           
                                            OccursAt            : dbTime.OccursAt,     
                                            SubscriberProcess   : { connect : { SubscriberProcessID : args.data.SubscriberProcess } },
                                            SubscriptionIntegrationId : { connect : { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId } },
                                            TenantId            : { connect : { TenantId : ctx.TenantId } },                    
                                            ScheduleType        : dailyScheduleType,
                                            DailyInterval       : "1",
                                            DailyIntervalSpan   : "1",
                                            DayofMonth          : null,
                                            NextOccurence       : dbTime.NextOccurance,
                                            Status              : scheduleDailyStatus,
                                            CreatedDate         : getcurrentDate(),
                                            CreatedBy           : "gumuadmin",
                                            DailyRecurrenceType : "2",
                                            StartTime           : null,
                                            EndTime             : null,
                                        }
                                        console.log("nextoccurce")
                                        console.log(scheduledatadaily.NextOccurence)
                            }
                            else 
                            {
                                throw new  Error("Occurs date invalid")
                            }                   
                    return await ctx.db.mutation.createSchedule({  data: scheduledatadaily})
                        .then((createScheduleresult2) => {
                            return schedulerConnection(ctx,ctx.TenantId, args.data.SubscriberProcess, dailyScheduleType, createScheduleresult2.ScheduleID)
                            .then(() => {                                
                                return {
                                    "Message"   : "Schedule set Successfully"
                                }
                            }).catch (() => {
                                return {
                                    "Message"   : "Schedule set Successfully"
                                }
                            })
                        }).catch((scheduleerr2) =>{
                            throw new Error(scheduleerr2)
                        });
                break ;

                case "2" :
                    let scheduleDailyeveryStatus = "IDLE";
                    console.log("args.data.DailyInterval")
                    console.log(args.data.DailyInterval)
                    console.log("args.data.DailyIntervalSpan")
                    console.log(args.data.DailyIntervalSpan)
                    if (args.data.DailyIntervalSpan  != null && args.data.DailyIntervalSpan != '')
                    {
                        if (args.data.StartTime  != null && args.data.StartTime != ''){
                            if (args.data.EndTime  != null && args.data.EndTime != ''){
                        let occurseverydate = DailyOccurceEveryDate(args.data.DailyIntervalSpan, args.data.DailyInterval, args.data.StartTime,args.data.EndTime)
                        if(!occurseverydate.error){
                    scheduledatadaily = {                           
                                            OccursAt            : occurseverydate.OccursAt,     
                                            SubscriberProcess   : { connect : { SubscriberProcessID : args.data.SubscriberProcess } },
                                            SubscriptionIntegrationId : { connect : { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId } },
                                            TenantId            : { connect : { TenantId : ctx.TenantId } },                    
                                            ScheduleType        : args.data.ScheduleType,
                                            DailyInterval       : occurseverydate.DailyIntervalSpan,
                                            DailyIntervalSpan   : occurseverydate.DailyInterval,
                                            DayofMonth          : null,
                                            NextOccurence       : occurseverydate.NextOccurance,
                                            Status              : scheduleDailyeveryStatus,
                                            CreatedDate         : getcurrentDate(),
                                            CreatedBy           : "gumuadmin",
                                            DailyRecurrenceType : "1",
                                            StartTime           : occurseverydate.StartTime,
                                            EndTime             : occurseverydate.EndTime
                                        }  
                                        console.log("schedule data")
                                        console.log(scheduledatadaily)
                            ///BELOW CONSOLES COMMENTED AS IN ONE OF LOGS ASSIGNED THE RANDOM VALUE TO THE OCCURS_AT DATE
                                        // console.log(scheduledatadaily)  
                                        // let abcdrt = scheduledatadaily.OccursAt.split(' ')
                                        // console.log(get24hTime(abcdrt[1]) )   
                                        
                                        // console.log(scheduledatadaily.OccursAt=abcdrt[1])
                                        // console.log(scheduledatadaily.timeOutput(scheduledatadaily.OccursAt))                
                    return await ctx.db.mutation.createSchedule({  data: scheduledatadaily})
                        .then((createScheduleresult2) => {
                                return schedulerConnection(ctx,ctx.TenantId, args.data.SubscriberProcess, args.data.ScheduleType, createScheduleresult2.ScheduleID)
                                .then(() => {                                
                                    return {
                                        "Message"   : "Schedule set Successfully"
                                    }
                                }).catch (() => {
                                    return {
                                        "Message"   : "Schedule set Successfully"
                                    }
                                })
                        }).catch((scheduleerr2) =>{
                            throw new Error(scheduleerr2)
                        });
                    }else{
                        throw new Error(occurseverydate.error)
                    }
                }else
                {
                    throw new  Error("Occurs  date invalid")
                }
                }else
                {
                    throw new  Error("Occurs  date invalid")
                } 
                    }

                    else
                    {
                        throw new  Error("Occurs  date invalid")
                    }  
                        
                break ;
                
                case "3" :
                    let scheduleWeeklyStatus    = "IDLE";
                   
                    checksheduleentryWeekly = {
                        AND: [
                            { TenantId                  : { TenantId: ctx.TenantId } },
                            { SubscriptionIntegrationId : { SubscriptionIntegrationId: args.data.SubscriptionIntegrationId } },
                            { SubscriberProcess         : { SubscriberProcessID: args.data.SubscriberProcess } },
                            { ScheduleType              :  args.data.ScheduleType    }
                        ]
                    }
                   
                    return await ctx.db.query.schedules({  where: checksheduleentryWeekly }).then((createScheduleresultWeekly) => {
                      

                        let processstart1   : boolean = false;
                        let processupdate1  : boolean = false;
                        
                        if (createScheduleresultWeekly.length > 0) 
                        {
                            if (createScheduleresultWeekly[0].ScheduleType == args.data.ScheduleType)
                                processupdate1 = true;
                        }
                        else
                            processstart1 = true;

                            let weeklytime = getWeeklySchedultDate(args.data.WeekDays, args.data.OccursAt)
                        if(!weeklytime.error){
                        if (processstart1 == true)
                        { 
                            scheduledataweekly = {
                                    OccursAt        :weeklytime.OccursAt,     
                                    SubscriberProcess : { connect : { SubscriberProcessID : args.data.SubscriberProcess } },
                                    SubscriptionIntegrationId : { connect : { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId } },
                                    TenantId        : { connect : { TenantId : ctx.TenantId } },
                                    ScheduleType    : args.data.ScheduleType,
                                    NextOccurence   : weeklytime.NextOccurance,
                                    Status          : scheduleWeeklyStatus,
                                    CreatedDate     : getcurrentDate(),
                                    CreatedBy       : "gumuadmin",
                                    WeekDays        : {"set" : weeklytime.weekDays}
                            }
                        return  ctx.db.mutation.createSchedule({  data: scheduledataweekly})
                            .then((createScheduleresult4) => {
                                    return schedulerConnection(ctx,ctx.TenantId, args.data.SubscriberProcess, args.data.ScheduleType, createScheduleresult4.ScheduleID)
                                .then(() => {                                
                                    return {
                                        "Message"   : "Weekly Schedule set Successfully"
                                    }
                                }).catch (() => {
                                    return {
                                        "Message"   : "Weekly Schedule set Successfully"
                                    }
                                })
                            }).catch((scheduleerr4) => {
                                throw new Error(scheduleerr4)
                            })                   
                    }
                    else if (processupdate1 == true)
                    {
                        let updatedata = {
                                            WeekDays            : {"set" : weeklytime.weekDays},
                                            OccursAt            : weeklytime.OccursAt,
                                            NextOccurence       : weeklytime.NextOccurance,
                                            
                                        }
                        let updatewhere = { ScheduleID : createScheduleresultWeekly[0].ScheduleID }
                        return ctx.db.mutation.updateSchedule({  data: updatedata, where: updatewhere })
                            .then((updatestas) =>{
                                    return schedulerConnection(ctx,ctx.TenantId, args.data.SubscriberProcess, args.data.ScheduleType, updatestas.ScheduleID)
                                .then(() => {                                
                                    return {
                                        "Message"   : "Weekly Schedule Updated successfully"
                                    }
                                }).catch (() => {
                                    return {
                                        "Message"   : "Weekly Schedule Updated successfully"
                                    }
                                })
                            }).catch((err) =>{
                                throw new Error()
                            })
                    }
                    else
                    {
                        throw new Error("Process is already Started");
                    }   
                }else{
                    throw new Error("Occurs time and atleast one week of day must be selected")
                }
                    })
                  
                break;
                
                case "4" :
                    let scheduleMonthlyStatus       = "IDLE";
                    checksheduleentryMonthly = {
                        AND: [
                            { TenantId                  : { TenantId: ctx.TenantId } },
                            { SubscriptionIntegrationId : { SubscriptionIntegrationId: args.data.SubscriptionIntegrationId } },
                            { SubscriberProcess         : { SubscriberProcessID: args.data.SubscriberProcess } },
                            { ScheduleType              :  args.data.ScheduleType    }
                        ]
                    }
                    return await ctx.db.query.schedules({  where: checksheduleentryMonthly }).then((createScheduleresultMonthly) => {
                        let processstart1   : boolean = false;
                        let processupdate1  : boolean = false;
                        
                        if (createScheduleresultMonthly.length > 0) 
                        {
                            if (createScheduleresultMonthly[0].ScheduleType == args.data.ScheduleType)
                                processupdate1 = true;
                        }
                        else
                            processstart1 = true;
                           let monthlyschedule =  getMonthDateByDay(args.data.DayofMonth,args.data.OccursAt)
                           console.log("monthlyschedule")
                           console.log(monthlyschedule)
                        if(!monthlyschedule.error ){
                            if (processstart1 == true)
                            { 
                               
                                scheduledatamothly = {
                                    OccursAt        : monthlyschedule.OccursAt,     
                                    SubscriberProcess : { connect : { SubscriberProcessID : args.data.SubscriberProcess } },
                                    SubscriptionIntegrationId : { connect : { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId } },
                                    TenantId        : { connect : { TenantId : ctx.TenantId } },
                                    ScheduleType    : args.data.ScheduleType,
                                    NextOccurence   :  monthlyschedule.NextOccurance,
                                    Status          : scheduleMonthlyStatus,
                                    CreatedDate     : getcurrentDate(),
                                    CreatedBy       : "gumuadmin",
                                    DayofMonth      : monthlyschedule.DayofMonth,
                                   
                                }
                        return  ctx.db.mutation.createSchedule({  data: scheduledatamothly})
                            .then((createScheduleresult4) => {
                                    return schedulerConnection(ctx,ctx.TenantId, args.data.SubscriberProcess, args.data.ScheduleType, createScheduleresult4.ScheduleID)
                                    .then(() => {                                
                                        return {
                                            "Message"   : "Monthly Schedule set Successfully"
                                        }
                                    }).catch (() => {
                                        return {
                                            "Message"   : "Monthly Schedule set Successfully"
                                        }
                                    })
                            }).catch((scheduleerr4) => {
                                // throw new Error(scheduleerr4)
                                console.log("scheduleerr4")
                                return{
                                    "Message" : "Invalid date "
                                }
                                
                            })  
                        }
                        else if (processupdate1 == true)
                        {
                            let updatedata = {
                                                OccursAt            : monthlyschedule.OccursAt,
                                                NextOccurence       : monthlyschedule.NextOccurance,
                                                DayofMonth          : monthlyschedule.DayofMonth,
                                            }
    
                            let updatewhere = { ScheduleID : createScheduleresultMonthly[0].ScheduleID }
    
                            return ctx.db.mutation.updateSchedule({  data: updatedata, where: updatewhere })
                                .then((updatestas) =>{
                                    return schedulerConnection(ctx,ctx.TenantId, args.data.SubscriberProcess, args.data.ScheduleType, updatestas.ScheduleID)
                                    .then(() => {                                
                                        return {
                                            "Message"   : "Monthly Schedule Updated Successfully"
                                        }
                                    }).catch (() => {
                                        return {
                                            "Message"   : "Monthly Schedule Updated Successfully"
                                        }
                                    })
                                }).catch((err) =>{
                                    throw new Error()
                            })
                        }
                        else
                        {
                            throw new Error("Process is already Started");
                        }  

                        }
                        else{
                            throw new Error("Provide valid Day of Month and Occurs At date values")
                        }
                        
                    })

                break;

                default :
                    throw new Error ("stage not define");
                break ;
            }        
        }
        else
        {
            throw new Error(`User is Unauthorized`);
        }
    },
  
// ************** update connection setting in in subscription integration  ********************
    async updateconnectionstructure(parent, args, ctx, info) {
        if (args && args.data.PluginID)
        {
            const connesetting = {   
                                    AND :   [   
                                                { ConnectorId : { PrimaryPluginId : { PluginID : args.data.PluginID } } },
                                                { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId } 
                                            ]
                                }
            let connresult = await ctx.db.query.subscriptionIntegrations({ where : connesetting })
            if (connresult && connresult.length > 0) 
            {
                let updateconnsetting       = { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId };
                let connectionStructureData = [];
                args.data.connectionstructure.forEach(singleStructure => {
                    let updatedStructure = { 
                        where:  { Name   : singleStructure.Name },
                        data:   { Value   : singleStructure.Value }
                    };
                    connectionStructureData.push(updatedStructure);
                });

                let updateconnsettingdata   = {
                    PrimaryPluginConnectionData: {
                        updateMany: connectionStructureData
                    }
                }

                return await ctx.db.mutation.updateSubscriptionIntegration({ where : updateconnsetting, data:updateconnsettingdata })
                    .then((res)=>{
                        return { result : "Subscription Integration Connection Updated for primary plugin" }                        
                    }).catch((err) => {
                        throw new Error("invalid")
                    });    
            }
            else 
            {
            const connesettingsecnd = {    
                                        AND :[  { ConnectorId : { SecondaryPluginId : { PluginID : args.data.PluginID } } },
                                                { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId }
                                            ]
                                    }
            let connresultsend = await ctx.db.query.subscriptionIntegrations({ where : connesettingsecnd})
            if (connresultsend && connresultsend.length > 0)
            {
                let updateconnsetting = { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId };
                let connectionStructureData = [];
                args.data.connectionstructure.forEach(singleStructure => {
                    let updatedStructure = { 
                        where: { Name   : singleStructure.Name },
                        data: { Value   : singleStructure.Value }
                    };
                    connectionStructureData.push(updatedStructure);
                });

                let updateconnsettingdata   = {
                    SecondaryPluginConnectionData: {
                        updateMany: connectionStructureData
                    }
                }

                return  ctx.db.mutation.updateSubscriptionIntegration({ where : updateconnsetting, data:updateconnsettingdata })
                    .then((res)=>{
                        return {result : "Subscription Integration Connection Updated for secondary plugin"}                        
                    }).catch((err) => {
                        throw new Error("invalid")
                    });    
                }
                else
                {
                    throw new Error("invalid pluginID or subscription integrationID");
                }
            }
        }
        else
        {
            throw new Error("invalid")
        }
    },

    // update subscription integration status
    
async updateIntegrationstatus(parent, args, ctx, info) {
    let updatedstatus1 = null
    if (args.data.Status == 'ENABLE')
    {
        updatedstatus1 = 'DISABLE'
    }
    else
    {
        updatedstatus1 = 'ENABLE'
    }
    
    let updateststatusdata = { Status : updatedstatus1 };
    let whereintegrationid = { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId };
    return  ctx.db.mutation.updateSubscriptionIntegration({ data : updateststatusdata, where: whereintegrationid })
        .then((updateresult) => {
            return {"Message" : "Subscription Integration Status Updated Successfully"}
        }).catch(() => {
            throw new Error("Integration ID is Incorrect")
        })
 },

    //  update Daily_schedule(occurceAT) 
     async UpdateDailySchedule(parent, args, ctx, info) {
        let dailyschdulewhere = {
            AND:[
                {
                  ScheduleID : args.data.ScheduleID
                },
                {
                  ScheduleType: args.data.ScheduleType
                },
                {
                    TenantId: {
                        TenantId : ctx.TenantId
                    }
                }
              ]
            };
        let dbTime = DailyOccuresAtDate(args.data.OccursAt)
        let dailyschduledata = {
            
                                    OccursAt        : dbTime.OccursAt,
                                    NextOccurence   : dbTime.NextOccurance
                                }
                                console.log("updatescheduledaily")
                                console.log(dailyschduledata)
        return  ctx.db.mutation.updateManySchedules({where : dailyschdulewhere, data : dailyschduledata})
            .then((updateDailyScheduleRes) => {
                console.log("--then result")
                console.log(updateDailyScheduleRes)
                let getschedule = {
                    ScheduleID : args.data.ScheduleID
                }
                let getscheduleinfo = `{ScheduleID,SubscriberProcess {SubscriberProcessID}}`
                return ctx.db.query.schedules({where: getschedule},getscheduleinfo).then((getscheduleresult) =>{
                return schedulerConnection(ctx,ctx.TenantId, getscheduleresult[0].SubscriberProcess.SubscriberProcessID, args.data.ScheduleType,  args.data.ScheduleID)
                            .then(() => {                                
                                return {
                                    "Message"   : "Daily schedule settings updated successfully."
                                }
                            }).catch (() => {
                                return {
                                    "Message"   : "Daily schedule settings updated successfully."
                                }
                            })
                        })
            }).catch((err) => {
                console.log(err)
                throw new Error("Schedule ID is Incorrect")
            })
     },

    //  update Daily_Schedule(occurceevery)
     async updatedailyOccurcEveryschedule(parent, args, ctx, info){
         console.log("updatedailyOccurcEveryschedule")
         console.log(args.data.DailyIntervalSpan)
        if(args.data.DailyIntervalSpan != null && args.data.DailyIntervalSpan != ''){
            let occurceerverywhere = {
                AND:[
                    {
                      ScheduleID : args.data.ScheduleID
                    },
                    {
                      ScheduleType: args.data.ScheduleType
                    },
                    {
                        TenantId: {
                            TenantId : ctx.TenantId
                        }
                    }
                  ]
            }
    
            let occurseverydate = DailyOccurceEveryDate(args.data.DailyIntervalSpan, args.data.DailyInterval, args.data.StartTime,args.data.EndTime)        
            ///HERE IF ERROR PRESENT INSIDE DailyOccurceEveryDate THEN THROWING THE ERROR 
            console.log("occurseverydate")
            console.log(occurseverydate)
            console.log("occurseverydateoccurseverydate")
            console.log("args.data.DailyInterval")
            console.log(args.data.DailyInterval)
            console.log(occurseverydate.DailyInterval);
            
            if ( occurseverydate.error != null ) {
                console.log("occurseverydate")
                console.log(occurseverydate.error)
                // throw  occurseverydate.error;
                throw new Error("Invalid time for today please select time till 11.59PM only")
            }
            else{
                let occurceerverydata = {            
                    StartTime       : occurseverydate.StartTime,
                    EndTime         : occurseverydate.EndTime,           
                    DailyIntervalSpan : occurseverydate.DailyInterval,
                    DailyInterval   : occurseverydate.DailyIntervalSpan,
                    NextOccurence       : occurseverydate.NextOccurance,
                    OccursAt :occurseverydate.OccursAt          
        
                }
                console.log("starttime check")
                console.log(occurceerverydata)
                console.log("occurseverydate.StartTime")
                console.log(occurseverydate.StartTime)
                if(occurseverydate.StartTime  != null){
                    console.log("ifffffffloop")
                    return ctx.db.mutation.updateManySchedules({where : occurceerverywhere, data :   occurceerverydata})
                    .then((updateDailyScheduleOccursEveryRes) => {
                        let getschedule = {
                            ScheduleID : args.data.ScheduleID
                        }
                        let getscheduleinfo = `{ScheduleID,SubscriberProcess {SubscriberProcessID}}`
                        return ctx.db.query.schedules({where: getschedule},getscheduleinfo).then((getscheduleresult) =>{
                        return schedulerConnection(ctx,ctx.TenantId, getscheduleresult[0].SubscriberProcess.SubscriberProcessID, args.data.ScheduleType,  args.data.ScheduleID)
                                    .then(() => {                                
                                        return {
                                            "Message"   : "Daily schedule settings updated successfully for occursEvery option."
                                        }
                                    }).catch (() => {
                                        return {
                                            "Message"   : "Daily schedule settings updated successfully for occursEvery option."
                                        }
                                    })
                                })
                    }).catch((err) => {
                        throw new Error("Schedule ID is Incorrect")
                    })
                }else{
                    throw new Error("End Time should be greter than start time")
                    console.log("value null")
                }
            }
        }
        else{
            throw new Error("Enter valid time")
        }
         
        // return ctx.db.mutation.updateManySchedules({where : occurceerverywhere, data :   occurceerverydata})
        //     .then((updateDailyScheduleOccursEveryRes) => {
        //         let getschedule = {
        //             ScheduleID : args.data.ScheduleID
        //         }
        //         let getscheduleinfo = `{ScheduleID,SubscriberProcess {SubscriberProcessID}}`
        //         return ctx.db.query.schedules({where: getschedule},getscheduleinfo).then((getscheduleresult) =>{
        //         return schedulerConnection(ctx,ctx.TenantId, getscheduleresult[0].SubscriberProcess.SubscriberProcessID, args.data.ScheduleType,  args.data.ScheduleID)
        //                     .then(() => {                                
        //                         return {
        //                             "Message"   : "Daily schedule settings updated successfully for occursEvery option."
        //                         }
        //                     }).catch (() => {
        //                         return {
        //                             "Message"   : "Daily schedule settings updated successfully for occursEvery option."
        //                         }
        //                     })
        //                 })
        //     }).catch((err) => {
        //         throw new Error("Schedule ID is Incorrect")
        //     })
     },

    //  update weekly-Schedule
    async updateWeeklyScheduleAPI(parent, args, ctx, info){
        let weeklyscheduledata = {
            AND:[
                {
                  ScheduleID : args.data.ScheduleID
                },
                {
                  ScheduleType: args.data.ScheduleType
                },
                {
                    TenantId: {
                        TenantId : ctx.TenantId
                    }
                }
              ]
              
              
        }
        console.log("args.data.ScheduleID")
        console.log(args.data.ScheduleID)
        let weeklytime = getWeeklySchedultDate(args.data.WeekDays, args.data.OccursAt)
        console.log("args.data.weekDays")
        console.log(weeklytime)
        console.log(args.data.weekDays)
        if(weeklytime.error != null){
            console.log('select atleast one week of day');
            throw new Error("select atleast one week of day");     
        }else{
            // throw new Error("select atleast one day")
            //    alert("update")
        console.log("update")
        const  weeklyschedulewhere = {
            WeekDays        : {"set" : weeklytime.weekDays},
            OccursAt        : weeklytime.OccursAt,
            NextOccurence   : weeklytime.NextOccurance,
            CreatedDate     : getcurrentDate()}

            return await ctx.db.mutation.updateManySchedules({where :  weeklyscheduledata, data :   weeklyschedulewhere})
            .then((updateWeeklyScheduleRes) => {
                let getschedule = {
                    ScheduleID : args.data.ScheduleID
                }
                console.log("getschedule.ScheduleID")
                console.log(getschedule.ScheduleID)
                let getscheduleinfo = `{ScheduleID,SubscriberProcess {SubscriberProcessID}}`
                console.log("info")
                console.log(getscheduleinfo)
                return ctx.db.query.schedules({where: getschedule},getscheduleinfo).then((getscheduleresult) =>{
                //    for( let i = 0; i < getscheduleresult.lenght ; i++){
                    // if(getscheduleresult)
                    // for(let i=0; i<resultsogsub.length;i++){
                    //     if(resultsogsub[i].LastSyncDate == null){
                    //        resultsogsub[i].LastSyncDate= '' 
                    //     }
                    //     else if(resultsogsub[i].LastSyncDate == resultsogsub[i].LastSyncDate){
                    //        let displaylogsdatetable = resultsogsub[i].LastSyncDate
                // }


                    console.log("getscheduleresult------------------------")
                    console.log(getscheduleresult)
                    console.log("getscheduleresult--****")
                    console.log(getscheduleresult[0].SubscriberProcess)
                    console.log("getscheduleresult.SubscriberProcess.SubscriberProcessID")
                    console.log(getscheduleresult[0].SubscriberProcess.SubscriberProcessID)
                return schedulerConnection(ctx,ctx.TenantId, getscheduleresult[0].SubscriberProcess.SubscriberProcessID, args.data.ScheduleType,  args.data.ScheduleID)
                            .then(() => {                                
                                return {
                                    "Message"   : "Weekly schedule settings updated successfully."
                                }
                            }).catch (() => {
                                return {
                                    "Message"   : "Weekly schedule settings updated successfully."
                                }
                            })
                        })
            }).catch((err) => {
                console.log("weekly error")
                throw new Error(err)
            })
        

        }
        
       
    }, 

    // update monthly-Schedule
    async updateMonthlySchedule(parent, args, ctx, info){
        let monthscheduledata = {
            AND:[
                {
                  ScheduleID : args.data.ScheduleID
                },
                {
                  ScheduleType: args.data.ScheduleType
                },
                {
                    TenantId: {
                        TenantId : ctx.TenantId
                    }
                }
              ]
        }
        
        let monthlyschedule =  getMonthDateByDay(args.data.DayofMonth,args.data.OccursAt)
        if ( monthlyschedule.error != null) {
            console.log('valid DayofMonth or occurs At date not found inupdateMonthlySchedule call ');
            throw new Error("Provide valid Day of Month and Occurs At date values");        
        } else {
            let monthschedulewhere = {
                DayofMonth      : monthlyschedule.DayofMonth,
                OccursAt        : monthlyschedule.OccursAt,
                NextOccurence   : monthlyschedule.NextOccurance,
                ModifiedDate    : getcurrentDate()
            }
            return  ctx.db.mutation.updateManySchedules({where :  monthscheduledata, data :   monthschedulewhere})
                .then((updateMonthlyScheduleRes) => {
                    let getschedule = {
                        ScheduleID : args.data.ScheduleID
                    }
                    let getscheduleinfo = `{ScheduleID,SubscriberProcess {SubscriberProcessID}}`
                    return ctx.db.query.schedules({where: getschedule},getscheduleinfo).then((getscheduleresult) =>{
                    return schedulerConnection(ctx,ctx.TenantId, getscheduleresult[0].SubscriberProcess.SubscriberProcessID, args.data.ScheduleType,  args.data.ScheduleID)
                                .then(() => {                                
                                    return {
                                        "Message"   : "Monthly schedule settings updated successfully."
                                    }
                                }).catch (() => {
                                    return {
                                        "Message"   : "Monthly schedule settings updated successfully."
                                    }
                                })
                            })
                }).catch((err) => {
                    throw new Error("schedule ID is Incorrect")
                })
        }
        
    },

    //  update subscription process status
   
    async updatesubscribeprocessStatus(parent, args, ctx, info) {
        let updatedstatus = null
        if (args.data.Status == 'ENABLE')
        {
            updatedstatus = 'DISABLE'
        }
        else
        {
            updatedstatus = 'ENABLE'
        }
        let updateststatusdatasub = { Status : updatedstatus };        
        let whereintegrationidsub = { SubscriberProcessID : args.data.SubscriberProcessID };
        return ctx.db.mutation.updateManySubscriberProcesses({ data : updateststatusdatasub, where: whereintegrationidsub })
            .then((updateresult) => {
                return {"Message" : "Subscription Process Status Updated Successfully"}
            }).catch(() => {
                throw new Error("Integration ID is Incorrect")
            });
     },

     async testconnection(parent, args, ctx, info){
         console.log("testconnection")
         let errormsg = ''; 
        if(ctx.TenantId){
            let plugwhere = {
                PluginID : args.data.PluginID
            }
            let connectionresponces = {"Message" : null,"ErrorMessage" : null} 
            let connectionrawdata = args.data.connectionStructure;
            let plugingodata = `{ PluginID,AssemblyName}`
           
            return ctx.db.query.plugin({where : plugwhere}, plugingodata).then((plugintestconn) => {
                if(plugintestconn && plugintestconn.AssemblyName){
                    let bodydata = {"PluginName" : plugintestconn.AssemblyName,"PluginConfig" : null}
                    bodydata.PluginConfig = getConnnectionJson(connectionrawdata)
                    let jsonstr = JSON.stringify(bodydata) 
                    let jsonpars = JSON.parse(jsonstr)
                    return new Promise((resolve, reject) => {
                        let postData = {
                                          "url"         : "http://gumuapistaging.azurewebsites.net/api/TestConnection",
                                          "json"        : true,
                                          "method"      : "POST",
                                          "body"        : jsonpars,
                                          "headers"     : {
                                                            "Content-Type"  : "application/json",
                                                            "Accept"        : "application/json"
                                                        }
                                      }
                                      console.log(postData)
                        return rp(postData)
                              .then(res => {
                                    console.log("\ngetTestConnectionRespose success Response ");
                                    console.dir();res
                                    let resresp;
                                    let isSuccessResponse = true;
                                    try {
                                        resresp =  JSON.parse(res)
                                        console.log("Testconnection External API Response")
                                        console.log(resresp)
                                        console.log("testconnection-status")
                                        console.log(resresp.Status)
                                    } catch (e) {
                                        console.log('Error while parsing testconnection response json ');
                                        console.dir(e);
                                        // throw new Error(e)
                                        isSuccessResponse = false;
                                    }
                                    // resolve(resresp)    
                                    if(isSuccessResponse == true && resresp.Status == 'True'){
                                        console.log("true condition")
                                        return UpdatePluginConnection(parent, args, ctx, info).then((checkresulkt) =>{
                                            console.log("updateconnection")
                                            console.log(checkresulkt)
                                            resolve(resresp)
                                        }).catch((error) =>{
                                            console.log("TestConnection Error while updating PluginConnection to DB ");
                                            console.log(error);
                                            errormsg = error.Message;
                                            reject(errormsg)
                                        })
                                    } else{
                                        console.log("TestConnection API Error from External API");
                                        errormsg = resresp.Message ; 
                                        reject(errormsg)

                                        // throw new error(resresp)
                                    }
                                                              
                              })
                              .catch(err => {
                                  console.log("checkingerror")
                                  console.log(err)
                                    console.log("\ngetTestConnectionRespose Error response ");
                                    // console.log(err)

                                    resolve(connectionresponces)
                              });
                      });
                }else{
                    throw new Error("Invalid Plugin Name")
                }
            }).catch((err) =>{
                console.log("err++++++")
                console.log(err)
                // reject(err)
                // return { Message : err}
                console.log("errormsg")
                console.log(errormsg)
                throw new Error(errormsg)
                // return(err)
                
            })

        }
        else{
            throw new Error("user unauthorized")
        }
        
     },

     
     /**
      * This Function Handles Integration Default configuration updation 
      */
     async updateIntegrationConfiguration(parent, args, ctx, info) {
        console.log("Inside updateIntegrationConfiguration resolver")
        if ( ctx.TenantId && args ) 
        {
            // First Checking if provided IntegrationID belongs to Tenant whose Token is present
            const updateWhere   = { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId };
            const where         = { AND : [
                                            { TenantId : { TenantId : ctx.TenantId } },
                                            { ...updateWhere } 
                                        ] }              
            return await ctx.db.query.subscriptionIntegrations({ where })
                .then((integrationRes) => {
                    console.log("integrationRes")
                    console.log(integrationRes)
                    // As if no entries found then user request is invalid
                    if ( integrationRes && integrationRes.length > 0) 
                    {
                        let updatedConfigData = [];
                        //If authorized user then preparing the mutation data for updating configuration Answers/Value
                        args.data.configuration.forEach(singleConfig => {
                            let updatedConfig = { 
                                                    where: { AND: [ { PluginId  : singleConfig.PluginId }, 
                                                                    { EntityID  : singleConfig.EntityID }, 
                                                                    { FieldName : singleConfig.FieldName } ] },
                                                    data: { Value   : singleConfig.Value, 
                                                            Answers : singleConfig.Value,
                                                            IsRequired : singleConfig.IsRequired,
                                                            IsViewable : singleConfig.IsViewable,
                                                            IsEditable : singleConfig.IsEditable    
                                                        }
                                                };
                            updatedConfigData.push(updatedConfig);
                            console.log("updatedConfigData")
                            console.log(updatedConfigData)
                           

                        });
                        console.log("updatedConfigData[0].data")
                        console.log(updatedConfigData[0].data)
                        // if(updatedConfigData != null){
                            
                        // }
                        let data = { ConfigStructure : { updateMany: updatedConfigData } };
                        return ctx.db.mutation.updateSubscriptionIntegration({ where : updateWhere, data })
                            .then((updateresult) => {
                                console.log("updateresult")
                                console.log(updateresult)
                                return { "Message" : "Integration configuration updated successfully." };
                            }).catch((err) => {
                                console.log("Error while updating default config");
                                console.dir(err);
                                throw new Error(err);
                            });    
                    } 
                    else 
                        throw new Error("SubscriptionIntegrationId is invalid.");
            }).catch((err) => {
                    console.log("subscriptionIntegrations get catch response :- ");
                    console.dir(err);
                    throw new Error(err);
            })
        } 
        else 
        {
            throw new Error("Please Provide all the mandatory Input fields for configuration update. ")
        }
     }
}
// ************* end custom resolver *************** //

async function checkconnector(ConnectorsId,  ctx, Message) {
    console.log(" checkconnector ")
    let ConnectorsPromise = [];
    let emptyData:any = [];
    let returnResponse = { "data" : emptyData , "error" : null };
    ConnectorsId.forEach( ConnectorId => {
        ConnectorsPromise.push(
            new Promise((resolve, reject) => {
        let connector = {
            ConnectorId : ConnectorId            
         }
         console.log("connectorid")
         console.log(connector)
      
        let signupconnectors =   `{ConnectorId,ConnectorTitle,ConnectorShortDesc,ConnectorLongDesc,PrimaryPluginId{PluginID,PluginName,ConnStructure{Name,Label,Value, IsViewable, IsEditable, IsRequired, SortOrder,FieldType,LookupValues,dropdownfieldName}},SecondaryPluginId{PluginID,PluginName,ConnStructure{Name,Label,Value,IsViewable, IsEditable, IsRequired, SortOrder, FieldType,LookupValues,dropdownfieldName}}}`
        return ctx.db.query.connector({ where : connector }, signupconnectors).then((response) => {
            console.log("connector info")
            console.log(response)
            if ( response != null ) {
                resolve(response)
            } else {
                console.log('Valid Connector Id not provided in signUp or some invalid data is present in plugin');
                reject("Provide the valid Connector information");    
            }
        }).catch((error) => {
            console.log('Error in checkconnector FN.');
            console.dir(error);
            reject(" ConnectorID is not valid ");
            })
        }))
    });
    return Promise.all(ConnectorsPromise).then((result) =>{
        // return result;
        returnResponse.data = result;
        return returnResponse;
    }).catch((err) => {
        console.log('Check Connectors Promise.all response : ');
        // throw new Error(err);
        returnResponse.error = 'Internal Server Error, Issue in the selected connector';
        return returnResponse;
    });
}

// check primary plugin and secondary plugin
    async function checkvalidplugin(PrimaryPluginId, SecondaryPluginId, ctx){
        console.log("checkvalidplugin")
        let plugin = {
                        PluginID : PrimaryPluginId            
                    }
        return  ctx.db.query.plugin({where : plugin }).then((response) => {
            if (response)
            {
                let secondaryplugin = {
                    PluginID : SecondaryPluginId            
                }
                return  ctx.db.query.plugin({ where : secondaryplugin })
                .then((secondarypluginresp) => {
                    if (secondarypluginresp )
                    {
                        let connector = {
                                AND: [
                                    { PrimaryPluginId     : { PluginID   : PrimaryPluginId } },
                                    { SecondaryPluginId   : { PluginID   : SecondaryPluginId } }
                                ]
                            }
                        return ctx.db.query.connectors({ where : connector })
                        .then((response) => {
                            if (response  && response.length > 0)
                            {
                                return response
                            }
                            else 
                            {
                                let checkconnector = {                        
                                    AND: [
                                        { PrimaryPluginId     : { PluginID    : SecondaryPluginId } },
                                        { SecondaryPluginId   : { PluginID    : PrimaryPluginId } }
                                    ]
                                }
                                return  ctx.db.query.connectors({ where : checkconnector })
                                    .then((response) => {
                                        if (response)
                                        {
                                            return response
                                        }
                                        else 
                                        {
                                            throw new Error("conector not present")
                                        }                        
                                    }).catch((error) => {                           
                                        throw new Error ("Connector not present")
                                })
                            }                            
                        }).catch((error) => {                        
                            throw new Error ("Connector not present")
                        })
                    } 
                    else
                    {
                        throw new Error("secondary pluginid is not valid")
                    } 
                }).catch((error) => {
                    throw new Error
                })
            }
            else
            {
                throw new Error("Primary pluginid is not valid")
            }        
            }).catch((error) => {
                throw new Error
            })
        
    }

async function subscriptinintegration(ConnectorsId,  ctx, TenantId,args, info, validconnectors){
    console.log('Creating Subscription Integrations mapping to the new user');
    let ConnsubsintPromise = [];
    validconnectors.forEach( singleconnector => {
        ConnsubsintPromise.push(
            new Promise((resolve, reject) => {
                let PrimaryPluginConnectionData     = getConnectorStructure(singleconnector.PrimaryPluginId.ConnStructure);
                let SecondaryPluginConnectionData   = getConnectorStructure(singleconnector.SecondaryPluginId.ConnStructure);
                let subscriptiondata = {
                                        TenantId        : { connect : { TenantId : TenantId } },
                                        ConnectorId     : { connect : { ConnectorId : singleconnector.ConnectorId } },
                                        PrimaryPluginConnectionData   : PrimaryPluginConnectionData,
                                        SecondaryPluginConnectionData : SecondaryPluginConnectionData
                                    }
                    return ctx.db.mutation.createSubscriptionIntegration({data: subscriptiondata })
                        .then((createintegrationres) => {
                            return  insertSubscriberProcesses(ctx, singleconnector.ConnectorId, TenantId, info, createintegrationres )
                        }).then((subscriberProcessres) => {
                            resolve(subscriberProcessres)
                        }).catch((error) => {
                            reject(" ConnectorID is not valid");
                        })
            }))});
    return Promise.all(ConnsubsintPromise).then((result) =>{
        console.log('Subscription Integrations created By selected connectors');
        return result
    }).catch((err) => {
        console.log('Error while creating subscriptionIntegration for new user');
        console.dir(err);
        throw new Error(err);
    })
}


// CustomQuery
export const customQuery = {

    ///IT IS ADDED IN CUSTOM RESOLVERS TO HANDLE CASE INSENSITIVE SEARCH
    async plugins(parent, args, ctx, info) { 

        var searchText = '';
        ///ADDED TO SOLVE THE SEARCH ISSUE FOR THE PLUGINS 
        ///FIRST GETTING ALL THE PLUGINS WITH EMPTY SEARCH TEXT AND AFTER RESULT RECEIVED THEN 
        ///LOOPING THROUGH RESULTS AND FINDING SEARCH TEXT IN SHORT DESCRIPTIONS
        if ( args && args.where && args.where.PluginShortDesc_contains) {
            try {
                    if ( args.where.PluginShortDesc_contains != null && args.where.PluginShortDesc_contains != '') {
                        searchText = args.where.PluginShortDesc_contains;
                        args.where.PluginShortDesc_contains = '';
                    }
            } catch (e) {
                console.log('Error while getting plugins search text ');
                console.dir(e);
            }
        }
        return ctx.db.query.plugins({ where :args.where  } , info).then((pluginsList) => {
            try {
            var filteredList = [];
            if (searchText != '' && pluginsList.length > 0) {
                pluginsList.forEach(singlePlugin => {
                    var shoreDesc = singlePlugin.PluginShortDesc
                    if ( shoreDesc != null && shoreDesc != '' && shoreDesc.toLowerCase().includes(searchText.toLowerCase())) {
                        filteredList.push(singlePlugin);
                    } 
                });
            } else {
                filteredList = pluginsList;  
            }
            return filteredList;
        } catch (e) {
            console.log("error while filtering plugins response ");
            return pluginsList;
        }
            
        }).catch((e) => {
            console.log('Plugins Fetch error response inside custom Query ');
            console.dir(e);
            throw Error(e);
        });
        
      }, 

      ///IT IS ADDED IN CUSTOM RESOLVERS TO HANDLE CASE INSENSITIVE SEARCH
      async connectors(parent, args, ctx, info) { 
        var searchText = '';
        ///ADDED TO SOLVE THE SEARCH ISSUE FOR THE CONNECTORS
        ///FIRST GETTING ALL THE CONNECTORS WITH EMPTY SEARCH TEXT AND AFTER RESULT RECEIVED THEN 
        ///LOOPING THROUGH RESULTS AND FINDING SEARCH TEXT IN ConnectorTitle
        if ( args && args.where && args.where.ConnectorTitle_contains) {
            try {
                    if ( args.where.ConnectorTitle_contains != null && args.where.ConnectorTitle_contains != '') {
                        searchText = args.where.ConnectorTitle_contains;
                        args.where.ConnectorTitle_contains = '';
                    }
            } catch (e) {
                console.log('Error while getting connectors search text ');
                console.dir(e);
            }
        }
        return ctx.db.query.connectors({ where :args.where  } , info).then((connectorsList) => {
            try {
            var filteredList = [];
            if (searchText != '' && connectorsList.length > 0) {
                connectorsList.forEach(singleConnector => {
                    var title = singleConnector.ConnectorTitle;
                    if ( title != null && title != '' && title.toLowerCase().includes(searchText.toLowerCase())) {
                        filteredList.push(singleConnector);
                    } 
                });
            } else {
                filteredList = connectorsList;  
            }
            return filteredList;
        } catch (e) {
            console.log("error while filtering Connectors response ");
            return connectorsList;
        }
            
        }).catch((e) => {
            console.log('Plugins Fetch error response inside custom Query ');
            console.dir(e);
            throw Error(e);
        });
        
      }, 
    
  async subscriptionIntegrations(parent, args, ctx, info) { 
      if (ctx.TenantId) 
      {
              const where = {
                                TenantId : {TenantId : ctx.TenantId}
                            }              
              return await ctx.db.query.subscriptionIntegrations({ where }, info).then((integrationlist) => {
                integrationlist.forEach(singleIntegration => {
                    singleIntegration.PrimaryPluginConnectionData = isConnectionStructureExist(singleIntegration.PrimaryPluginConnectionData);
                    singleIntegration.SecondaryPluginConnectionData = isConnectionStructureExist(singleIntegration.SecondaryPluginConnectionData);
                });
                return integrationlist;
              }).catch((err) =>{
                  throw new Error(err)
              })            
      } else {
              throw new Error(`User is not Authorized`);
      }
    },
    async logs(parent, args, ctx, info) { 
        if (ctx.TenantId) {
                const where = {
                                  TenantId : {TenantId : ctx.TenantId}
                              } 
                                            
                // return await ctx.db.query.logs({ where : where , orderBy:"LogDate_DESC" }, info) 
                return await ctx.db.query.logs({ where :where, orderBy:"LogDate_DESC" }, info).then((resultsoglogs1)=>{
                    console.log("resultsoglogs1")
                    console.log(resultsoglogs1)
                    for(let i=0; i<resultsoglogs1.length;i++){
                     
                     
                    let displaylogsdatetable = resultsoglogs1[i].LogDate
     
                    let convertlogdatetostring= new Date(displaylogsdatetable).toLocaleString();
                    
                    resultsoglogs1[i].LogDate =  convertlogdatetostring;
                    //    console.log(convertlogdatetostring)
                    //    console.log(resultsoglogs1[i].LogDate=convertlogdatetostring)
                     //   if(resultsoglogs.length > 0){
                     //     return resultsoglogs
                     // }
                     // else{
                     //     return []
                     // }
                    }
                  
                    return resultsoglogs1
                    
                          
                 
                  
               }).catch((err)=>{
                     throw new Error(err)
               })  
                
                     
        } else {
                throw new Error(`User is not Authorized to display logs`);
        }
      },
   
    async subscriberprocessesinteg(parent, args, ctx, info) {    
        if (ctx.TenantId) {
                const where = {
                    AND: [
                            { TenantId  : { 
                                            TenantId : ctx.TenantId
                                        } 
                            },
                            { ConnectorId   : {
                                                ConnectorId: args.where.ConnectorId 
                                            } 
                            }
                        ]
                }  
                 // return await ctx.db.query.logs({ where , orderBy: "LogDate_DESC"}, info).then((resultsoglogs)=>{
                    //     for(let i=0; i<resultsoglogs.length;i++){
                                        
                    //      let displaylogsdatetable = resultsoglogs[i].LogDate
         
                    //        let convertlogdatetostring= new Date(displaylogsdatetable).toLocaleString()
                        
                    //        console.log(resultsoglogs[i].LogDate=convertlogdatetostring)
                         
                    //     }
                    //     return resultsoglogs     
                // let subscriptionpro = await  ctx.db.query.subscriberProcesses({ where : where}, info) 
                // console.log("subscriberprocessesinteg")
                // console.log(subscriptionpro)
                // console.log(subscriptionpro[].LastSyncDate)
                // if(subscriptionpro.length > 0)
                // {
                   
                //     return subscriptionpro;
                // }else{
                //     return []
                // }     
                return await ctx.db.query.subscriberProcesses({where : where}, info).then((resultsogsub) =>{
                        // console.log("=======resultsogsub===")
                        // console.log(resultsogsub)
                        // console.log("resultsogsub.LastSyncDate")
                        // console.log(resultsogsub.LastSyncDate)
                        // if(resultsogsub.LastSyncDate == null){

                        // }
                         for(let i=0; i<resultsogsub.length;i++){
                             if(resultsogsub[i].LastSyncDate == null){
                                resultsogsub[i].LastSyncDate= '' 
                             }
                             else if(resultsogsub[i].LastSyncDate == resultsogsub[i].LastSyncDate){
                                let displaylogsdatetable = resultsogsub[i].LastSyncDate
                                // console.log("in foor loop")
                                // console.log(resultsogsub[i].LastSyncDate)
                               let convertlogdatetostring= moment.utc(displaylogsdatetable).local().format("L LTS");
                                // console.log("convertlogdatetostring")
                                // console.log(convertlogdatetostring)
                                // console.log("resultsogsub[i].LogDate=convertlogdatetostring")
    
                               resultsogsub[i].LastSyncDate=convertlogdatetostring
                             }
                                        
                         
                            // console.log()
                        }
                        return resultsogsub 
                }).catch((err) =>{
                    console.log(err)
                })
                        
            } else {
                throw new Error(`User is not Authorized`);
        }
      },

      async displayConnectiondata(parent, args, ctx, info){
          if(args && args.where.PluginID &&  args.where.SubscriptionIntegrationId){
          if(ctx.TenantId){
            const where= {             
                     SubscriptionIntegrationId: args.where.SubscriptionIntegrationId 
            }
            let connectiondataqury = ` {ConnectorId {ConnectorId,PrimaryPluginId {PluginID},SecondaryPluginId {PluginID}},PrimaryPluginConnectionData {Name,Label,Value, IsRequired,IsEditable,IsViewable, SortOrder,FieldType, LookupValues,dropdownfieldName},SecondaryPluginConnectionData {Name,Label,Value IsRequired,IsEditable,IsViewable, SortOrder,FieldType,LookupValues,dropdownfieldName}}`
            return ctx.db.query.subscriptionIntegration({ where },connectiondataqury ).then((connectionquerydata) =>{
                if(connectionquerydata){
                    let finalResult = [];
                    if (args.where.PluginID == connectionquerydata.ConnectorId.PrimaryPluginId.PluginID) 
                    {   
                        let pluginarray = [];
                        connectionquerydata.PrimaryPluginConnectionData.forEach(singleData => {
                            if ( singleData.SortOrder == null) {
                                singleData.SortOrder = 0;
                            }
                            if ( singleData.IsViewable == true )
                                finalResult.push(singleData);
                        });
                        ///ADDED TO SOLVE THE CONFIGURATION ORDER BUG
                        if ( finalResult.length > 0)
                            finalResult.sort(function(a, b){
                                return (a.SortOrder - b.SortOrder);
                            });
                        return finalResult;
                    } 
                    else 
                    {
                        connectionquerydata.SecondaryPluginConnectionData.forEach(singleData => {
                            if ( singleData.SortOrder == null) {
                                singleData.SortOrder = 0;
                            }
                            if ( singleData.IsViewable == true )
                                finalResult.push(singleData);
                        });
                        ///ADDED TO SOLVE THE CONFIGURATION ORDER BUG
                        if ( finalResult.length > 0)
                            finalResult.sort(function(a, b){
                                return (a.SortOrder - b.SortOrder);
                            });
                        return finalResult;
                    }
                    
                }else{
                    throw new Error("subscription integration not found")
                }
                
            }).catch((err) =>{
                throw new Error(err)
            })
          }else{
            throw new Error(`User is not Authorized`);
          }
          }else{
            throw new Error(`Invalid PluginID`);
          }
      },

      async schedules(parent, args, ctx, info) {    
        if (ctx.TenantId) {
                const where = {
                            //    TenantId : {TenantId : ctx.TenantId}
                            AND: [
                                { ScheduleType_not_in: "5"},
                                { TenantId: { TenantId: ctx.TenantId } }
                              ]
                              }       
                return await ctx.db.query.schedules({ where : where,orderBy: "CreatedDate_DESC"}, info).then((scheduleresp) =>{
                    console.log("scheudle list")
                    console.log(scheduleresp)
                    scheduleresp.forEach(element => {
                        if (element.NextOccurence) {
                            element.NextOccurence =new Date(element.NextOccurence).toLocaleString();
                        }   
                        switch(element.ScheduleType){
                            case "1" :
                            case "2" :
                                        element.Type    = "Daily";
                            break;

                            case "4" :
                                        element.Type    = "Monthly";
                            break;

                            case "3" :
                                        element.Type    = getWeeklyTypeName(element.WeekDays);
                            break;

                            default :
                                        element.Type    = "";
                            break;
                                
                        }

                    
                    });
                    return scheduleresp
                })              
                
        } else {
                throw new Error(`User is not Authorized`);
        }
      },

      

     
// ************* Dashboard Disaplay Count API **************
    async displaycount(parent, args, ctx, info) {    
        console.log("displaycouny")
        if (ctx.TenantId) {
                const where = {
                                TenantId : {TenantId : ctx.TenantId}
                            }        
                let subscriptionprocess     = await ctx.db.query.subscriberProcesses({ where })
                let subcriptionintegration  = await ctx.db.query.subscriptionIntegrations({ where }) 
                let schdeluledata = {
                    // ScheduleType_not_in:"5"
                    AND:[
                        {
                          TenantId:{
                            TenantId:ctx.TenantId
                          }
                        },
                        {
                          ScheduleType_not_in: "5"
                        }
                      ]
                }
                let schedule    = await ctx.db.query.schedules({ where:schdeluledata })
                // console.log(schedule)
                
                let logs        = await ctx.db.query.logs({where})   
            //     console.log("logs")
            //    console.log(logs)
            //    console.log( (logs && logs.length > 0) ? logs.length : 0 )
                return  [
                            {  "Label"  :   "Process"       ,   "Count" : subscriptionprocess.length     }   ,
                            {  "Label"  :   "Integration"   ,   "Count" : subcriptionintegration.length }   ,
                            {  "Label"  :   "Schedule"      ,   "Count" : schedule.length   }   ,
                            {  "Label"  :   "Logs"          ,   "Count" : (logs && logs.length > 0) ? logs.length : 0   }
                        ]
    
                       
        } else {
                throw new Error(`list of process integration schedule`);
        }
    },

    //dashbpard api//
    /**
     * This Resolver returns the Total subscriber processes synced for the tenant
     * @param parent 
     * @param args 
     * @param ctx 
     * @param info 
     */
    async dashboardAPI(parent, args, ctx, info) 
    {

        try 
        {
            let startDate   = args.where.startDate;  //"2020-03-01";
            let endDate     = args.where.endDate;  //"2020-04-04";

            
            let datesArr    = getDatesForProcessSyncCount(startDate, endDate);
            let TenantID    = ctx.TenantId//"7456c0c0-f60a-09b3-41e8-b07a77144211"//"8bfaa38c-034f-e68b-5a46-88650364a803" //"de3920f4-520b-29d9-1e19-8595c2906599"; 
            let querySTART  = `query {`;
            let queryBody   = buildDashboardQuery(TenantID, datesArr,endDate);
            let queryEND    = `}`;
            let finalQuery  = querySTART + queryBody.finalQuery + queryEND;
            console.log("queryBody.aliasArr");
            console.log("dashboard tenant id")
            console.log(TenantID)
            console.log(" args.where.startDate")
            console.log(args.where.startDate)
            console.log("args.where.endDate")
            console.log(args.where.endDate)
            console.dir(queryBody.aliasArr)
            return generatedPrisma.$graphql( finalQuery )
                .then((res) => {
                    console.log("\nprisma.$graphql res");
                    console.dir(res);
                    
                    if (res )
                    {
                        let responseArr = [];
                        for (const property in res) {
                            console.log("saaaaaaa")
                            let aliasObj =  queryBody.aliasArr.find(singleElm => singleElm.aliasName == property );
                            
                                let datdd = new Date(aliasObj.date).getDay()
                                console.log("datdd")
                                console.log(datdd)
                                responseArr.push({
                                    Day      : datdd,
                                    Date     : aliasObj.date,
                                    Count    : res[property].aggregate.count
                                
                            })
                            console.log("date")
                            console.log()
                            
                          }
                        responseArr.sort(function(a, b){
                            return (new Date(a.Date).getTime()) - (new Date(b.Date).getTime())
                        })
                        return responseArr;
                    }
                    else
                    {
                        throw new Error("Error while fetching the process sync data ");
                    }
                })
                .catch((err) => {
                    console.log("prisma.$graphql Err");
                    console.dir(err);
                })
        }
        catch(err) 
        {
            console.log("Error inside dashboardAPi ");
            console.dir(err);
            throw new Error(err);
        }
    },







    //************************ Dashboard displaySyncProcess API ************************/
    async displaySyncProcess(parent, args, ctx, info){
        if (ctx.TenantId) {
            const where = {
                TenantId : {TenantId : ctx.TenantId}
            }        
            // console.log("displaySyncProcess")
            // console.log(where)
            let subscriptionprocesssync     = await ctx.db.query.subscriberProcesses({ where })
            console.log(subscriptionprocesssync.length )
            // return subscriptionprocesssync.length 
            return  [
                {   "Count" : subscriptionprocesssync.length     }   ,
            ]
        }
        else{
            throw new Error("unothorized user")
        }
    },

    
// fetch single subscriptionintegration
    async subscriptionIntegration(parent, args, ctx, info) { 
        if (ctx.TenantId) {
                const where = {
                               TenantId : {TenantId : ctx.TenantId},
                               SubscriptionIntegrationId : args.where.SubscriptionIntegrationId 
                              }    

              let subscriptionresult = await ctx.db.query.subscriptionIntegrations({ where }, info)   
                if(subscriptionresult.length > 0){
                    return subscriptionresult[0]
                }
                else{
                    throw new error("Enter SubscriptionIntegrationId ID")
                }
        } else {
                throw new Error(`User is not Authorized `);
        }
      },

    //   schedule get data
      async ScheduleProcessgetdata(parent, args, ctx, info){
        //   console.log("ScheduleProcessgetdata")
        if (ctx.TenantId) {
            const where = {              
                        AND:[
                            {
                                TenantId: { TenantId: ctx.TenantId } 
                            },
                            {
                              ScheduleID: args.where.ScheduleID 
                            },
                            {
                                ScheduleType : args.where.ScheduleType  
                            }
                          ]             
            }  
            let schedulevariable = `{ScheduleID,Type,ScheduleType,StartTime,EndTime,NextOccurence,OccursAt}`
         return await ctx.db.query.schedules({ where }, info).then( (scheduleresult1)=>{
              
            for(let i=0;i<scheduleresult1.length;i++){
                // console.log("scheduleresult1")
                // console.log(scheduleresult1)
                
                // StartTime: '2020-04-22 4:00:00',

                if(scheduleresult1[0].StartTime || scheduleresult1[0].EndTime != null){
                    // console.log("if")
                    let  scheduletimeoccurceat = scheduleresult1[0].OccursAt.split(' ')
                    let schedulesplittime = scheduletimeoccurceat[1]
                    
                    let checkstarttime1 = scheduleresult1[0].StartTime.split(' ')
                    // console.log("checkstarttime1")
                    // console.log(checkstarttime1)
                    let splitstarttime = convertTime(checkstarttime1[1])
                    // console.log("splitstarttime")
                    // console.log(splitstarttime)
                    let checkendttime = scheduleresult1[0].EndTime.split(' ')
                    let spliotsendtime = convertTime(checkendttime[1])
                    console.log("--end--")
                    console.log(spliotsendtime)
                    console.log("scheduleresult1[i].StartTime=splitstarttime")
                    console.log(scheduleresult1[i].OccursAt=schedulesplittime)
                    console.log(scheduleresult1[i].EndTime=spliotsendtime)
                    console.log("-----start ---")
                    console.log(scheduleresult1[i].StartTime=splitstarttime)

                }
                 else if(scheduleresult1[0].StartTime || scheduleresult1[0].EndTime == null){
                    console.log("ifloop")
                    let  scheduletimeoccurceat = scheduleresult1[0].OccursAt.split(' ')
                    console.log("ssssssstsrttime")
                    console.log(scheduletimeoccurceat)
                    let schedulesplittime = scheduletimeoccurceat[1]+ " " +scheduletimeoccurceat[2]
                    console.log("testibngfdsa")
                    console.log(schedulesplittime)
                    let schedulesplittime2 = scheduletimeoccurceat[2]
                    console.log(scheduleresult1[i].OccursAt=schedulesplittime)
                    // console.log(scheduleresult1[i].OccursAt=schedulesplittime2)
                 } 
                    
                
                else{
                    console.log("no data")
                }
               
                 

                //   let checkstarttime1 = scheduleresult1[0].StartTime.split(' ')
                // let splitstarttime = scheduleresult1[i].StartTime=splitstarttime[1]


                
                // let splitstarttime11 = checkstarttime1[1]

                // let checkstarttime = scheduleresult1[0].EndTime.split(' ')
                // let spliotsendtime = checkstarttime[1]
//                 console.log("let splitstarttime = checkstarttime1[1]==========")
// console.log(spliotsendtime)
//                   console.log("scheduleresult1")
                  
                //   console.log(scheduleresult1[i].StartTime=splitstarttime)
                //   console.log(scheduleresult1[i].EndTime=spliotsendtime)
                //   returfn scheduleresult1
            //     let finalresultschdukle =scheduleresult1[i].OccursAt=schedulesplittime
            //    console.log("finalresultschdukle");
            //    console.log(finalresultschdukle)
            // return scheduleresult1
                }
                console.log("scheduleresult1------")
                console.log(scheduleresult1)
              return scheduleresult1


          }).catch((err)=>{
throw new Error(err)
          })  
          
        } else {
                throw new Error(`User is not Authorized `);
        }
      },

// async getscheduledata(parent, args, ctx, info){

// },
async displayuserprofile(parent, args,ctx, info){
    if (ctx.TenantId){
        const where = {
             TenantId: ctx.TenantId              
        } 
        console.log("user profile data")
        console.log(where)
        return await ctx.db.query.users({ where : where}, info).then((resultsoglogs)=>{
            console.log("finale result user profile")
            console.log(resultsoglogs)
            return resultsoglogs                 
         
          
       }).catch((err)=>{
             throw new Error(err)
       })  
       
    }else{
        throw new Error("User Not Found")
    }
},
async displayuserconnector(parent, args, ctx, info){
    const where = {
            TenantId :  { TenantId: ctx.TenantId } 
    }
    console.log("display")
    console.log(where)
    return await ctx.db.query.subscriptionIntegrations({ where : where}, info).then((resultsoglogs)=>{
        console.log("finale result user profile")
        console.log(resultsoglogs)
        return resultsoglogs               
          
   }).catch((err)=>{
         throw new Error(err)
   })  

},

// Display logs in integration-Detail-Page
async displaylogs(parent, args, ctx, info) { 
    if (ctx.TenantId) {
            const where = {
                            AND: [
                                { TenantId: { TenantId: ctx.TenantId } },
                                {
                                    SubscriptionIntegrationId: {
                                        SubscriptionIntegrationId: args.where.SubscriptionIntegrationId
                                    }
                                }
                            ] 
                        }  
            //  console.log("where")
            //  console.log(args.where.SubscriptionIntegrationId)
            //  console.log("tenat id")
            //  console.log(ctx.TenantId)

           return await ctx.db.query.logs({ where , orderBy:"LogDate_DESC"}, info).then((resultsoglogs)=>{
            //    console.log("resuliutlogs")
            //    console.log(resultsoglogs)
               for(let i=0; i<resultsoglogs.length;i++){
                               
                let displaylogsdatetable = resultsoglogs[i].LogDate

                  let convertlogdatetostring= new Date(displaylogsdatetable).toLocaleString()
               
                  resultsoglogs[i].LogDate=convertlogdatetostring
                
               }
               return resultsoglogs
                     
            
             
          }).catch((err)=>{
              console.log(err)
                throw new Error(err)
          })  
            
    } else {
            throw new Error(`User is not Authorized `);
    }
  },

//   enittiy
  async subscriberProcessesentitty(parent, args, ctx, info){
    if (ctx.TenantId) {
        const where = {
                        AND: [
                            { TenantId: { TenantId: ctx.TenantId } },
                            {
                                SubscriberProcessID: 
                                    args.where.SubscriberProcessID                                
                            }
                        ] 
                    }    
                    
        let processdatainfo =` {  SubscriberProcessID, ProcessId{ProcessId,ProcessShortDesc,PrimaryEntity{EntityID,EntityName},SecondaryEntity{EntityID,EntityName}}}`
      return await ctx.db.query.subscriberProcesses({ where }, processdatainfo).then((subcriberprocessresult) =>{
        if(subcriberprocessresult && subcriberprocessresult.length > 0){
            if(subcriberprocessresult[0].ProcessId.PrimaryEntity.EntityID &&  subcriberprocessresult[0].ProcessId.SecondaryEntity.EntityID)
            {
                const fieldmapdata =    {
                                                 
                    AND: [
                        { SourceEntityID: { EntityID: subcriberprocessresult[0].ProcessId.PrimaryEntity.EntityID } },
                        { TargetEntityID: { EntityID: subcriberprocessresult[0].ProcessId.SecondaryEntity.EntityID } }
                      ]
                
            }
            return ctx.db.query.fieldMaps({ where : fieldmapdata }, info)
                    .then((fielsmapresult) => {
                        return fielsmapresult
                    }).catch((err) => {
                        throw new Error("error")
                    })
                }else{
                    throw new Error("Entity not Present")
                }  
            }else{
                throw new Error("Mapping not present for Enter Subscribe Process ID ")
            }

        })  
        } else {
            throw new Error(`User is not Authorized `);
        }
    },
    
    /**
     * This resolver returns the Default Configuration from SubscriptionIntegrations from 
     * SubscriptionIntegrationID
     */
    async getIntegraionConfiguration(parent, args, ctx, info) { 
        if ( ctx.TenantId ) 
        {
            if ( args && args.where.SubscriptionIntegrationId )
            {
                // Here checking if the IntegrationId is belong to User whose TenantId is present in Token
                const where = { AND : [ 
                                        { TenantId : { TenantId : ctx.TenantId } },
                                        { SubscriptionIntegrationId : args.where.SubscriptionIntegrationId } 
                                    ]
                                }              
                let integrationConfigInfo =`{ SubscriptionIntegrationId, ConfigStructure { Name, Value, PluginId, EntityID, Question, FieldType, LookupValues, FieldLength,IsRequired, IsEditable, IsViewable, FieldName, Answers } } `;
                return await ctx.db.query.subscriptionIntegrations({ where }, integrationConfigInfo)
                    .then((integrationlist) => {
                        let finalResult = [];
                            // If Integration present then valid user/IntegrationID or throwing error
                            if ( integrationlist && integrationlist.length > 0 ) 
                            {
                                integrationlist[0].ConfigStructure.forEach(singleData => {
                                    console.log("singleData")
                                   console.log(singleData)
                                    if ( singleData.IsViewable == true )
                                        finalResult.push(singleData);
                                        console.log("getintegrationconfigration")
                                        // return singleData
                                });
                                console.log("return finalResult")
                                console.log(finalResult)
                                return finalResult

                                // return integrationlist[0].ConfigStructure;    
                                // if ( singleData.IsViewable == true )
                                // finalResult.push(singleData);                
                            } 
                            else 
                                throw new Error("Invalid SubscriptionId provided for configuration get request! ");
                    }).catch((err) => {
                            console.log("Error inside getIntegraionConfiguration call.");
                            console.dir(err);
                            throw new Error(err)
                    });
            } 
            else 
                throw new Error("Please provide the subscriptionIntegrationId.");
        } 
        else 
            throw new Error(`Unauthorized Invalid access token! `);
    }
}

// ********** function to insert data into idserver *********
    async function addUsertoIdserver(createduser, args){
        console.log("idserver");
        return new Promise((resolve, reject) => {

        
        return rp.post(process.env.ID_SERVER_REG, {form:{
            UserName    :   createduser.UserName,
            FirstName   :   createduser.FirstName,
            LastName    :   createduser.LastName,
            PhoneCode   :   createduser.PhoneCode,
            Email       :   createduser.Email,
            TenantId    :   createduser.TenantId,
            PhoneNumber :   createduser.PhoneNumber,
            CompanyName :   createduser.CompanyName,
            ZipCode     :   createduser.ZipCode,
            Country     :   createduser.Country,
            City        :   createduser.City,
            State       :   createduser.State,
            IsAdmin     :   createduser.IsAdmin,
            Password    :   args.Password
        }})
        .then(res => {
            console.log("idserver registration success")
            console.log(res);
             // return res
            resolve(res);
        })
        .catch(err => {
            // console.log(err)
            console.log("ID_Server_Error");
            // console.log(err)
            // throw new Error(err)
            reject(err);
        });
    });
    }

    // ************* Change password ******** //
   async function idserverchangepassword(passworddataresult){
    console.log("idserver")
    console.log("passworddataresult++++")
    console.log(passworddataresult)
    return rp.post("http://49.248.14.237:7878/account/changepassword", {form:{
        UserName    :   passworddataresult.UserName,
        Password    :   passworddataresult.Password,
        OldPassword :   passworddataresult.OldPassword,
    }})
    .then(res => {
        // console.log(form)
        console.log("idservererr")
        console.log(res)
        return res
    })
    .catch(err => {
        console.log("idservererr1")
        console.log(err)
        throw new Error(err)
    });
    }


    // *******************ID Server Reset Password ********************* //
    async function idserverresetpassword(passworddataresult, args){
        console.log("idserver")
        console.log("passworddataresult++++")
        console.log(passworddataresult)
        return rp.post("http://49.248.14.237:7878/account/resetpassword", {form:{
            UserName    :   passworddataresult.UserName,
            Password    :   passworddataresult.Password,
        }})
        .then(res => {
            // console.log(form)
            console.log("idservererrreset")
            console.log(res)
            return res
        })
        .catch(err => {
            console.log("idservererr1reset")
            console.log(err)
            throw new Error(err)
        });
        }

        // *******************ID Server Reset Password ********************* //
    async function idserverforgotpassword(passworddataresult){
        console.log("idserver")
        console.log("passworddataresult++++")
        console.log(passworddataresult)
        return rp.post("http://49.248.14.237:7878/account/forgotpassword", {form:{
            UserName    :   passworddataresult.UserName,
            Email       :   passworddataresult.Email
        }})
        .then(res => {
            // console.log(form)
            console.log("idservererrreset")
            console.log(res)
            return res
        })
        .catch(err => {
            console.log("idservererr1reset")
            console.log(err)
            throw new Error(err)
        }); 
        }

/**
 * This function Fetches all the process by connector id and further sends it to subscriberProcessInsertHandler function
 * @param ctx 
 * @param connectorId 
 * @param tenantId 
 * @param info 
 */
async function insertSubscriberProcesses(ctx, connectorId, tenantId, info, createintegrationres ) {
    let processWhere = { ConnectorId : { ConnectorId : connectorId } };
    let proccesinfo = `{ProcessId,PrimaryEntity {EntityID,PluginID {PluginID},ConfigStructure {Name,Value,PluginId,EntityID,Question,FieldType,LookupValues,FieldLength,IsRequired,IsViewable,IsEditable,FieldName,Answers}},SecondaryEntity {EntityID,PluginID {PluginID},ConfigStructure {Name,Value,PluginId,EntityID,Question,FieldType,LookupValues,FieldLength,IsRequired,IsViewable,IsEditable,FieldName,Answers}}}`
    return ctx.db.query.processes({ where : processWhere }, proccesinfo).then((processesRes) => {      
        return subscriberProcessInsertHandler(ctx, processesRes, connectorId, tenantId, info, createintegrationres ); 
    }).then((subscriberProcessInsertRes) => {
        return subscriberProcessInsertRes;
    }).catch((err) => {
        throw new Error(err);
    })
}

/**
 * This function adds all the processes received by connector id to subscriberProcess 
 * with TenantID/Process/Connector and Primary/Secondary Entities
 * @param ctx 
 * @param processes 
 * @param connectorId 
 * @param tenantId 
 * @param info 
 */
async function subscriberProcessInsertHandler(ctx, processes, connectorId, tenantId, info, createintegrationres ) {
    let SPPromiseArr = [];
    processes.forEach(process => {
        SPPromiseArr.push(
            new Promise((resolve, reject) => {
                    let subscriberProcessData = {
                                                    ProcessId       : { connect: { ProcessId: process.ProcessId } },
                                                    TenantId        : { connect: { TenantId: tenantId } },
                                                    ConnectorId     : { connect: { ConnectorId: connectorId } },
                                                    PrimaryEntity   : { connect: { EntityID: process.PrimaryEntity.EntityID } },
                                                    SecondaryEntity : { connect: { EntityID: process.SecondaryEntity.EntityID } },
                                                }
                    let SIConfigRes         = getSIConfigStructureCreateStructure( process );                                               
                    let isUpdateSI          =  SIConfigRes.isUpdateSI;
                    let SIConfigStructure   =  SIConfigRes.SIConfigStructure;
                    let IntegrationID       =  createintegrationres.SubscriptionIntegrationId;
                    
                    return ctx.db.mutation.createSubscriberProcess({data: subscriberProcessData })
                        .then((response) => {
                            if (isUpdateSI == true)
                            {
                                let updateintsubstructure = {
                                     SubscriptionIntegrationId: IntegrationID                                     
                                }
                                let updateintestructuredata = {
                                    ConfigStructure: { create:  SIConfigStructure} 
                                }
                                return ctx.db.mutation.updateSubscriptionIntegration({where: updateintsubstructure,  data: updateintestructuredata }).then((updateintegrationstruct)=>{
                                    resolve(response)
                                }).catch((err)=>{
                                    resolve(response)
                                })
                            }
                            else{
                                resolve(response)
                            }
                            resolve(response) })
                        .catch((error) => { 
                            reject(error); 
                        })
            })
        )
    });
    return Promise.all(SPPromiseArr)
        .then((SPPromisesRes) => {
            return SPPromisesRes;
        })
        .catch((err) => {
            throw new Error(err);
        })
}

function getSIConfigStructureCreateStructure( process ) {
    let returnJson          = { "isUpdateSI" : false , "SIConfigStructure" : [] };
        let PrimaryEntity   = process.PrimaryEntity;
        let SecondaryEntity = process.SecondaryEntity;
        if ( PrimaryEntity.ConfigStructure && PrimaryEntity.ConfigStructure.length > 0 )
                PrimaryEntity.ConfigStructure.forEach(singleConfig => {
                    returnJson.SIConfigStructure.push( getEntityConfigStructure(PrimaryEntity, singleConfig ) );    
                });
            

        if ( SecondaryEntity.ConfigStructure && SecondaryEntity.ConfigStructure.length > 0 )
                SecondaryEntity.ConfigStructure.forEach(singleConfig => {
                    returnJson.SIConfigStructure.push( getEntityConfigStructure(SecondaryEntity, singleConfig ) );    
                });
        
        if ( returnJson.SIConfigStructure.length > 0 ) 
            returnJson.isUpdateSI   = true;

    return returnJson;
}

/**
 * This function returns the entity config structure for default config structure for SI
 * @param entity 
 */
function getEntityConfigStructure( entity : any , singleConfig : any ) {
    let lookupValues = singleConfig.LookupValues ? singleConfig.LookupValues : [];
    let returnJson = {
                        "Name"            : singleConfig.Name,
                        "Question"        : singleConfig.Question,
                        "FieldType"       : singleConfig.FieldType,
                        "LookupValues"    : { "set" : lookupValues },
                        "FieldLength"     : singleConfig.FieldLength,
                        "IsRequired"      : singleConfig.isRequired,
                        "IsViewable"      : singleConfig.IsViewable,
                        "IsEditable"      : singleConfig.IsEditable,
                        "FieldName"       : singleConfig.FieldName,
                        "Value"           : singleConfig.Value,
                        "Answers"         : singleConfig.Answers,
                        "PluginId"        : entity.PluginID.PluginID,
                        "EntityID"        : entity.EntityID
                    }
                    console.log("returnJson");
                    console.log(returnJson)
                    return returnJson;
   
}

function getConnectorStructure(connStructure) {
    console.log("getConnectorStructure")
    console.log(connStructure)
    let returnVal = { create : [] };
    connStructure.forEach(singleVal => {
        let lookupValues = singleVal.LookupValues ? singleVal.LookupValues : [];
        let DropdownfieldName = singleVal.dropdownfieldName ? singleVal.dropdownfieldName : [];
        let sortOrder = singleVal.SortOrder != null ? singleVal.SortOrder : 0;
        returnVal.create.push({ Name : singleVal.Name, Label : singleVal.Label, 
            Value: singleVal.Value, IsViewable : singleVal.IsViewable, IsEditable: singleVal.IsEditable, 
            IsRequired : singleVal.IsRequired, SortOrder : sortOrder, FieldType: singleVal.FieldType,dropdownfieldName : {"set" :DropdownfieldName}, LookupValues: {"set" : lookupValues}});
    });
    console.log("singleval")
    console.log(returnVal)
    return returnVal;
}

function isConnectionStructureExist(connStructure) {
    console.log("connStructure")
    console.log(connStructure)
    let returnVal = [];
    let isExist   = true;
    if(!connStructure ){
        
        isExist = false
    }
    else{
        for ( let i = 0; i < connStructure.length; i++ ) {
            console.log("connStructure[i].IsViewable")
            console.log(connStructure[i].IsViewable)
            console.log(connStructure[i].Name)
            if (connStructure[i].IsViewable && connStructure[i].IsEditable && connStructure[i].IsRequired && !connStructure[i].Value ) {
                isExist = false;
                break;
            }
        }
    }
    if ( isExist )
      returnVal   = connStructure;
      console.log("returnVal")
    console.log(returnVal)
    return returnVal;
}  

/**
 * This function sets the statusCode for login resolver error response
 */
function setLoginErrorContext(ctx, errMsg) {
    let updatedCtx  = null;
    try {
            if (ctx && ctx.request && ctx.request.res ) 
            {
                ctx.request.res.statusCode      = 401;
                ctx.request.res.statusMessage   = errMsg;
                updatedCtx                      = ctx;
            } 
            else 
            {
                updatedCtx              = ctx;
            }
    } catch (err) {
            updatedCtx                  = ctx;
    }
    return updatedCtx;
}

/**
 * This function sets the statusCode for signup resolver error response
 */
function setSignUpErrorContext(ctx, errMsg) {
    let updatedCtx  = null;
    try {
            if (ctx && ctx.request && ctx.request.res ) 
            {
                ctx.request.res.statusCode      = 401;
                ctx.request.res.statusMessage   = errMsg;
                updatedCtx                      = ctx;
            } 
            else 
            {
                updatedCtx              = ctx;
            }
    } catch (err) {
            updatedCtx                  = ctx;
    }
    return updatedCtx;
}

function getWeeklyTypeName(weekDaysArr) {
    let name    =   "Weekly ( ";
    let weeksArray = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for ( let i = 0; i < weekDaysArr.length ; i++ ) {
        name    = name + weeksArray[ weekDaysArr[i] - 1 ];
        if(i != weekDaysArr.length - 1){
            name = name + ", "
        }
    }
    name    = name + ' )';
    return name;
 }

// createJSOn Data
 function getConnnectionJson(dataArr) {
    let finalJson = { };
    dataArr.forEach(element => {
        let tempJson = {};
        tempJson[element.Name] = element["Value"];
        finalJson   =   { ...finalJson, ...tempJson }
    });
     
    return finalJson;
 }


//  scheduler connection 

async function schedulerConnection(ctx, TenantId, SubscriberProcess, ScheduleType, ScheduleId){
    // console.log("schedulerConnection")
    // console.log("checking scheduler connection")
    let ProcessId   = null, ConnectorId     = null; 
    let Userid = null
    let connectionresponces = {"Message" : null,"ErrorMessage" : null} 
    let where = { SubscriberProcessID :SubscriberProcess} 
    let processinfo = `{SubscriberProcessID,ProcessId{ProcessId},ConnectorId{ConnectorId},TenantId{UserId}} `
    return new Promise((resolve, reject) => {
        return ctx.db.query.subscriberProcesses({  where },processinfo).then((processresult) =>{
           ProcessId    =  processresult[0].ProcessId.ProcessId
           ConnectorId  =  processresult[0].ConnectorId.ConnectorId
           Userid       =  processresult[0].TenantId.UserId
           let schedulejsondata = {
            "TenantId"          : Userid,
            "SubscriberProcess" : SubscriberProcess,
            "ScheduleType"      : ScheduleType,
            "ProcessId"         : ProcessId,
            "ConnectorId"       : ConnectorId,
            "ScheduleId"        : ScheduleId
            }
            let scheudlerdatares = JSON.stringify(schedulejsondata)
            // console.log("schedulejsondata")
            // console.log(schedulejsondata)
            let scheudlerdatapars = JSON.parse(scheudlerdatares)
            let postData = {
                url         :"http://gumuapistaging.azurewebsites.net/api/Scheduler",
                json        : true,
                method      :"post",
                body        : schedulejsondata,
                headers     : {
                                  "Content-Type"    : "application/json",
                                  "Accept"          : "application/json"
                              }
            }
            // console.log("postdata")
            // console.log(postData)
            return rp(postData).then((res)=>{
                console.log("check scheduler connection")
                console.log("https://gumuapi.azurewebsites.net/api/Scheduler")
                console.log(res)
                let resresp =  res
                resolve(resresp)
            }).catch((err) =>{
                resolve(err)
            })

        }).catch((err) =>{
            resolve(connectionresponces)
        })
      
    });
}


async function UpdatePluginConnection(parent, args, ctx, info){
    console.log("UpdatePluginConnection")
   
    const connesetting = {   
        AND :   [   
                    { ConnectorId : { PrimaryPluginId : { PluginID : args.data.PluginID } } },
                    { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId } 
                ]
    }
   
    // console.log("connesetting")
    // console.log({ PrimaryPluginId : { PluginID : args.data.PluginID } } )
    // console.log("integrationiD")
    // console.log( {SubscriptionIntegrationId : args.data.SubscriptionIntegrationId })
    // console.log(connesetting)
    let connresult = await ctx.db.query.subscriptionIntegrations({ where : connesetting })
    // console.log("connresult")
    // console.log(connresult)
    if (connresult && connresult.length > 0) 
    {
        // console.log("in if condition")
        let updateconnsetting       = { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId };
        // console.log("{ SubscriptionIntegrationId : args.data.SubscriptionIntegrationId }")
        // console.log({ SubscriptionIntegrationId : args.data.SubscriptionIntegrationId })
        let connectionStructureData = [];
        args.data.connectionStructure.forEach(singleStructure => {
            // console.log("singleStructure")
            // console.log(singleStructure)
        let updatedStructure = { 
        where:  { Name   : singleStructure.Name },
        data:   { Value   : singleStructure.Value }
        };
        // console.log("updatedStructure")
        // console.log(updatedStructure)
        connectionStructureData.push(updatedStructure);
        });
        // console.log("connectionStructureData")
        // console.log(connectionStructureData)
        let updateconnsettingdata   = {
        PrimaryPluginConnectionData: {
        updateMany: connectionStructureData
        }
    }
    // console.log("updateconnsettingdata")
    // console.log(updateconnsettingdata)

    return await ctx.db.mutation.updateSubscriptionIntegration({ where : updateconnsetting, data:updateconnsettingdata })
        .then((res)=>{
            // console.log("res")
            // console.log(res)
            // console.log("ctx.db.mutation")
        return { result : "Subscription Integration Connection Updated for primary plugin" }                        
        }).catch((err) => {
        throw new Error("invalid")
        });    
    }
    else 
    {
        // console.log("secondaryplugin")
        const connesettingsecnd = {    
                    AND :[  { ConnectorId : { SecondaryPluginId : { PluginID : args.data.PluginID } } },
                            { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId }
                        ]
                }
                // console.log("check to plugin id")
                // console.log({ SecondaryPluginId : { PluginID : args.data.PluginID } })
                // console.log(connesettingsecnd)
        let connresultsend = await ctx.db.query.subscriptionIntegrations({ where : connesettingsecnd})
        // console.log("chechechec")
        if (connresultsend && connresultsend.length > 0)
        {
            // console.log("sc))))))))")
            let updateconnsetting = { SubscriptionIntegrationId : args.data.SubscriptionIntegrationId };
            // let connectionStructureData = [];
            // args.data.connectionstructure.forEach(singleStructure => {
            // let updatedStructure = { 
            // where: { Name   : singleStructure.Name },
            // data: { Value   : singleStructure.Value }
            // };
            // connectionStructureData.push(updatedStructure);
            // });
            let connectionStructureData = [];
            args.data.connectionStructure.forEach(singleStructure => {
                // console.log("singlssseStructure")
                // console.log(singleStructure)
                let updatedStructure = { 
                    where:  { Name   : singleStructure.Name },
                    data:   { Value   : singleStructure.Value }
                };
                // console.log("updatesssdStructure")
                // console.log(updatedStructure)
                connectionStructureData.push(updatedStructure);
            });
            // console.log("connecsssstionStructureData")
            // console.log(connectionStructureData)

            let updateconnsettingdata   = {
                SecondaryPluginConnectionData: {
                    updateMany: connectionStructureData
                }
            }

            return ctx.db.mutation.updateSubscriptionIntegration({ where : updateconnsetting, data:updateconnsettingdata })
                    .then((res)=>{
                        return {result : "Subscription Integration Connection Updated for secondary plugin"};
                    }).catch((err) => {
                        throw new Error("invalid");
                    });    
        }
        else
        {
            throw new Error("invalid pluginID or subscription integrationID");
        }
        }
    }


    /**
 * It Builds the dates array from start and end dates provided 
 * for getting daily processes executed
 * @param startDate 
 * @param endDate 
 */
function getDatesForProcessSyncCount(startDate, endDate) {
    try 
    {
        var listDate = [];
        var dateMove = new Date(startDate);
        var strDate = startDate;
        while (strDate <= endDate)
        {
            strDate = dateMove.toISOString();
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate()+1);
        };
        console.log("listDate")
        console.log(listDate)
        console.log("")
        return listDate;
    }
    catch(e)
    {
        console.log("Error while getting the Dates for dashboardAPI");
        console.dir(e);
        throw new Error(e);
    }
}
/**
 * IT returns the query for the logs Connection Count
 * @param aliasName 
 * @param TenantID 
 * @param dateGreaterThan 
 * @param dateLessThan 
 */
function getQueryObj(aliasName, TenantID, dateGreaterThan, dateLessThan) {
    console.log("dateLessThan")
    console.log(dateLessThan)
    console.log("dateGreaterThan")
    console.log(dateGreaterThan)
    return `${aliasName}: logsConnection(
            where: {   TenantId: { TenantId: "${TenantID}"  } 
                  AND: [
                            { LogDate_gt: "${dateGreaterThan}" }
                            { LogDate_lt: "${dateLessThan}" }
                        ]
                }                
        ) {
            aggregate {
            count
            }
        }`;
        console.log("dateLessThan")
        console.log(dateLessThan)
        console.log("dateGreaterThan")
        console.log(dateGreaterThan)
}
/**
 * It Builds the Random character Strings for the aliases
 * @param length 
 */
function makeAliasName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
/**
 * It returns the Final Query for getting the dashboard API count
 * @param TenantID 
 * @param datesArr 
 */
function buildDashboardQuery(TenantID, datesArr,endDate){
    let returnResponse = { "aliasArr" : [] , "finalQuery" : "" }
    try 
    {
        for( let i = 0; i < datesArr.length; i++)
        {
            //IT ASSIGNS THE ALIAS NAME FOR THE QUERY INSIDE FINAL QUERY 
            let aliasName = makeAliasName(5);
            //MAINTAINING THE ALIAS NAME AND IT'S RESPECTIVE DATE FOR MAPPING IT TO THE FINAL RESPONSE
            returnResponse.aliasArr.push({"aliasName" : aliasName, "date" : datesArr[i] });
            var dateLessThan;
            //IF NEXT DAY DATE IS PRESENT THEN SENDING THE DATE_LESS_THAN VALUE AS A NEXT DAY START DATE
            if ( datesArr[i+1] ) {
                dateLessThan = datesArr[i+1];
            } else {
                //FOR LAST DATE AS NO NEXT DAY DATE IS PRESENT, SO FIRST GETTING NEXT DAY DATE AND SENDING AS DATE_LESS_THAN  FOR LAST DATE
                var dateMove = new Date(endDate);
                    dateMove.setDate(dateMove.getDate()+1);
                    dateLessThan = dateMove.toISOString();
 
            }
            //GETTING THE ACTUAL QUERY INSIDE FINAL QUERY 
            returnResponse.finalQuery += getQueryObj(aliasName, TenantID, datesArr[i], dateLessThan);
        }
        return returnResponse;
    }
    catch(err) 
    {
        console.log("Error Inside buildDashboardQuery");
        console.dir(err);
        throw new Error(err);
    }
}


function convertTime24to12(StartTime){
    var tmpArr = StartTime.split(':'), time12;
    if(+tmpArr[0] == 12) {
    time12 = tmpArr[0] + ':' + tmpArr[1] + ' pm';
    } else {
    if(+tmpArr[0] == 0o0) {
    time12 = '12:' + tmpArr[1] + ' am';
    } else {
    if(+tmpArr[0] > 12) {
    time12 = (+tmpArr[0]-12) + ':' + tmpArr[1] + ' pm';
    } else {
    time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' am';
    }
    }
    }
    return time12;
    }
  console.log('convertTime Called',convertTime('01:00'))
  
 













