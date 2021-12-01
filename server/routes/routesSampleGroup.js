
module.exports= (app) =>{

    const middlewareSample = require('../../middlewares/middlewareSample');
    const keys = require('../../config/keys.js');

    app.get(`/:id/example`,middlewareSample(req.params.id), async(req, res) => {

        //connect to mongodb
        const mongoose = require('mongoose');
        require('../../models/mymodel.js');
        mongoose.connect(keys.MONGO_URI_MARKUP);
        const MyModel = mongoose.model('mymodel');

        //fetch from mongodb and disconnect
        MyModel.find({pair: currency.pair}, function (err, curr) { //mongodb query
            res.send(curr[0].monthly);
            mongoose.disconnect();
        });

    });

    app.get(`/blah`,middlewareSample(req.params.id), async(req, res) => {

        res.send();

    });
}