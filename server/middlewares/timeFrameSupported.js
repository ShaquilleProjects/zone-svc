module.exports = function() {
    return function(req, res, next) {

        if( !req.params['timeframe'] ){
            return res.status(403).send({ error: 'Time Frame Needed'});
        }
        if( !( 
            req.params.timeframe.toUpperCase() === 'MONTHLY' || 
            req.params.timeframe.toUpperCase() === 'WEEKLY' || 
            req.params.timeframe.toUpperCase() === 'DAILY' || 
            req.params.timeframe.toUpperCase() === 'HOURLY' 
        )){
            return res.status(403).send({ error: 'Time Frame Not Supported'});
        }
        next();
    }
};