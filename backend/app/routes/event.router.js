
const eventsController = require('../Controller/event.controller');
const { body } = require('express-validator');
const authenticationHandler = require('../middelwares/authentication.middelware');
const imageUpload = require('../middelwares/imageUpload.middelware');


let router = require('express').Router();

router.get('/', eventsController.findAll);

router.get('/showcase', eventsController.findLatestThree);

router.get('/:eventId', eventsController.findOne);

router.get('/dashboard/events', authenticationHandler, eventsController.findOrganizerEvents);

router.put('/:eventId', [authenticationHandler, imageUpload.single('mainImageFile')], eventsController.update);

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
  authenticationHandler,
  eventsController.create);

router.delete('/:eventId', authenticationHandler, eventsController.delete);

router.put('/approve/:eventId', authenticationHandler, eventsController.approveEvent);

router.post(
  '/booking/:eventUid',
  body('eventTicketId').isString(),
  body('fullName').isString(),
  body('email').isEmail(),
  body('seats').isInt(),
  eventsController.bookTicket
);

module.exports = router