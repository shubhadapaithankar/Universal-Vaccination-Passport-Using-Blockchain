//const connection = require("../config/db")
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../model/user");
const {UserAuth} = require("../services/user")
const router = express.Router();
const axios = require('axios');

// const passport = require('passport')
// require('../config/mongo/passport')

genToken = user => {
  return jwt.sign({
    iss: 'TOP_SECRET',
    sub: user.id,
    email: user.email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'TOP_SECRET');
}
const OPENAI_API_KEY = "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";  
                  
router.post("/register", async (req, res) =>
{
  const data = req.body;
  const response={}
  try{
      const result = await UserAuth.registerUser(data);          

      if(result){
          response.success = true;
          response.user = result;
          response.status = "200";
          res.status(200).send(response);
      }else{
          response.success = false;
          response.error = "Registeration not successful";
          response.status = "400";
          res.status(400).send(response);
      }
  }catch(e){
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
  }

})

router.post("/login", async (req, res) =>
{
  const data = req.body;
  const response={}
  try{
      const result = await UserAuth.loginUser(data);          

      if(result){
          response.success = true;
          response.user = result;
          response.status = "200";
          res.status(200).send(response);
      }else{
          response.success = false;
          response.error = "Incorrect Username or Password";
          response.status = "400";
          res.status(400).send(response);
      }
  }catch(e){
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
  }
})

router.post("/logout", async (req, res) =>
{
  const response={}
  try{
        var authorization = req.headers.authorization.split(' ')[1],
        decoded;
        decoded = jwt.verify(authorization, 'TOP_SECRET');       
        const result = await UserAuth.logoutUser(decoded);  
        //console.log(result)
      if(result){
          response.success = true;
          response.user = "User Logged out";
          response.status = "200";
          res.status(200).send(response);
      }else{
          response.success = false;
          response.error = "User cannot be logged out";
          response.status = "400";
          res.status(400).send(response);
      }
  }catch(e){
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
  }
})


router.get("/getAllUsers", async (req, res) => {
    const response = {};
    try {
      const users = await UserAuth.getAllUsersExceptAdmin();
      response.success = true;
      response.users = users;
      response.status = "200";
      res.status(200).send(response);
    } catch (e) {
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
    }
  });
  

  router.put("/toggle-active/:userEmail", async (req, res) => {
    const { userEmail } = req.params;
    const response = {};
    try {
      const result = await UserAuth.toggleActiveStatus(userEmail);
      if (result) {
        response.success = true;
        response.message = "User status updated successfully";
        response.status = "200";
        res.status(200).send(response);
      } else {
        response.success = false;
        response.error = "User status could not be updated";
        response.status = "400";
        res.status(400).send(response);
      }
    } catch (e) {
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
    }
  });

  router.get("/active-status/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const status = await UserAuth.getUserActiveStatus(email);
        if (status === null) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.json({ success: true, isActive: status.isActive });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: "An error occurred while fetching the user's active status" });
    }
});

  router.post('/summarize_rules', async (req, res) => {
    const user_input = req.body.user_input;

    try {
        // Framing the prompt
        const prompt = `As an assistant knowledgeable about COVID-19 vaccinations and the use of blockchain technology for securing vaccination records, please provide a detailed response to the following query: ${user_input}`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", 
            messages: [
                {"role": "system", "content": "You are an assistant with expertise in COVID-19 vaccinations and blockchain technology for enhancing the security and verifiability of vaccination records."},
                {"role": "user", "content": prompt}
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const rules = extractRules(response.data.choices[0].message.content);
        res.json({ rules });
    } catch (error) {
        console.error('Error calling GPT-3:', error);
        if (error.response) {
            // Log detailed API response errors
            console.error('Response:', error.response.data);
        }
        res.status(500).send('Error processing your request');
    }
});

function extractRules(response) {
    return response.split('\n').filter(rule => rule.trim()).map(rule => rule.trim());
}

module.exports = router