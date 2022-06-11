const { hourlyZones } = require('./jobs/hourly.js');
const { dailyZones } = require('./jobs/daily.js');
const { weeklyZones } = require('./jobs/weekly.js');
const { monthlyZones } = require('./jobs/monthly.js');

const { 
    getDayOfWeek,
    getTimeOfDay,
    getDayOfMonth,
} = require('./helperFunctions.js');


async function main(){

    //if it is middnight on the 1st and it not a weekedend then find monthly zones followed by weekly zones
    if( getDayOfWeek()!=='Sunday' && getDayOfWeek()!=='Saturday' && getTimeOfDay()===21 && getDayOfMonth()===1 ){
        await monthlyZones();
        await weeklyZones();
    }
    
    //if the first falls on a weekend, find the monthly zones at the following Sunday at 5pm
    else if( getDayOfWeek()==='Sunday' && (getDayOfMonth()===1 || getDayOfMonth()===2) && getTimeOfDay()===21){

        await monthlyZones();
        await weeklyZones();
    }

    //if it is 5pm on Sunday then find weekly zones
    else if( getDayOfWeek()==='Sunday' && getTimeOfDay()===21 ){

        await weeklyZones();

    }

    //if it is 5pm then find daily zones
    if( getTimeOfDay()===21 ){

        await dailyZones();

    }

    // finding hourly zones always runs last becasue 
    // it is the only function that ends with process.exit(0)
    await hourlyZones();
}

main()