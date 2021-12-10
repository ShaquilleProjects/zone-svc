const keys = require('../config/keys.js');
const axios = require('axios');
const queryConfig = require('../config/queryConfig.js');

const baseurl = "https://www.alphavantage.co";

let trueResistance = [];
let trueSupport = [];

async function getSupp_Resi(time_series, date_range, currency){

    const { fxFunction, timeframe, interval } = queryConfig[time_series.toUpperCase()];
    const { from, to, pair } = currency;
    let points=[];
 
    let fetch = await axios.get(`${baseurl}/query?function=${fxFunction}&from_symbol=${from}&to_symbol=${to}&outputsize=full&interval=${interval}&apikey=${keys.VANTAGE_API_KEY}`);
    
    res = fetch.data[`Time Series FX (${timeframe})`];

    //rearrange objects
    Object.keys(res).forEach(candle => {
        let item = res[candle];

        let type = item['1. open'] > item['4. close']? 'red' : 'green';

        points.push(
            {
                date : candle,
                open: item['1. open'],
                close : item['4. close'],
                high: item['2. high'],
                low: item['3. low'],
                type: type
            }
        );
    });

    //order objects by date
    points.sort((a, b) => (a.date > b.date) ? 1 : -1);

    //this variable is returned with this call
    let allPoints= points;

    //filter all candles to only have ones in a specified data range
    let new_points= points;
    if(date_range) points = new_points.filter( point => ((point.date > date_range.start) && (point.date < date_range.end))  );
   
    //loop through candles and find support and resistance zones
    let first = points[0];
    let second = points[1];
    //had to remove current forming candle from evaluation thus  "points.length-1"
    for(let i = 2; i<points.length-1; i++){
        if (    (first.type==='green')  &&   (second.type==='red')   &&  (points[i].type==='red')   ){
            let resistance = findResistance(first, second, points[i]) ; 
            addResistance(resistance);
        }
        if (    (first.type==='red')  &&   (second.type==='green')   &&  (points[i].type==='green')   ){
            let support = findSupport(first, second, points[i]) ; 
            addSupport(support);
        }
        first = second;
        second = points[i]; 
    }

    //returns support resistance and points
    //all points - overall (used for sonia)
    //all_candles - in date range (used for phillip)
    let zones ={
        support: trueSupport,
        resistance: trueResistance,
        allPoints,
        last_candle: points[points.length-2],
        all_candles: points
    }

    //reinitialize so when called again for a different time frame, values will be null
    trueSupport = [];
    trueResistance = [];

    return (zones);
};

function findResistance(first, second, third){
    let zone = {
        high : Math.max(first.high, second.high, third.high),
        low : Math.max(first.open, second.close, third.close),
        points: [first, second, third]
    }
    return zone;
}

function findSupport(first, second, third){
    let zone = {
        high : Math.min(first.open, second.close, third.close),
        low : Math.min(first.low, second.low, third.low),
        points: [first, second, third]
    }
    return zone;
}

function addSupport(support){
    //checks for overlap, and optimize them if so
   let overlap = false;
   let overlap_key=null;
    trueSupport.forEach(zone =>{
        if(     ((support.high>zone.low)&&(support.high<zone.high))   ||  ((support.low<zone.high)&&(support.low>zone.low))     ||      ((support.high>zone.high)&&(support.low<zone.low))  ){
            overlap = true;
            overlap_key = Object.keys(trueSupport).find(key => trueSupport[key] === zone);
        };
    })
    if(overlap){
        trueSupport[overlap_key].recent_start = support.points[0].date;
        trueSupport[overlap_key].recent_end = support.points[2].date;
        trueSupport[overlap_key].strength++;
        trueSupport[overlap_key].points.push(support.points[0], support.points[1], support.points[2]);
        trueSupport[overlap_key].high = support.high < trueSupport[overlap_key].high? support.high : trueSupport[overlap_key].high; 
        //instead of doing this, try to find the zone based on all candles instead of just adjusting zone after more data(may become irrelevant to first candle after many are in the zone)
        // on the other side, it may be impossible to find a line of best fit for higher and lower zone using all candles, and would may have to approximate/average
        // this would then lead to using a zone for each of the higher and lower levels
        // it using the zone however may lead to new relevant data instead of historical
    }else{
        let newSupport={
            recent_start: support.points[0].date, 
            recent_end: support.points[2].date,
            strength: 1,
            high: support.high,
            low: support.low,
            points: support.points
        }
        trueSupport.push(newSupport);
    }
}

