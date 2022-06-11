module.exports = function() {
    return function(req, res, next) {
        const listOfSupportedKeys = [];
        if( req.query.apikey ){
            return res.status(403).send({ error: 'Please proved API KEY'});
        } else if( req.query.apikey.toUpperCase() === 'DEMO' ){
            return res.status(403).send({ error: 'Dummy Data'});
        } else if( ! req.query.apikey.toUpperCase() in listOfSupportedKeys ){
            return res.status(403).send({ error: 'Not in list of supported Keys'});
        }
        next();
    }
};