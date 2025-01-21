const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistTokens.model');

module.exports.authenticateUser = async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
   if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
   }

   const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
   if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id);

      req.user = user;

      return next();
   } catch (error) {
      return res.status(401).json({ message: 'Unauthorized. Try again later' });
   }
}