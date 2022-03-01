const addDate = date => {
    let dateString = date.toString();

    // get last char of date string
    const dateLastChar = dateString.charAt(dateString.length - 1);

    if (dateLastChar === '1' && dateString !== '11') {
        dateString = `${dateString}st`;
    } else if (dateLastChar === '2' && dateString !== '12') {
        dateString = `${dateString}nd`;
    } else if (dateLastChar === '3' && dateString !== '13') {
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }

    return dateString;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = (
    timestamp,
    { monthsLength = 'short', suffixDate = true } = {}
) => {
    let month;

    if (monthsLength === 'short') {
        month = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    } else {
        month = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }

    const dateObj = new Date(timestamp);
    const formattedMonth = month[dateObj.getMonth()];

    let dayMonth;

    if (suffixDate) {
        dayMonth = addDate(dateObj.getDate());
    } else {
        dayMonth = dateObj.getDate();
    }

    const year = dateObj.getFullYear();

    let hours;
    // check for time in 24-hr format
    if (dateObj.getHours > 12) {
        hours = Math.floor(dateObj.getHours() / 2);
    } else {
        hours = dateObj.getHours();
    }
    // if hours is 0 (12:00am), change it to 12
    if (hours === 0) {
        hours = 12;
    }

    const minutes = dateObj.getMinutes();

    // set `am` or `pm`
    let amPm;

    if (dateObj.getHours() >= 12) {
        amPm = 'pm';
    } else {
        amPm = 'am';
    }

    const formattedTime = `${formattedMonth} ${dayMonth}, ${year} at ${hours}:${minutes} ${amPm}`;

    return formattedTime;
};