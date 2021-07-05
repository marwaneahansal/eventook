
const eventsController = require('../Controller/event.controller');
const { body } = require('express-validator');


let router = require('express').Router();

router.get('/', eventsController.findAll);

router.get('/showcase', eventsController.findLatestThree);

router.get('/:eventId', eventsController.findOne);


router.put('/:eventId', eventsController.update);


router.post(
  '/',
  body('title').isString(),
  body('country').isString(),
  body('city').isString(),
  body('adresse').isString(),
  body('eventDateStart').isDate(),
  body('eventDateEnd').isDate(),
  body('maxSeats').isInt(),
  body('description').isString(),
  body('coverImage').isObject(),
  body('mainImage').isObject(),
  body('images').isObject(),
  eventsController.create);


router.delete('/:eventId', eventsController.delete);


router.put('/approve/:eventId', eventsController.approveEvent);







module.exports = router