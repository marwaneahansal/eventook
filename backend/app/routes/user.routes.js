
const usersController = require('../Controller/user.controller');
const { body } = require('express-validator');

let router = require('express').Router();


router.post('/register', body('email').isEmail(), body('name').isString(), body('password').isLength({ min: 6 }) ,usersController.register);
router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), usersController.login);
router.get('/user',  usersController.getLoggedInUser);

// !!!!!!!!!!!!!!!!!!!!!!!! //
//!  Just for simplicity   //
// !!!!!!!!!!!!!!!!!!!!!! //
router.post('/admin',  usersController.createAdmin);


module.exports = router