module.exports = function() {
    return function(req, res, next) {
        const { isSupported } = require('../config/supportedPairs.js');

        if( !isSupported(req.params.currency) ){
            return res.status(403).send({ error: 'Currency Not Supported'});
        }
        next();
    }
};