const AWS = require('aws-sdk');

const https = require('https');



function postRequest(body) {
  console.log("Body: " + body)
  const options = {
    hostname: 'localhost',
    path: '/vaccination/record',
    method: 'POST',
    // port: 443, // 👈️ replace with 80 for HTTP requests
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });

    // 👇️ write the body to the Request object
    req.write(body);
    req.end();
  });
}


/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const payload = JSON.stringify(event, null, 2);

  console.log("payload: " + payload);


  try {
    const result = await postRequest(payload);
    console.log('result is: 👉️', result);

    // 👇️️ response structure assume you use proxy integration with API gateway
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log('Error is: 👉️', error);
    return {
      statusCode: 400,
      body: error.message,
    };
  }

};

