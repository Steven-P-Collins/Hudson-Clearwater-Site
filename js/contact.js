window.onload = () => {
    getData();
};

const getData = () => {
    let phone = $('#phone');

    document.getElementById('name').addEventListener('input', e => {
        e.target.value = e.target.value.replace(/\d/g, '');
    });

    phone.change( e => {
        if (e.target.value.length < 14) {
            phone.attr('placeholder', 'Invalid Number');
            e.target.value = '';
        }
    });

    phone.on('input', e => {
        let phone = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] +
            (phone[3] ? '-' + phone[3] : '');
    });

};
