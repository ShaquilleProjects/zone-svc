function zoneTestedPreviously(points, level, closestMostRecentDate, lastFoundLevelDate, levelType) {
    status = false;
    if (levelType==="support"){
        //filter all points by the ones acting after date
        filtered_points = points.filter( point => ((point.date > closestMostRecentDate) && (point.date < lastFoundLevelDate))  );

        //loop through candles except current and see if low was ever less than the high of the level
        for(let i = 2; i<filtered_points.length-1; i++){
            if (filtered_points[i].low<level.high){
                status=true;
            }
        }
    }else if (levelType==="resistance"){
        //filter all points by the ones acting after date
        filtered_points = points.filter( point => ((point.date > closestMostRecentDate) && (point.date < lastFoundLevelDate))  );

        //loop through candles except current and see if high was ever greater than the low of the level
        for(let i = 2; i<filtered_points.length-1; i++){
            if (filtered_points[i].high>level.low){
                status=true;
            }
        }
    }

    return status;
}

function zoneRecentlyTested(points, level, lastFoundLevelDate, levelType) {
    status = false;
    if (levelType==="support"){
        //filter all points by the ones acting after date
        filtered_points = points.filter( point => (point.date > lastFoundLevelDate)  );

        //loop through candles except current and see if low was ever less than the high of the level
        for(let i = 2; i<filtered_points.length-2; i++){
            if (filtered_points[i].low<level.high){
                status=true;
            }
        }
        console.log("first candle is",filtered_points[2] );
    }else if (levelType==="resistance"){
        //filter all points by the ones acting after date
        filtered_points = points.filter( point => (point.date > lastFoundLevelDate)  );

        //loop through candles except current and see if low was ever less than the high of the level
        for(let i = 2; i<filtered_points.length-2; i++){
            if (filtered_points[i].high>level.low){
                status=true;
            }
        }
        console.log("first candle is",filtered_points[2] );
    }

    return status;
}


