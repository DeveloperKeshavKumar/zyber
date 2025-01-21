const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const userController = require('../controllers/user.controller');

// router.get('/', userController.getAllUsers);
router.post(
   '/register',
   [
      body('email').isEmail().withMessage('Please enter a valid email address'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
   ],
   userController.registerUser);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;