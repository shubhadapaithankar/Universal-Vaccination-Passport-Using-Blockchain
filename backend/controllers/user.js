//const connection = require("../config/db")
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../model/user");
const {UserAuth} = require("../services/user")
const router = express.Router();
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
  


module.exports = router