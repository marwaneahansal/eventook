const validator = require('../helpers/validation');

createUpdateValidation = (req, res, next) => {
  const validationsRules = {
    'title': 'required|string',
    'country': 'required|string',
    'city': 'required|string',
    'adresse': 'required|string',
    'eventDateStart': 'required|date',
    'eventDateEnd': 'required|date',
    'maxSeats': 'required|integer',
    'description': 'required|string|max:300',
    'standardTicket': 'required|integer',
    'premiumTicket': 'required|integer',
    'vipTicket': 'required|integer',
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

bookingValidation = (req, res, next) => {
  const validationsRules = {
    'eventTicketId': 'required|integer',
    'fullName': 'required|string',
    'email': 'required|email',
    'seats': 'required|integer'
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
  createUpdateValidation,
  bookingValidation
};

