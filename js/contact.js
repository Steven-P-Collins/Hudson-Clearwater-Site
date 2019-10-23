window.onload = () => {

    let date = document.getElementById('date'),
        phone = document.getElementById('phone'),
        today = new Date(),
        dateInfo;

    setDates();
    setTime(true); //Sets default time from todays given date

    document.getElementById('name').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\d/g, '');
    });

    date.addEventListener('input', e => {
        dateInfo = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        e.target.value = !dateInfo[2] ? dateInfo[1] : dateInfo[1] + '/' +
            dateInfo[2] + (dateInfo[3] ? '/' + dateInfo[3] : '');
    });

    date.addEventListener('change', e => {
        if (!dateChecker(dateInfo, today)) { //Entered date outside of range or bad date
            date.placeholder = 'Invalid date';
            e.target.value = '';
            setTime(false);
        }
        else if (dateInfo[1] == (today.getMonth() + 1) && dateInfo[2] == today.getDate()){
            console.log('ef');
            setTime(true);
        }
        else {
            console.log('e');
            setTime(false);
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
        e.target.value = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] +
            (phone[3] ? '-' + phone[3] : '');
    });

    document.getElementsByClassName('form')[0].addEventListener('submit', e => {

    });

};

setDates = () => {
    let date = $('#date'),
        today = new Date();

    date.datepicker({
        'minDate': today,
        'maxDate': '+183d',
        onSelect: function() {
            let dateTotal = today.getDate() + today.getFullYear() + today.getMonth() + 1;

            date.val().match(/(\d{0,2})(\d{0,2})(\d{0,4})/g).forEach(element => {
                dateTotal -= parseInt(element) ? parseInt(element) : 0;
            });

            dateTotal ? setTime(false) : setTime(true);
        }
    });

    date.datepicker(
        'setDate', today,
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

    if (date[2] > daysPerMonth[date[1] - 1]) { //Day exceeds month range
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
//$('#optionExample').timepicker('option', 'minTime', '2:00am');
setTime = (date) => {
    let today = new Date(),
        time = $('#time'),
        resTime = date ? ((today.getHours() > 12 ? (today.getHours() - 11) + ':30PM' :
                    (today.getHours() + 1) + ':30AM')) : '7:30AM';

    resTime = resTime.toString();

    time.timepicker({
            'disableTextInput': true,
            'forceRoundTime': true,
            'maxTime': '11:30PM',
            'minTime': resTime,
            'selectOnBlur': true,
            'step': 15,
        }
    );

    time.timepicker('setTime', today.getHours() < 6 ? '7:00PM' : resTime);
};

submit = () => {
    let time = document.getElementById('time').value;

    alert(time);
};

//high level AEM versioning what have you worked on
/*
convo with vp
 */













