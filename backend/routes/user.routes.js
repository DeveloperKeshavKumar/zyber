const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');

router.post(
   '/register',
   [
      body('email').isEmail().withMessage('Please enter a valid email address'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
   ],
   userController.registerUser
);

router.post(
   '/login',
   [
      body('email').isEmail().withMessage('Please enter a valid email address'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   ],
   userController.loginUser
);

router.get(
   '/profile',
   authenticateUser,
   userController.getUserProfile
);

router.delete(
   '/logout',
   authenticateUser,
   userController.logoutUser
);

module.exports = router;