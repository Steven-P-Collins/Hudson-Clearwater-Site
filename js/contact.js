window.onload = () => {
    getData();
    form();
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

const form = () => {
    const form = $('.form'),
        btn = $('.btn');

    form.on('submit', e => {
        e.preventDefault();

        btn.html('Sending...');
        btn.prop('disabled', true);

        const data = {},
            formElements = form.serializeArray();

        formElements.map(input => (data[input.name] = input.value));

        const url = 'https://gpkttqzyf6.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer';

        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(data));

        xhr.onloadend = response => {
            if (response.target.status === 200) {
                formElements.forEach(input => {
                    $('#' + input.name).prop('disabled', true);
                });
                btn.html('Your submission was sent');
            }
            else {
                btn.prop('disabled', false);
                btn.html('Something went wrong, Try again');
            }
        };
    })
};