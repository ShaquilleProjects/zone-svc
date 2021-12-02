module.exports = function() {
    return function(req, res, next) {
        if( req.params.id ){
            return res.status(403).send({ error: 'Error'});
        }
        next();
    }
};