function addResistance(resistance){
    //checks for overlap, and optimize them if so
   let overlap = false;
   let overlap_key=null;
    trueResistance.forEach(zone =>{
        if(     ((resistance.high>zone.low)&&(resistance.high<zone.high))   ||  ((resistance.low<zone.high)&&(resistance.low>zone.low))     ||      ((resistance.high>zone.high)&&(resistance.low<zone.low))  ){
            overlap = true;
            overlap_key = Object.keys(trueResistance).find(key => trueResistance[key] === zone);
        };
    })
    if(overlap){
        trueResistance[overlap_key].recent_start = resistance.points[0].date;
        trueResistance[overlap_key].recent_end = resistance.points[2].date;
        trueResistance[overlap_key].strength++;
        trueResistance[overlap_key].points.push(resistance.points[0], resistance.points[1], resistance.points[2]);
        trueResistance[overlap_key].low = resistance.low > trueResistance[overlap_key].low? resistance.low : trueResistance[overlap_key].low;
        // instead of doing this, try to find the zone based on all candles instead of just adjusting zone after more data(may become irrelevant to first candle after many are in the zone)
        // on the other side, it may be impossible to find a line of best fit for higher and lower zone using all candles, and would may have to approximate/average
        // this would then lead to using a zone for each of the higher and lower levels
        // it using the zone however may lead to new relevant data instead of historical
    }else{
        let newResistance={
            recent_start: resistance.points[0].date, 
            recent_end: resistance.points[2].date,
            strength: 1,
            high: resistance.high,
            low: resistance.low,
            points: resistance.points
        }
        trueResistance.push(newResistance);
    }
}

function sortByDate(a, b) {
    // takes array of levels and sort from most recent respecting to oldest
    const dateA = a.recent_start;
    const dateB = b.recent_start;
  
    let comparison = 0;
    if (dateA > dateB) {
      comparison = -1;
    } else if (dateA < dateB) {
      comparison = 1;
    }
    return comparison;
}

function supp_sortByPrice(a, b) {
    // takes array of supports and sort from highest support to lowest
    const priceA = a.high;
    const priceB = b.high;
  
    let comparison = 0;
    if (priceA > priceB) {
      comparison = -1;
    } else if (priceA < priceB) {
      comparison = 1;
    }
    return comparison;
}

function res_sortByPrice(a, b) {
    // takes array of resistance and sort from lowest resistance to highest
    const priceA = a.high;
    const priceB = b.high;
  
    let comparison = 0;
    if (priceA > priceB) {
      comparison = 1;
    } else if (priceA < priceB) {
      comparison = -1;
    }
    return comparison;
}

