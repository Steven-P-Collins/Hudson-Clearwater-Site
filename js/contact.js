window.onload = () => {

    let date = $('#date'),
        dateInfo,
        phone = document.getElementById('phone'),
        time = $('#time'),
        today = new Date(),
        resTime = changeTime(time, setTime(time, today)); //Sets default time from todays given date

    if (today.getHours() > 22) {
        let tomorrow = new Date(today);
        today = tomorrow.setDate(tomorrow.getDate() + 1);
    }
    else {
        alert('dog');
    }

    // today.getHours() < 23 ? today : today.setDate(today.getDate() + 1)


    setDates(date, today, resTime);

    document.getElementById('name').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\d/g, '');
    });

    date.on('input', e => {
        dateInfo = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        e.target.value = !dateInfo[2] ? dateInfo[1] : dateInfo[1] + '/' +
            dateInfo[2] + (dateInfo[3] ? '/' + dateInfo[3] : '');
    });

    date.change(e => {
        if (!dateChecker(dateInfo, today)) { //Entered date outside of range or bad date
            date.attr('placeholder', 'Invalid Date');
            e.target.value = '';
        }
        else if (dateInfo[1] === (today.getMonth() + 1).toString() && dateInfo[2] === today.getDate().toString()){
            resTime.lateTime();
        }
        else {
            resTime.anyTime();
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

setDates = (date, today, resTime) => {

    console.log('pizza');


    date.datepicker({
        'minDate': today,
        'maxDate': '+183d',
        onSelect: function() {
            let dateTotal = today.getDate() + today.getFullYear() + today.getMonth() + 1;

            date.val().match(/(\d{0,2})(\d{0,2})(\d{0,4})/g).forEach(element => {
                dateTotal -= parseInt(element) ? parseInt(element) : 0;
            });

            dateTotal ? resTime.anyTime() : resTime.lateTime();
        }
    });

    date.datepicker(
        'setDate', today,
    );
};

let changeTime = (domTime, todayTime) => {

    let change = (time) => {
        domTime.timepicker('option', 'minTime', time);
        domTime.timepicker('setTime', todayTime);
    };
    return {
        anyTime: () => {
            change('7:30AM');
        },
        lateTime: () => {
            change(todayTime);
        }
    }
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

    if (date[3] === today.getFullYear().toString()) {
        return !(dateEntered < todayDate || dateEntered - todayDate > 183); //returns false if outside of 6m range
    }
    else {
        return todayDate - (today.getFullYear() % 4 ? 365 : 366) - dateEntered >= -183; //checks with consideration of leap year
    }
};

setTime = (time, today) => {
    let hours = today.getHours(),
        earliestTime = (hours > 12 ?
            (hours - 11) + ':30PM' : (hours > 10) ?
                (hours + 1) + ':30PM' : (hours + 1) + ':30AM');

    console.log(hours);

    time.timepicker({
            'disableTextInput': true,
            'forceRoundTime': true,
            'maxTime': '11:30PM',
            'minTime': hours < 23 ? earliestTime : '7:30AM',
            'selectOnBlur': true,
            'step': 15
        }
    );

    time.timepicker('setTime', hours < 6 || hours > 22 ? '7:00PM' : earliestTime);

    return earliestTime;
};

submit = () => {
    let time = document.getElementById('time').value;

    alert(time);
};

//high level AEM versioning what have you worked on
/*
convo with vp
 */













