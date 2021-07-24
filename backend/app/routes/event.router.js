
const eventsController = require('../Controller/event.controller');
const authenticationHandler = require('../middelwares/authentication.middelware');
const imageUpload = require('../middelwares/imageUpload.middelware');
const { createUpdateValidation, bookingValidation } = require('../middelwares/events-validation.middelware');


let router = require('express').Router();

router.get('/', eventsController.findAll);

router.get('/showcase', eventsController.findLatestThree);

router.get('/:eventId', eventsController.findOne);

router.get('/dashboard/events', authenticationHandler, eventsController.findEventsByRole);

router.put(
  '/:eventId',
  [authenticationHandler, imageUpload.single('mainImageFile'), createUpdateValidation],
  eventsController.update
);

router.post(
  '/',
  [authenticationHandler, imageUpload.single('mainImageFile'), createUpdateValidation],
  eventsController.create);

router.delete('/:eventId', authenticationHandler, eventsController.delete);

router.put('/approve/:eventId', authenticationHandler, eventsController.approveEvent);

router.post(
  '/booking/:eventUid',
  bookingValidation,
  eventsController.bookTicket
);

router.get('/images/:eventUid', eventsController.getEventImages);

router.get('/bookings/:eventUid', authenticationHandler,eventsController.getEventBookings);

module.exports = router