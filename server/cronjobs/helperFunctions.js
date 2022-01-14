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

function getDayOfWeek(){
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    date = new Date();
    day = date.getDay();
    return weekdays[day];
}

module.exports = {
    getDayOfWeek,
    getTimeOfDay,
    getDayOfMonth,
    getDayOfWeek,
    getTimeOfDay,
}