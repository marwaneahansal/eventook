const db = require('../models');
const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');
const path = require("path");



const Event = db.Event;
const User = db.User;
const EventTickets = db.EventTickets;
const EventBookings = db.EventBookings;

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).send({ success: false, message: 'Validation Error',errors: errors.mapped() });


    const userUuid = req.session.user.uuid;
    const user = await User.findByPk(userUuid);


    if(!user.isEventOrganizer) return res.status(401).send({ success: false, message: 'Unauthorized' });

    const event = {
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      adresse: req.body.city,
      eventDateStart: req.body.eventDateStart,
      eventDateEnd: req.body.eventDateEnd,
      maxSeats: req.body.maxSeats,
      description: req.body.description,
      mainImage: req.file.filename,
      Organizer: user.uuid,
      EventTickets: [
        {
          name: 'standard',
          price: req.body.standardTicket
        },
        {
          name: 'premium',
          price: req.body.premiumTicket
        },
        {
          name: 'vip',
          price: req.body.vipTicket
        }
      ],
    }

    const savedEvent = await Event.create(event, { include: [ EventTickets ] });

    res.status(200).send({ success: true, event: savedEvent, message: 'Event created successfully' });

  } catch(err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.findAll = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { approved: true }});

    res.status(200).send({ success: false, events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};

exports.findLatestThree = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { approved: true }, limit: 3, order: [ ['eventDateStart', 'ASC']]});

    res.status(200).send({ success: true, events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.findOne = async (req, res) => {
  try {
    const event = await Event.findOne({ where: { uid: req.params.eventId }, include: EventTickets });

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    if(!event.approved) {
      if(req.session.user && req.session.user.uuid !== event.Organizer) return res.status(404).send({ success: false, message: 'Event not found!' });

      if(!req.session.user) return res.status(404).send({ success: false, message: 'Event not found!' });
    }

    res.status(200).send({ success: true, event });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.findOrganizerEvents = async (req, res) => {
  try  {
    const { Events } = await User.findOne({ where: { uuid: req.session.user.uuid }, include: Event });

    res.status(200).send({ success: true, Events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.update = async (req, res) => {
  try {
    const userUuid = req.session.user.uuid;
    const user = await User.findByPk(userUuid);

    if(!user.isEventOrganizer) return res.status(401).send({ success: false, message: 'Unauthorized' });

    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    if(event.approved) return res.status(401).send({ success: false, message: "You can't update this event because it's approved!" });

    if(event.Organizer !== userUuid) return res.status(401).send({ success: false, message: "You can't update this event" });

    await event.update({
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      adresse: req.body.adresse,
      eventDateStart: req.body.eventDateStart,
      eventDateEnd: req.body.eventDateEnd,
      description: req.body.description,
      maxSeats: req.body.maxSeats
    });

    if(req.file && req.file.fieldname === 'mainImageFile') {
      await event.update({
        mainImage: req.file.filename
      });
    }

    res.status(200).send({ success: true, message: "Event updated successfully!", event });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.delete = async (req, res) => {
  // delete if not approved
  try {

    const userUuid = req.session.user.uuid;
    const user = await User.findByPk(userUuid);


    if(!user.isEventOrganizer) return res.status(401).send({ success: false, message: 'Unauthorized' });

    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    if(event.approved) return res.status(401).send({ success: false, message: "You can't delete this event because it's approved!" });

    if(event.Organizer !== userUuid) return res.status(401).send({ success: false, message: "You can't delete this event" });

    await Event.destroy({ where: { uid: event.uid } });

    const { Events } = await User.findOne({ where: { uuid: req.session.user.uuid }, include: Event });

    res.status(200).send({ success: true, message: "Event deleted successully!", Events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};



exports.approveEvent = async (req, res) => {

  try {

    let token = req.headers['authorization'];

    if(!token) return res.status(401).send({ success: false, message: 'No token is provided. Try to login again!' });

    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(tokenDecoded.id);

    // !!!!!!!!!!!!!!!!!!!!!!!! //
    //!  Just for simplicity   //
    // !!!!!!!!!!!!!!!!!!!!!! //
    if(user.email !== "admin@admin.com") return res.status(401).send({ success: false, message: 'Unauthorized' });


    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    await event.update({ approved: true });
    res.status(200).send({ success: true, message: "Event approved successully!", event });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.bookTicket = async (req, res) => {
  try {

    const event = await Event.findByPk(req.params.eventUid);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    const eventTicket = await EventTickets.findOne({ where: { id: req.body.eventTicketId ,eventUid: event.uid } });

    if(eventTicket === null) return res.status(404).send({ success: false, message: 'Ticket does not belongs to this event!' });

    const booking = await EventBookings.create(
        {
          fullName: req.body.fullName,
          email: req.body.email,
          eventUid: req.params.eventUid,
          eventTicketId: req.body.eventTicketId,
          seats: req.body.seats,
          // VAT
          price: (eventTicket.price * parseInt(req.body.seats)) + 20
        }
    );

    res.status(200).send(
      {
        success: true,
        booking: {
          fullName: booking.fullName,
          email: booking.email,
          seats: booking.seats,
          price: booking.price,
          title: event.title
        }
      });

  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};

exports.getEventImages = async (req, res) => {
  try {
    const event = await Event.findOne({ where: { uid: req.params.eventUid } });

    if(!event || (!event.approved && req.session.user.uuid !== event.Organizer)) return res.status(404);

    res.sendFile(event.mainImage, { root: path.join('app/uploads') });

  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}



