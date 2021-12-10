const monthly = {
    fxFunction: 'FX_MONTHLY',
    timeframe: 'Monthly',
    interval: null
}

const weekly = {
    fxFunction: 'FX_WEEKLY',
    timeframe: 'Weekly',
    interval: null
}

const daily = {
    fxFunction: 'FX_DAILY',
    timeframe: 'Daily',
    interval: null
}

const h1 = {
    fxFunction: 'FX_INTRADAY',
    timeframe: '60min',
    interval: '60min'
}


module.exports = {
    MONTHLY: monthly,
    WEEKLY: weekly,
    DAILY: daily,
    H1: h1
};