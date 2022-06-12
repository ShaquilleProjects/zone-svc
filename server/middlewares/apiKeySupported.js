module.exports = function() {
    return function(req, res, next) {


        const dummyData = {
            "support": {
                "closest": {
                    "level": {
                        "upper": 0.661,
                        "lower": 0.6343,
                        "strength_index": 3
                    },
                    "recent_date": {
                        "start": "2022-01-31T00:00:00.000Z",
                        "end": "2022-03-31T00:00:00.000Z"
                    }
                },
                "closest_most_recent": {
                    "level": {
                        "upper": 0.661,
                        "lower": 0.6343,
                        "strength_index": 3
                    },
                    "recent_date": {
                        "start": "2022-01-31T00:00:00.000Z",
                        "end": "2022-03-31T00:00:00.000Z"
                    }
                },
                "last": {
                    "level": {
                        "upper": 0.661,
                        "lower": 0.6343,
                        "strength_index": 3
                    },
                    "recent_date": {
                        "start": "2022-01-31T00:00:00.000Z",
                        "end": "2022-03-31T00:00:00.000Z"
                    }
                }
            },
            "resistance": {
                "closest": {
                    "level": {
                        "upper": 0.7097,
                        "lower": 0.6834,
                        "strength_index": 3
                    },
                    "recent_date": {
                        "start": "2019-01-31T00:00:00.000Z",
                        "end": "2019-03-29T00:00:00.000Z"
                    }
                },
                "closest_most_recent": {
                    "level": {
                        "upper": 0.7394,
                        "lower": 0.72044,
                        "strength_index": 7
                    },
                    "recent_date": {
                        "start": "2021-05-31T00:00:00.000Z",
                        "end": "2021-07-30T00:00:00.000Z"
                    }
                },
                "last": {
                    "level": {
                        "upper": 0.7394,
                        "lower": 0.72044,
                        "strength_index": 7
                    },
                    "recent_date": {
                        "start": "2021-05-31T00:00:00.000Z",
                        "end": "2021-07-30T00:00:00.000Z"
                    }
                }
            }
        };

        // TO DO: STORE KEYS IN DATABASE AND FETCH
        const listOfSupportedKeys = ['SHAQ'];
        if( !req.query.apikey ){
            return res.status(403).send({ error: 'Please provide API KEY'});
        }
        if( req.query.apikey.toUpperCase() === 'DEMO' ){
            return res.send(dummyData);
        } else if( ! listOfSupportedKeys.includes(req.query.apikey.toUpperCase() ) ){
            return res.status(403).send({ error: 'Not in list of supported Keys'});
        }
        next();
    }
};