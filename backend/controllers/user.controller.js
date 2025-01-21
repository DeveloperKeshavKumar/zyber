const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistTokens.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { fullname, email, password } = req.body;

   const existingUser = await userModel.findOne({ email });
   if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
   }

   const hashedPassword = await userModel.hashPassword(password);
   const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
   });
   const userObj = user.toObject();
   delete userObj.__v;
   delete userObj._id;
   delete userObj.password;

   const token = user.generateAuthToken();

   res.cookie('token', token, { httpOnly: true });

   res.status(201).json({ token, user: userObj });
}

module.exports.loginUser = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { email, password } = req.body;

   const user = await userModel.findOne({ email }).select('+password');
   if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
   }

   const isMatch = await user.comparePassword(password);
   if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
   }

   const userObj = user.toObject();
   delete userObj.__v;
   delete userObj._id;
   delete userObj.password;

   const token = user.generateAuthToken();

   res.cookie('token', token, { httpOnly: true });

   res.status(200).json({ token, user: userObj });
}

module.exports.getUserProfile = async (req, res) => {
   const user = req.user;
   const userObj = user.toObject();
   delete userObj.__v;
   delete userObj._id;
   delete userObj.password;

   res.status(200).json({ user: userObj });
}

module.exports.logoutUser = async (req, res) => {
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

   await blacklistTokenModel.create({ token });

   res.status(200).json({ message: 'Logged out successfully' });
}