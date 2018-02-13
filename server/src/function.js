const AWS = require('aws-sdk');
const gm = require('gm');

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: '200',
    body: JSON.stringify({ 'message': 'hello world' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
