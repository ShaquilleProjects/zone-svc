const { hourlyJob } = require('./jobs/hourly.js');
const { dailyJob } = require('./jobs/daily.js');
const { weeklyJob } = require('./jobs/weekly.js');

const { 
    getDayOfWeek,
    getTimeOfDay,
} = require('../helperFunctions.js');

//run cron job every hour 

async function main(){


    //if it is 5pm on Sunday then run weekly job
    if( getDayOfWeek()==='Sunday' && getTimeOfDay()===22 ){
        await weeklyJob();
    }

    //if it is 5pm then run daily job
    if( getTimeOfDay()===22 ){
        await dailyJob();
    }

    // finding hourly zones always runs last becasue it is the only function that ends with process.exit(0)
    await hourlyJob();
}

main()