'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

const sendEmail = (formData, callback) => {
    const emailParams = {
        Source: 'stevencollins2109@gmail.com',
        ReplyToAddresses: [],
        Destination: {
            ToAddresses: ['stevencollins2109@gmail.com'],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: formData.comments + '\n\nName: ' + formData.name
                            + '\nEmail: ' + formData.email,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New Message',
            },
        },
    };

    SES.sendEmail(emailParams, callback);

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
