window.onload = () => {

    let date = document.getElementById('date'),
        phone = document.getElementById('phone'),
        today = new Date(),
        dateInfo;

    setDates(today);
    setTime(today); //Sets default time from todays given date

    document.getElementById('name').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\d/g, '');
    });

    date.addEventListener('input', e => {
        dateInfo = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        e.target.value = !dateInfo[2] ? dateInfo[1] : dateInfo[1] + '/' + dateInfo[2] + (dateInfo[3] ? '/' + dateInfo[3] : '');
    });

    date.addEventListener('change', e => {
        if (!dateChecker(dateInfo, today)) {
            date.placeholder = 'Invalid date';
            e.target.value = '';
        }
    });

    document.getElementById('guests').addEventListener('input', e => {
        let guests = e.target.value.replace(/\D/g, '').match(/(\d?)(\d?)/);
        e.target.value = guests[1] === '0' ? '' : guests[0];
    });

    phone.addEventListener('change', e => {
        if (e.target.value.length < 14) {
            phone.placeholder = 'invalid number';
            e.target.value = '';
        }
    });

    phone.addEventListener('input', e => {
        let phone = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] + (phone[3] ? '-' + phone[3] : '');
    });

};

setDates = (today) => {

    let date = $('#date');

    date.datepicker({
        'minDate': today,
        'maxDate': '+183d'
    });

    date.datepicker(
        'setDate', today
    );

};

dateChecker = (date, today) => {

    switch (true) {
        case date[1] > 12:
        case date[3] < today.getFullYear():
        case date[3] > today.getFullYear() + 1:
            return false;
        default:
            return dayCalc(date, today); //True or false depending on outcome
    }

};

dayCalc = (date, today) => {
    let daysInYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
        daysPerMonth = [31, 28 + (date[3] % 4 ? 0 : 1), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (date[2] > daysPerMonth[date[1] - 1]) {
        return false;
    }

    let dateEntered = parseInt(daysInYear[date[1] - 1]) + parseInt(date[2]) +
            parseInt(date[3] % 4 ? 0 : (date[1] > 2 ? 1 : 0)),
        todayDate = parseInt(daysInYear[today.getMonth()]) + parseInt(today.getDate()) +
            parseInt(today.getFullYear() % 4 ? 0 : (today.getMonth() > 1 ? 1 : 0));

    if (date[3] == today.getFullYear()) {
        return !(dateEntered < todayDate || dateEntered - todayDate > 183); //returns false if outside of 6m range
    }
    else {
        return todayDate - (today.getFullYear() % 4 ? 365 : 366) - dateEntered >= -183; //checks with consideration of leap year
    }
};

setTime = (today) => {

    let time = $('#time'),
        resTime = (today.getHours() > 12 ? (today.getHours() - 11) + ':30pm' :
                    (today.getHours() + 1) + ':30am');

    time.timepicker({
            'disableTextInput': true,
            'forceRoundTime': true,
            'maxTime': '11:30PM',
            'minTime': '7:30am',
            'selectOnBlur': true,
            'step': 15,
        }
    );

    if (today.getHours() < 6) {
        time.timepicker(
            'setTime', '7:00pm' //7:00pm default
        )
    }
    else {
        time.timepicker(
            'setTime', resTime
        );
    }
};

//high level AEM versioning what have you worked on
/*
convo with vp
 */













