
const usersController = require('../Controller/user.controller');
const { body } = require('express-validator');
const authenticationHandler = require('../middelwares/authentication.middelware');
const { loginValidation, registerValidation } = require('../middelwares/users-validation.middelware');

const router = require('express').Router();


router.post('/register',  registerValidation, usersController.register);
router.post('/login', loginValidation, usersController.login);
router.get('/user',  usersController.getLoggedInUser);
router.get('/logout',  usersController.logout);

router.get('/dashboard', authenticationHandler, usersController.getDashboardStatistics);

module.exports = router