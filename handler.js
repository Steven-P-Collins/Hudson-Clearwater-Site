'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

const sendEmail = (formData, callback) => {
    const emailParams = {
        Source: 'stevencollins2109@gmail.com',
        ReplyToAddresses: [formData.email],
        Destination: {
            ToAddresses: ['stevencollins2109@gmail.com'],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: parseData(formData),
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: formData.date ? 'Reservation Request' : 'Contact Us Request',
            },
        },
    };

    SES.sendEmail(emailParams, callback);

};

const parseData = formData => {
    return formData.date
            ? formData.name + ' ' + formData.date + ' '
            + formData.time + ' ' + formData.guests + ' '
            + formData.phone + ' ' + formData.email + '\n'
            + (formData.pdr
                ? 'We are interested in booking the PDR. \n'
                : '')
            + (formData.comments
                ? 'Comments: ' + formData.comments
                : '')
            : 'Hello HCW, \n\n' + formData.comments + '\n\n'
            + 'Best, \n' + formData.name + '\n'
            + formData.phone + '\n' + formData.email + '\n';
};

module.exports.siteMailer = (event, context, callback) => {
    const formData = JSON.parse(event.body);

    sendEmail(formData, function(err, data) {
        const response = {
            statusCode: err ? 500 : 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://steven-p-collins.github.io',
            },
            body: JSON.stringify({
                message: err ? err.message : data,
            }),
        };
        callback(null, response);
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
