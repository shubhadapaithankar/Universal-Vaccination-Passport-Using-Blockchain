# Universal-Vaccination-Passport-Using-Blockchain
Universal Vaccination Passport Using Blockchain

![Untitled presentation](https://github.com/shubhadapaithankar/Universal-Vaccination-Passport-Using-Blockchain/assets/99461999/b82a4e16-0c69-49f8-ba65-b3537a8c0321)

## Required installation before starting the app.

1. Install Blockchain  `https://trufflesuite.com/ganache/`
2. Install ` https://www.postman.com/downloads/`
3. Install for network tunneling `https://ngrok.com/download` 

Create an account and follow the necessary steps for setup `https://dashboard.ngrok.com/get-started/setup`

4. run server on 3000 port ` ngrok http 3000`


## clone the repo 
1. Start backend `cd backend`  `npm install` 'npm start`
2. Start front end `cd frontend` 'npm install` 'npm start`
3. start blockchain 

```
npm install -g truffle

 truffle complile
  truffle migrate 
  
  ```


## If you want to access the QR code or if you want to access the application on web

Step:
1. create lambda function on aws (code is given in code secrion) , use ngrock url in host section
2. In application side change localhost to the ngrock url
