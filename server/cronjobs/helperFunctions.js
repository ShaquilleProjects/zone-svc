function getDayOfWeek(){
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    date = new Date();
    day = date.getDay();
    return weekdays[day];
}


function getTimeOfDay() {
    var d = new Date();
    var hour = addZero(d.getHours());

    return hour;
}


module.exports = {
    getTimeOfDay,
    getDayOfWeek 
}