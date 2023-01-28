
module.exports= (app) =>{

    const currencySupported = require('../middlewares/currencySupported');
    const timeFrameSupported = require('../middlewares/timeFrameSupported');
    const apiKeySupported = require('../middlewares/apiKeySupported');
    const keys = require('../config/keys.js');

    app.get(`/:currency/:timeframe`,currencySupported(), timeFrameSupported(), apiKeySupported(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/zone.js');
        await mongoose.connect(keys.MONGO_URI_MARKUP);
        const Zone = mongoose.model('zone');
        
        if(req.params.timeframe.toUpperCase()=='MONTHLY'){
            //fetch from mongodb and disconnect
            Zone.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
                res.send(curr[0].monthly);
                mongoose.disconnect();
            });
        } 

        if(req.params.timeframe.toUpperCase()=='WEEKLY'){
            //fetch from mongodb and disconnect
            Zone.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
                res.send(curr[0].weekly);
                mongoose.disconnect();
            });
        } 

        if(req.params.timeframe.toUpperCase()=='DAILY'){
            //fetch from mongodb and disconnect
            Zone.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
                res.send(curr[0].daily);
                mongoose.disconnect();
            });
        } 

        if(req.params.timeframe.toUpperCase()=='H1'){
            //fetch from mongodb and disconnect
            Zone.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
                res.send(curr[0].h1);
                mongoose.disconnect();
            });
        } 
    });
}