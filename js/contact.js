window.onload = () => {

    document.getElementById('date').addEventListener('input', e => {
        let date = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        e.target.value = !date[2] ? date[1] : date[1] + '/' + date[2] + (date[3] ? '/' + date[3] : '');

    });

    document.getElementById('time').addEventListener('input', e => {
       let time = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
       e.target.value = !time[2] ? time[1] : time[1] + ':' + time[2];

       // if (!time[2]) {
       //     e.target.value = time[1];
       // }
       // else if (time[1] === '1' && time[2][0] <= 2 && time[2][1] <= 5) {
       //     console.log(time[3]);
       //     e.target.value = time[1] + time[2][0] + ':' + time[2][1] + time[3];
       // }
       // else if (time[1] && time[2][0] <= 5 && time[2][1] <= 5) {
       //     console.log('uhh');
       //     e.target.value = time[1] + ':' + time[2];
       // }
       // else if (time[1] === '1' && time[2][0] <= 2 && time[2][1] > 5) {
       //     console.log('in');
       //     time[2][1] = '';
       // }


    });

    document.getElementById('guests').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\Dg/, '').match(/\d{0,2}/);
    });

    document.getElementById('phone').addEventListener('input', e => {
        let phone = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] + (phone[3] ? '-' + phone[3] : '');
    });

};