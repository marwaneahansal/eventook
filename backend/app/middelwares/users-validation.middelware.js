const validator = require('../helpers/validation');
registerValidation = (req, res, next) => {
  const validationsRules = {
    'email': 'required|string',
    'name': 'required|string',
    'password': 'required|min:6'
  }

  validator(req.body, validationsRules, {}, (err, status) => {
    if(!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation Error',
        errors: err.errors
      });
    }
    next();
  })
}

loginValidation = (req, res, next) => {
  const validationsRules = {
    'email': 'required|email',
    'password': 'required|min:6'
  }

  validator(req.body, validationsRules, {}, (err, status) => {
    if(!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation Error',
        errors: err.errors
      });
    }
    next();
  })
}

module.exports = {
  registerValidation,
  loginValidation
};

