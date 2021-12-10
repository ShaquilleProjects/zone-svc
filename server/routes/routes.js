
module.exports= (app) =>{

    const requireCurrencySupport = require('../middlewares/requireCurrencySupport');
    const keys = require('../config/keys.js');

    const currency = {
        from: 'AUD',
        to: 'CAD',
        pair: 'AUDCAD'
    }

    app.get(`/:id/monthly`,requireCurrencySupport(req.params.id), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: currency.pair}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:id/weekly`,requireCurrencySupport(req.params.id), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: currency.pair}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:id/daily`,requireCurrencySupport(req.params.id), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: currency.pair}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/:id/h1`,requireCurrencySupport(req.params.id), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../../models/currency.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const Currency = mongoose.model('currency');
        
        //fetch from mongodb and disconnect
        Currency.find({pair: currency.pair}, function (err, curr) {
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });
}