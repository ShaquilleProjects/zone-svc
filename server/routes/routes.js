
module.exports= (app) =>{

    const requireCurrencySupport = require('../middlewares/requireCurrencySupport');
    const keys = require('../config/keys.js');

    app.get(`/:id/monthly`,requireCurrencySupport(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.id}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:id/weekly`,requireCurrencySupport(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.id}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:id/daily`,requireCurrencySupport(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.id}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:id/h1`,requireCurrencySupport(), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: req.params.id}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });
}