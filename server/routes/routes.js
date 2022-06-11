
module.exports= (app) =>{

    const currencySupported = require('../middlewares/currencySupported');
    const keys = require('../config/keys.js');

    app.get(`/:currency/monthly`,currencySupported(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        await mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:currency/weekly`,currencySupported(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        await mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
            res.send(curr[0].weekly);
            mongoose.disconnect();
        });

    });

    app.get(`/:currency/daily`,currencySupported(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        await mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
            res.send(curr[0].daily);
            mongoose.disconnect();
        });

    });

    app.get(`/:currency/h1`,currencySupported(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        await mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.currency.toUpperCase()}, function (err, curr) {
            res.send(curr[0].h1);
            mongoose.disconnect();
        });

    });
}