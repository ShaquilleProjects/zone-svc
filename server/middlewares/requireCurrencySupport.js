module.exports = function(pair) {
    return function(req, res, next) {
        const { isSupported } = require('../config/supportedPairs.js');

        if( !isSupported(pair) ){
            return res.status(403).send({ error: 'Currency Not Supported'});
        }
        next();
    }
};