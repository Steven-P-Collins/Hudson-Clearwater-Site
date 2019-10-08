window.onload = () => {

    document.getElementById('date').addEventListener('input', e => {
        let date = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        e.target.value = !date[2] ? date[1] : date[1] + '/' + date[2] + (date[3] ? '/' + date[3] : '');
    });

    document.getElementById('guests').addEventListener('input', e => {
        let guests = e.target.value.replace(/\Dg/, '').match(/(\d?)(\d?)/);
        e.target.value = guests[1] === '0' ? '' : guests[0];
    });

    document.getElementById('phone').addEventListener('input', e => {
        let phone = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] + (phone[3] ? '-' + phone[3] : '');
    });


    $('#time').timepicker({
        'disableTextInput': true,
        'forceRoundTime': true,
        'maxTime': '11:30PM',
        'minTime': '7:30AM',
        'selectOnBlur': true,
        'step': 15,
        }
    );

    $('#date').datepicker({
        'minDate': new Date()
    });

    setDates();

};

setDates = () => {
    let today = new Date();

    if (today.getHours() < 7 || (today.getHours() === 7 && today.getMinutes() < 30)) {
        $('#time').timepicker(
            'setTime', 500000 //7:00pm default
        )
    }
    else {
        $('#time').timepicker(
            'setTime', today
        );
    }

    $('#date').datepicker(
        'setDate', today
    );

};