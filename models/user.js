const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  adminoruser:{
    type: String,
    required: true,
    enum:["admin","user"]
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  ips:{
      type:[String] ,
      required: true 
  },
    macs:{
    type:[String] ,
    required: true 
}
,
 
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id,name:this.name , adminoruser: this.adminoruser }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    adminoruser:Joi.string().min(4).max(50).required(),
    ips:Joi.array().items(Joi.string(), Joi.number()).required(),
    macs:Joi.array().items(Joi.string()).required(),
  };
  console.log( Joi.validate(user, schema));
  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;