function findClosestRecentLevels(last_candle, all_candles, supp_res){ //the following finds the closest, and closest most recent support [therefore following the U/teacup theorem and ignores retest]
    
    //find all support that would deem the last candle close "respecting it"
    let respected_supp = supp_res["support"].filter(support => (last_candle["open"] >= support.low ) || (last_candle["close"] >= support.low));
    
    //remove all that are considered "retest"
    let supp_non_retest =[];
    if (respected_supp){
        respected_supp.forEach((support)=>{
            
            let i=3;
            do {
                top=false;
                bottom=false;

                if (  (all_candles[all_candles.length-i].open > support.high)  && (all_candles[all_candles.length-i].close > support.high)  ){
                    top = true; 
                    supp_non_retest.push(support);
                }
                if ( (all_candles[all_candles.length-i].open < support.low) && (all_candles[all_candles.length-i].close < support.low)  )
                    bottom = true; 
                i++;
            } while ( !(top || bottom) );
        });
    }else{
        supp_non_retest=false;
    }

    if( (supp_non_retest.length !== 0) && (supp_non_retest !==false) ){
        // find the closest of those levels
        closestSupport = supp_non_retest.sort(supp_sortByPrice);

        closest_supp = {
            upper: closestSupport[0].high, 
            lower: closestSupport[0].low, 
            strength_index: closestSupport[0].strength
        };
        closest_supp_dates = {
            start: closestSupport[0].recent_start,
            end: closestSupport[0].recent_end
        };

        //find the most recent of those levels
        recentSupport = supp_non_retest.sort(sortByDate);

        closestRecent_supp = {
            upper: recentSupport[0].high, 
            lower: recentSupport[0].low, 
            strength_index: recentSupport[0].strength
        };
        closestRecent_supp_dates = {
            start: recentSupport[0].recent_start,
            end: recentSupport[0].recent_end
        };
    }
    else{
        time = new Date();

        closest_res = {
            upper: 0, 
            lower: 0, 
            strength_index: 0
        };
        closest_res_dates = {
            start: time,
            end: time
        };
        ////////////////////////
        closestRecent_res = {
            upper: 0, 
            lower: 0, 
            strength_index: 0
        };
        closestRecent_res_dates = {
            start: time,
            end: time
        };
    }

    //find last found support
    sorted_support = supp_res["support"].sort(sortByDate);
    last_supp = {
        upper: sorted_support[0].high, 
        lower: sorted_support[0].low, 
        strength_index: sorted_support[0].strength
    };
    last_supp_dates = {
        start: sorted_support[0].recent_start,
        end: sorted_support[0].recent_end
    };

    //find all resistance that would deem the last candle close "respecting it"
    let respected_res = supp_res["resistance"].filter(resistance => (last_candle["open"] <= resistance.high ) || (last_candle["close"] <= resistance.low));

    //remove all that are considered "retest"
    let res_non_retest =[];
    if (respected_res){
        respected_res.forEach((resistance)=>{

            let i=3;
            do {
                top=false;
                bottom=false;

                if (  (all_candles[all_candles.length-i].open > resistance.high)  && (all_candles[all_candles.length-i].close > resistance.high)  )
                    top = true;
                if ( (all_candles[all_candles.length-i].open < resistance.low) && (all_candles[all_candles.length-i].close < resistance.low)  ){
                    bottom = true;
                    res_non_retest.push(resistance);
                }
                i++;
            } while ( !(top || bottom) );
        });
    }else{
        res_non_retest=false;
    }
    
    if( (res_non_retest.length !== 0) && (res_non_retest !==false) ){
        // find the closest of those levels
        closestResistance = res_non_retest.sort(res_sortByPrice);

        closest_res = {
            upper: closestResistance[0].high, 
            lower: closestResistance[0].low, 
            strength_index: closestResistance[0].strength
        };
        closest_res_dates = {
            start: closestResistance[0].recent_start,
            end: closestResistance[0].recent_end
        };

        //find the most recent of those levels
        recentResistance = res_non_retest.sort(sortByDate);

        closestRecent_res = {
            upper: recentResistance[0].high, 
            lower: recentResistance[0].low, 
            strength_index: recentResistance[0].strength
        };
        closestRecent_res_dates = {
            start: recentResistance[0].recent_start,
            end: recentResistance[0].recent_end
        };
    }
    else{
        time = new Date();

        closest_res = {
            upper: 0, 
            lower: 0, 
            strength_index: 0
        };
        closest_res_dates = {
            start: time,
            end: time
        };
        ////////////////////////
        closestRecent_res = {
            upper: 0, 
            lower: 0, 
            strength_index: 0
        };
        closestRecent_res_dates = {
            start: time,
            end: time
        };
    }

    //find last found resistance
    sorted_resistance = supp_res["resistance"].sort(sortByDate);
    last_res = {
        upper: sorted_resistance[0].high, 
        lower: sorted_resistance[0].low, 
        strength_index: sorted_resistance[0].strength
    };
    last_res_dates = {
        start: sorted_resistance[0].recent_start,
        end: sorted_resistance[0].recent_end
    };


    //return levels
    levels = {
        support:{
            closest:{
                level: closest_supp,
                recent_date: closest_supp_dates
            },
            closest_most_recent:{
                level: closestRecent_supp,
                recent_date: closestRecent_supp_dates
            },
            last:{
                level: last_supp,
                recent_date: last_supp_dates
            }
        },
        resistance:{
            closest:{
                level: closest_res,
                recent_date: closest_res_dates
            },
            closest_most_recent:{
                level: closestRecent_res,
                recent_date: closestRecent_res_dates
            },
            last:{
                level: last_res,
                recent_date: last_res_dates
            }
        }
    }
    
    return levels;
}

module.exports = {
    getSupp_Resi,
    findClosestRecentLevels
}