module.exports = function(input) {
    return function(req, res, next) {

        if( false ){
            return res.status(403).send({ error: 'Error'});
        }
        next();
    }
};