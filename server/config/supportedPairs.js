const supportedPairs = {

    AUDCAD: true, //
    AUDCHF: true, //
    AUDJPY: true, //
    AUDUSD: true, //

    CADCHF: false,   // large inconsistency in prices with tradingview thus levels aren't true
    CADJPY: false,   // not supported by IEX

    CHFJPY: false,   // not supported by IEX

    EURAUD: true, //
    EURCAD: true, //
    EURCHF: true, //
    EURGBP: true, //
    EURJPY: true, //
    EURNZD: false, //IEX data goes back to 2008
    EURUSD: true, //

    GBPAUD: true,  //
    GBPCAD: false,   // not supported by IEX
    GBPCHF: true,  //
    GBPJPY: true, //
    GBPNZD: false,   // not supported by IEX
    GBPUSD: true, //

    AUDNZD: false, // IEX data goes back to 2008
    NZDCAD: false,  // IEX data goes back to 2014
    NZDCHF: false,  // IEX data goes back to 2014
    NZDJPY: false,  // IEX data goes back to 2014
    NZDUSD: true, //

    USDCAD: true, //
    USDCHF: true, //
    USDJPY: true, //
    
};

const isSupported = (pair) =>{
    pair = pair.toUpperCase();
    
    if (pair in supportedPairs)
        return supportedPairs[pair];
    else
        return false;
};

module.exports = {
    supportedPairs,
    isSupported
}