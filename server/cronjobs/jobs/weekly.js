const mongoose = require('mongoose');
const keys = require('../../config/keys.js');
const supportedPairs = require('../../config/supportedPairs');
const { getSupp_Resi, findClosestRecentLevels } = require('../core.js');

const pairs = supportedPairs.supportedPairs;
const pair_keys = Object.keys(supportedPairs.supportedPairs);

require('../../models/currency.js');


//weekly  job
async function weeklyZones(){

    let currency_list =[];
    let all_supp_res=[];
    
    await mongoose.connect(keys.MONGO_URI_MARKUP, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("DB Connected!"); 
        console.log("Running Phillip Weekly Analysis!"); 
        console.log("Fetching Currency Data ...");
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

    try{
        const time_frame = 'weekly';
        const date_range = null;
        const Currency = mongoose.model('currency');


        // finds all supported pairs
        for (pair of pair_keys){     
            if (pairs[pair]=== true){   
                
                let currency = {
                    pair: pair,
                    from: pair.slice(0,3),
                    to: pair.slice(3)
                };

                currency_list.push(currency);
            }
        }

        //get support resistance for all pairs
        const all_levels = await Promise.all(
            currency_list.map( async function (curr){ 

                let levels = await getSupp_Resi(time_frame, date_range, curr);
                obj = {
                    pair: curr.pair,
                    levels: levels,
                    last_candle: levels.last_candle,
                    all_candles: levels.all_candles
                }
                all_supp_res.push(obj);
            }
        ))

        // get closest levels and update db
        .then( async function(){
            console.log("Currency List: ",all_supp_res.length);

            const currencies = await Promise.all(
                all_supp_res.map( async function (supp_res){ 
                    let sr_levels = findClosestRecentLevels(supp_res.last_candle, supp_res.all_candles, supp_res.levels);
                    try{
                        // replace data in mongodb
                        await Currency.findOneAndUpdate({pair: supp_res.pair}, {weekly: sr_levels} );
                        
                    }catch(err){
                        console.log(err);
                    }
                })
            )

            // close db
            .then(async function() {
                
                await mongoose.connection.close(function(){
                    console.log("Currencies Updated");
                    console.log("DB Disconnected.");
                })
            });

        });
        
    }catch(error){
        throw(error);
    }
    
}

module.exports = {
    weeklyZones
}