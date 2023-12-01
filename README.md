# Universal Vaccination Passport Using Blockchain

<a href="https://shubhadasanjaypait.wixsite.com/my-site-5" target="_blank">Live Demo </a>

A secure, blockchain-based digital solution for managing and verifying vaccination records, featuring AI-enhanced user support and a scalable serverless architecture.
 

![Untitled presentation](https://github.com/shubhadapaithankar/Universal-Vaccination-Passport-Using-Blockchain/assets/99461999/b82a4e16-0c69-49f8-ba65-b3537a8c0321)

## Required installation before starting the app.

1. Install Blockchain:  `https://trufflesuite.com/ganache/`
2. Install Postman ` https://www.postman.com/downloads/`
3. For network tunneling, install `https://ngrok.com/download` 

  Create an account and follow the necessary steps for setup: `https://dashboard.ngrok.com/get-started/setup`

4. Run server on 3000 port ` ngrok http 3000`

## How to start the application
1. clone the repo ` # git clone git@github.com:shubhadapaithankar/Universal-Vaccination-Passport-Using-Blockchain.git `
2. To start the backend `cd backend`--> `npm install`--> `npm start`
3. To start frontend `cd frontend`-->`npm install`-->`npm start`
4. To start the blockchain, run the following commands:
```
# npm install -g truffle
# truffle complile
# truffle migrate  
  ```


## If you want to access the QR code or if you want to access the application on the web

Steps:
1. create lambda function on AWS (code is given in code section); use ngrock URL in the host section
2. On the application side, change localhost to the ngrock URL

## Flow diagram
![image](https://github.com/shubhadapaithankar/Universal-Vaccination-Passport-Using-Blockchain/assets/87613567/f9346160-02a3-4090-9f62-61439b65909c)

## Team Members:

1. Phillip Nguyen <a href="https://www.linkedin.com/in/philliphnguyen1997/" target="_blank">LinkedIn</a>
2. Sai Manasa Yadlapalli <a href="https://www.linkedin.com/in/saimanasayadlapalli/" target="_blank">LinkedIn</a>
3. Shubhada Sanjay Paithankar <a href="https://www.linkedin.com/in/spaithankar/" target="_blank">LinkedIn</a>
4. Sri Ram Chinta <a href="https://www.linkedin.com/in/sriram-chinta/" target="_blank">LinkedIn</a>
