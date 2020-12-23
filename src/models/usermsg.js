const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
 email: {
  type: String,
  required: true,
  validate(value){
   if(!validator.isEmail(value)){
    throw new Error("invalid email")
   }
  }
 },
 phone: {
  type: Number,
  required: true,
  min: 10
 },
 password: {
  type: String,
  required: true
 }
})

//create collection
const User = mongoose.model("User", userSchema);

module.exports = User;