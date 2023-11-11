const  mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
  username:{
    type: String,
    default:null,
  },
  isActive: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
module.exports = mongoose.model('User',UserSchema)