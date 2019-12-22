'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

const sendEmail = (formData, callback) => {
    let moment = require('moment-timezone'),
        today = new Date();

    moment(today.getTime()).tz("America/New_York").format("MM-DD-YYYY");

    const emailParams = {
        Source: 'reservations@hudsonclearwater.com',
        ReplyToAddresses: [formData.email],
        Destination: {
            ToAddresses: ['reservations@hudsonclearwater.com'],
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
                Data: formData.date
                    ? 'Rez for ' + formData.name + ', ' + formData.guests + ' guests on ' + formData.date
                    : 'Email from ' + formData.name + ' on ' + (today.getMonth() + 1) + '/' + (today.getDate()) + '/' + today.getFullYear(),
            },
        },
    };

    SES.sendEmail(emailParams, callback);
    //yarn sls deploy -v
};

const parseData = formData => {
    return formData.date
            ? 'Date: ' + formData.date + '\n'
                + 'Time: ' + formData.time + '\n'
                + 'Guests: ' + formData.guests + '\n'
                + 'PDR: ' + (formData.pdr ? 'Yes\n' : 'No\n')
                + 'Comments: ' + (formData.comments ? formData.comments + '\n': 'none\n')
                + 'Name: ' + formData.name + '\n'
                + 'Phone: ' + formData.phone + '\n'
                + 'Email: ' + formData.email
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
                'Access-Control-Allow-Origin': 'http://www.hudsonclearwater.com',
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
