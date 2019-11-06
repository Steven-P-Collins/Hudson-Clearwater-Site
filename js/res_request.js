window.onload = () => {

    let date = $('#date'),
        dateInfo,
        guests = $('#guests'),
        nextDay = false,
        time = $('#time'),
        today = new Date(),
        resTime = changeTime(time, guests, setTime(time, today)); //Sets default time from todays given date

    if (today.getHours() > 22) {
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        today = tomorrow;
        nextDay = true;
    }

    setDates(date, today, resTime, nextDay);
    minGuests(time, guests);

    getData(); //From Contact page

    date.on('input', e => {
        dateInfo = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        e.target.value = !dateInfo[2] ? dateInfo[1] : dateInfo[1] + '/' +
            dateInfo[2] + (dateInfo[3] ? '/' + dateInfo[3] : '');
    });

    date.change(e => {
        if (!dateChecker(dateInfo, today)) { //Entered date outside of range or bad date
            date.attr('placeholder', 'Invalid Date');//jquery to set placeholder
            e.target.value = '';
        }
        else {
            checkSameDate(date.val().match(/(\d{0,2})(\d{0,2})(\d{0,4})/g), today, resTime, nextDay);
        }
    });

    guests.on('input', e => {
        let numGuests = e.target.value.replace(/\D/g, '').match(/(\d?)(\d?)/);
        e.target.value = numGuests[1] === '0' ? '' : numGuests[0];
    });

    time.on('changeTime', () => {
        minGuests(time, guests);
    });

    // document.getElementsByClassName('form')[0].addEventListener('submit', e => {
        // let formValue = '';
        // $('form').serializeArray().forEach(word => {
        //     formValue += word.value + ' ';
        // });
    // });

};

setDates = (date, today, resTime, nextDay) => {

    date.datepicker({
        'minDate': today,
        'maxDate': '+183d',
        onSelect: () => {
            checkSameDate(date.val().match(/(\d{0,2})(\d{0,2})(\d{0,4})/g), today, resTime, nextDay);
        }
    });

    date.datepicker(
        'setDate', today,
    );
};

changeTime = (domTime, guests, todayTime) => {

    let change = (time) => {
        domTime.timepicker('option', 'minTime', time);
        domTime.timepicker('setTime', todayTime);
        minGuests(domTime, guests)
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
                (hours + 1) + ':30PM' : hours < 6 ? '7:30AM' : (hours + 1) + ':30AM');

    time.timepicker({
            'disableTextInput': true,
            'forceRoundTime': true,
            'maxTime': '11:30PM',
            'minTime': hours < 6 || hours > 22 ? '7:30AM' : earliestTime,
            'selectOnBlur': true,
            'step': 15
        }
    );

    time.timepicker('setTime', hours < 6 || hours > 22 ? '7:00PM' : earliestTime);

    return earliestTime;
};

checkSameDate = (dateTotal, today, resTime, nextDay) => {
    !nextDay && (parseInt(dateTotal[0]) === (today.getMonth() + 1) && parseInt(dateTotal[2]) === today.getDate())
        ? resTime.lateTime()
        : resTime.anyTime();
};

minGuests = (time, guests) => {
    let chosenTime = time.val().match(/(\d{0,2})(\D)(\d{0,2})(\D)/);

    guests.attr('min', (parseInt(chosenTime[1]) > 4 && parseInt(chosenTime[1]) < 12
                        && parseInt(chosenTime[3]) > 15 && chosenTime[4] === 'p')
                            || parseInt(chosenTime[1]) > 5 && parseInt(chosenTime[1]) < 12
                               && chosenTime[4] === 'p'
                                ? '1' : '6');
};

//high level AEM versioning what have you worked on
/*
convo with vp
 */













