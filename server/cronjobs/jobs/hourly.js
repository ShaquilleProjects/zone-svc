// DATABASE CALL EXAMPLE

const mongoose = require('mongoose');
const keys = require('../../config/keys.js');

require('../../models/mymodel.js');

//hourly  job
async function hourlyJob(){

    await mongoose.connect(keys.MONGO_URI_MARKUP, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("DB Connected!");
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

    try{
        const MyModel = mongoose.model('mymodel');


        // example of async await incase mapping is needed amd other async calls are made
        const all_levels = await Promise.all(
            currency_list.map( async function (curr){ 

            }
        ))
        .then( async function(){

            const currencies = await Promise.all(
                all_supp_res.map( async function (supp_res){ 

                })
            )
            // close db
            .then(async function() {
                await mongoose.connection.close(function(){
                    console.log("DB Disconnected.");
                    process.exit(0); 
                })
            });

        });        
        
    }catch(error){
        throw(error);
    }
    
}

module.exports = {
    hourlyJob
}