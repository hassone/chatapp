const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
console.log('here i am dfdfd'); 




router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
router.post('/', async (req, res) => {
    console.log('here i am '); 
  
  const { error } = validate(req.body); 
  if (error){ console.log(' validation') ; return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ name: req.body.name });
  if (user) {console.log(' User already registered.') ;return res.status(400).send('User already registered.');}
  console.log(req.ipInfo);

  user = new User(_.pick(req.body, ['name', 'password','ips','macs','adminoruser']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name']));
});

module.exports = router; 