function respectOrEngulfAfterTest(allCandles, zone, lastFoundLevelDate, levelType){

    //get candles after the last level
    candles = allCandles.filter( candle => (candle.date > lastFoundLevelDate)  );


    if (levelType === "support"){
        i = -1;
        do{
            i++;
        }while(candles[i].low > zone.high)

        if ( candles[i].type === 'red' && candles[i+1].type === 'green'){   //basic support was found(variation1)
            return true;
        } else if( candles[i].type === 'green' && candles[i-1].type === 'red' ){ //basic support was found(variation2)
            return true;
        }else if ( candles[i+1].type === 'red' && candles[i+2].type === 'green'){   //support was found late, but engulf signals strong reversal [ variation1]
            redCandleBodyLength = candles[i+1].open - candles[i+1].close ;
            greenCandleBodyLength = candles[i+2].close - candles[i+2].open ;

            if ( greenCandleBodyLength >= redCandleBodyLength ){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    if (levelType === "resistance"){
        i = -1;
        do{
            i++; 
        }while(candles[i].high < zone.low)

        if ( candles[i].type === 'green' && candles[i+1].type === 'red'){   //basic resistance was found(variation1)
            return true;
        } else if( candles[i].type === 'red' && candles[i-1].type === 'green' ){ //basic resistance was found(variation2)
            return true;
        }else if ( candles[i+1].type === 'green' && candles[i+2].type === 'red'){   //resistance was found late, but engulf signals strong reversal [ variation1]
            greenCandleBodyLength = candles[i+1].close - candles[i+1].open ;
            redCandleBodyLength = candles[i+2].open - candles[i+2].close ;

            if ( redCandleBodyLength >= greenCandleBodyLength ){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

}

function findLastSupport(candles){
    index = candles.length;
    do{
        index--;
    }while( ! ( (candles[index].type === 'green') && (candles[index-1].type === 'red') ) );

    range  = {
        low: Math.min(candles[index].low, candles[index-1].low),
        high: Math.min(candles[index].close, candles[index-1].open), //finds the high of the overlap
        start_date: candles[index-1].date
    }
    return range;
}

function findLastResistance(candles){
    index = candles.length-1;
    do{
        index--;
    }while( ! ( (candles[index].type === 'red') && (candles[index-1].type === 'green') ) );

    range  = {
        low: Math.max(candles[index].close, candles[index-1].open), //finds the low of the overlap
        high: Math.max(candles[index].high, candles[index-1].high),
        start_date: candles[index-1].date
    }
    return range;
}

function touchProjectedLevel(allCandles, zone, lastFoundLevelDate, projectedLevel, levelType){


    touch=false;
    candles = allCandles.filter( candle => (candle.date > lastFoundLevelDate)  );

    if (levelType === "support"){  

        //find candles acting after weekly support is found
        i = -1;
        do{
            i++;
        }while(candles[i].low > zone.high)
        
        //loop through the remaining candles to see if any has touched the projected level
        for (x=i; x<candles.length; x++){
            if (candles[x].high > projectedLevel.lower)
                touch=true;
        };
    } else if (levelType === "resistance "){

        //find candles acting after weekly support is found
        i = -1;
        do{
            i++;
        }while(candles[i].high < zone.low)

        //loop through the remaining candles to see if any has touched the projected level
        for (x=i; x<candles.length; x++){
            if (candles[x].low < projectedLevel.upper)
                found=true;
        };
    }

    if (touch === true){
        return true;
    }else{
        return false;
    }
}

function findDailyHPZ(weekly_zone, daily_levels, levelType){

    const weeklyStartDate = editWeeklyStartDate(weekly_zone.start_date);

    // ensures daily level falls within weekly candle supp/res 
    daily_LessThanWeeklyHigh = daily_levels.filter( zone => (zone.high > weekly_zone.low)  );
    daily_GreaterThanWeeklyHigh = daily_LessThanWeeklyHigh.filter( zone => (zone.low < weekly_zone.high)  );

    if (levelType === "support"){

        // find lowest support (the turning point) and remove it 
        lowest_support = Math.min.apply(Math, daily_GreaterThanWeeklyHigh.map(function(zone) { return zone.low; }));
        zones = daily_GreaterThanWeeklyHigh.filter(function( zone ) { return zone.low !== lowest_support; });

        duplicate_zones = zones;

        // return only zones that have been found after the weekly support ( most recent/fresh )
        zonesAfterWeekly = zones.filter(function( zone ) { return zone.recent_start > weeklyStartDate; });

        // if no zones have been found, use the lowest of the duplicates else lowest of norm
        if ( zonesAfterWeekly === undefined || zonesAfterWeekly.length == 0){
            HPZ = Math.min.apply(Math, duplicate_zones.map(function(zone) { return zone.high; }));
        } else {
            HPZ = Math.min.apply(Math, zonesAfterWeekly.map(function(zone) { return zone.high; }));
        }

    } else if (levelType === "resistance"){
        // remove highest resistance(the turning point)
        highest_resistance = Math.max.apply(Math, daily_GreaterThanWeeklyHigh.map(function(zone) { return zone.high; }));
        zones = daily_GreaterThanWeeklyHigh.filter(function( zone ) { return zone.high !== highest_resistance; });

        duplicate_zones = zones;

        // return only zones that have been found after the weekly res start date ( most recent/fresh )
        zonesAfterWeekly = zones.filter(function( zone ) { return zone.recent_start > weeklyStartDate; });

        // if no zones have been found, use the highest of the duplicates else highest of norm
        if ( zonesAfterWeekly === undefined || zonesAfterWeekly.length == 0) {
            HPZ = Math.max.apply(Math, duplicate_zones.map(function(zone) { return zone.low; }));
        } else {
            HPZ = Math.max.apply(Math, zonesAfterWeekly.map(function(zone) { return zone.low; }));
        }

    }

    return HPZ;

}

function lastBearishEngulf( candles, level ){
    index = candles.length-1;
    do{
        index--;
        redCandleBodyLength = candles[index].open - candles[index].close ;
        greenCandleBodyLength = candles[index-1].close - candles[index-1].open ;

    }while( ! ( (candles[index].type === 'red') && (candles[index-1].type === 'green') && (redCandleBodyLength>greenCandleBodyLength) && (candles[index-1].open > level) ) );

    const range = {
        level: candles[index-1].open,
        date: candles[index-1].date
    };

    return range;
}

function lastBullishEngulf( candles, level ){
    index = candles.length-1;
    do{
        index--;
        greenCandleBodyLength = candles[index].close - candles[index].open ;
        redCandleBodyLength = candles[index-1].open - candles[index-1].close ;

    }while( ! ( (candles[index].type === 'green') && (candles[index-1].type === 'red') && (greenCandleBodyLength>redCandleBodyLength) && (candles[index-1].open > level) ) );

    const range = {
        level: candles[index-1].open,
        date: candles[index-1].date
    };

    return range;
}

function editWeeklyStartDate(start_date){

    // edit date range in order to incorporate the first couple days of the start week
    var date = new Date(start_date);
    var seconds = date.getTime() / 1000;  
    var editedStart = new Date((seconds - 604800) * 1000);      //604800 seconds are in 8days (need 8 instead of 7 because ">" is used to compare date)

    Date.prototype.yyyymmdd = function() {      //function used to convert Date object to string
        var mm = this.getMonth() + 1;
        var dd = this.getDate();
        
        return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('-');
    };

    new_start_date = editedStart.yyyymmdd();
    return new_start_date;
}

function editWeeklyRange(date){

    date_range = {
        start: editWeeklyStartDate(date.recent_start),
        end: date.recent_end,
    }
    return date_range;
}

function editMonthlyRange(date){
    var index = 8;
    editedStart = date.start.substring(0, index) + '01' + date.start.substring(index + 2);
    
    date_range = {
        start: editedStart,
        end: date.end,
    }
    return date_range;
}

function getDayOfWeek(){
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    date = new Date();
    day = date.getDay();
    return weekdays[day];
}

function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

function getTimeOfDay() {
    var d = new Date();
    var hour = addZero(d.getHours());

    return hour;
}

function getDayOfMonth() {
    var d = new Date();
    var day = addZero(d.getDate());

    return day;
}

function isOverBought(currentPrice, limitPrice, fromCurrency, toCurrency){
    const difference = currentPrice - limitPrice;
    let pip = null;

    if( fromCurrency === 'JPY' || toCurrency === 'JPY' ){
        pip = difference * 100;
    }else{
        pip = difference * 10000;
    }

    if ( pip > 100 ) return true;   // 150 pips above the limit is considered overbought

    return false;
}

function isOverSold(currentPrice, limitPrice, fromCurrency, toCurrency){
    const difference = limitPrice - currentPrice;
    let pip = null;

    if( fromCurrency === 'JPY' || toCurrency === 'JPY' ){
        pip = difference * 100;
    }else{
        pip = difference * 10000;
    }

    if ( pip > 100 ) return true; // 150 pips below the limit is considered overbought

    return false;
}

function isSellLimitPractical( currentPrice, limitPrice ){
    if(currentPrice < limitPrice)return true;
    return false;
}
function isBuyLimitPractical( currentPrice, limitPrice ){
    if(currentPrice > limitPrice)return true;
    return false;
}

function testedAndRespectLevel( lastCandle, secondToLastCandle, zone, levelType  ){

    if(levelType==="support"){
        if( (lastCandle.type === "green") && (secondToLastCandle.type === "red") ){     //check if support was found
            if( (lastCandle.low < zone.upper) || (secondToLastCandle.low < zone.upper) ){    //check if it stretches lower than supp
                if( (lastCandle.close > zone.lower) && (secondToLastCandle.open > zone.lower) ){   //checks if it is respected
                    return true;
                }
            }
        }
    }else if(levelType==="resistance"){
        if( (lastCandle.type === "red") && (secondToLastCandle.type === "green") ){     //check if resistance was found
            if( (lastCandle.high > zone.lower) || (secondToLastCandle.high > zone.lower) ){    //check if it stretches higher than res
                if( (lastCandle.open < zone.upper) || (secondToLastCandle.close < zone.upper) ){   //checks if it is respected
                    return true;
                }
            }
        }
    }

    return false;
    
}

function isLevelValid( zone ){
    if (zone.level.upper === 0)
        return false;
    else 
        return true;
}

function getDayOfWeek(){
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    date = new Date();
    day = date.getDay();
    return weekdays[day];
}

function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

function getTimeOfDay() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());

    return h;
}

function findInstitutionalLevel( lastCandle, secondToLastCandle, levelType ){
    if (levelType === "support"){
        return secondToLastCandle.open;
    }else if (levelType === "resistance"){
        return secondToLastCandle.open
    }
}

function findH1Entry ( lastDailyCandle, hourlyData, levelType ){
    if (levelType === "support"){

        //if there is no closest most recent, find 61.8% retracement level
        if ( hourlyData.support.closest_most_recent.level.upper === 0){
            const goldenRetrace = lastDailyCandle.low + ((lastDailyCandle.high - lastDailyCandle.low) * 0.382 ) ;
            return goldenRetrace;
        }else{ // return instead the closest most recent 
            return hourlyData.support.closest_most_recent.level.upper;
        }

    }else if (levelType === "resistance"){
        
        //if there is no closest most recent, find 61.8% retracement level
        if ( hourlyData.resistance.closest_most_recent.level.upper === 0){
            const goldenRetrace = lastDailyCandle.high - ((lastDailyCandle.high - lastDailyCandle.low) * 0.382 ) ;
            return goldenRetrace;
        }else{ // return instead the closest most recent 
            return hourlyData.support.closest_most_recent.level.lower;
        }
    }
}

function didEngulf( lastCandle, secondToLastCandle, levelType ){
    if (levelType === "support"){
        const lastCandleBody = lastCandle.close - lastCandle.open;
        const secondToLastCandleBody = secondToLastCandle.open - secondToLastCandle.close;

        if ( lastCandleBody > secondToLastCandleBody )
            return true;

    }else if (levelType === "resistance"){
        const lastCandleBody = lastCandle.open - lastCandle.close;
        const secondToLastCandleBody = secondToLastCandle.close - secondToLastCandle.open;

        if ( lastCandleBody > secondToLastCandleBody )
        return true;

    }

    return false;
}

function h1Supportis25Pips(limitPrice, fromCurrency, toCurrency, projection, levelType){
    if (levelType==="support"){
        const difference = projection - limitPrice;

        if( fromCurrency === 'JPY' || toCurrency === 'JPY' ){
            const pip = difference * 100;
            if (pip>25)
                return true
            else
                return false;
            
        }else{
            const pip = difference * 10000;
            if (pip>25)
                return true
            else
                return false;
        }

    }else if (levelType==="resistance"){
        const difference = limitPrice - projection;

        if( fromCurrency === 'JPY' || toCurrency === 'JPY' ){
            const pip = difference * 100;
            if (pip>25)
                return true
            else
                return false;


        }else{
            const pip = difference * 10000;
            if (pip>25)
                return true
            else
                return false;
        }
    }    
}

function price50PipsAway(limitPrice, fromCurrency, toCurrency, levelType){
    if (levelType==="support"){

        if( fromCurrency === 'JPY' || toCurrency === 'JPY' ){
            const projection = (50 / 100) + limitPrice; 
            return projection;           
        }else{
            const projection = (50 / 10000) + limitPrice;
            return projection;
        }

    }else if (levelType==="resistance"){

        if( fromCurrency === 'JPY' || toCurrency === 'JPY' ){
            const projection = 0 - ((50 / 100) - limitPrice); 
            return projection;    
        }else{
            const projection = 0 - ((50 / 10000) - limitPrice);
            return projection;        
        }
    }    
}

module.exports = {
    zoneTestedPreviously,
    zoneRecentlyTested,
    respectOrEngulfAfterTest,
    findLastSupport, 
    findLastResistance,
    touchProjectedLevel,
    findDailyHPZ,
    lastBullishEngulf,
    lastBearishEngulf,
    editWeeklyStartDate,
    editWeeklyRange,
    editMonthlyRange,
    getDayOfWeek,
    isOverBought,
    isOverSold,
    isSellLimitPractical,
    isBuyLimitPractical,
    getTimeOfDay,
    getDayOfMonth,

    testedAndRespectLevel,
    isLevelValid,
    getDayOfWeek,
    getTimeOfDay,
    findInstitutionalLevel,
    didEngulf,
    findH1Entry,
    h1Supportis25Pips,
    price50PipsAway
}