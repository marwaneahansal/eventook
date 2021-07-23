const db = require('../models');
const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');
const path = require("path");
const { Op } = require('sequelize');



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
    let events = [];
    if(req.query.search !== '') {
      events = await Event.findAll(
        {
          where: {
            approved: true,
            title: {
              [Op.like]: `%${req.query.search}%`
            }
          },
          order: [ ['eventDateStart', 'ASC'] ]
        }
      );
    } else {
      events = await Event.findAll({ where: { approved: true }, order: [ ['eventDateStart', 'ASC'] ] });
    }

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


exports.findEventsByRole = async (req, res) => {
  try  {
    let Events;
    if (req.session.user.isAdmin) Events = await Event.findAll({ order: [ ['createdAt', 'DESC' ] ] });

    else Events = await Event.findAll({ where: { Organizer: req.session.user.uuid }, order: [ ['createdAt', 'DESC' ] ] });

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

    let event = await Event.findByPk(req.params.eventId);

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

    const standardTicket = await EventTickets.findOne({ where: { eventUid: event.uid, name: 'standard' } });
    await standardTicket.update({ price: req.body.standardTicket });

    const premiumTicket = await EventTickets.findOne({ where: { eventUid: event.uid, name: 'premium' } });
    await premiumTicket.update({ price: req.body.premiumTicket });

    const vipTicket = await EventTickets.findOne({ where: { eventUid: event.uid, name: 'vip' } });
    await vipTicket.update({ price: req.body.vipTicket });

    if(req.file && req.file.fieldname === 'mainImageFile') {
      await event.update({
        mainImage: req.file.filename
      });
    }

    event = await Event.findOne({ where: { uid: req.params.eventId }, include: EventTickets });

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

    const user = req.session.user;

    if(!user.isAdmin) return res.status(401).send({ success: false, message: 'Unauthorized' });


    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    await event.update({ approved: true });

    const events = await Event.findAll();
    res.status(200).send({ success: true, message: "Event approved successully!", events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.bookTicket = async (req, res) => {
  try {

    const event = await Event.findByPk(req.params.eventUid);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    if(new Date(event.eventDateStart).getTime() < new Date().getTime())
      return res.status(200).send({ success: false, message: 'You can\'t book tickets for this event because it\'s passed!' });

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

    if(!event || (!event.approved && (req.session.user.uuid !== event.Organizer && !req.session.user.isAdmin))) return res.status(404);

    res.sendFile(event.mainImage, { root: path.join('app/uploads') });

  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}


exports.getEventBookings = async (req, res) => {
  try {
    let bookings = null;
    const attributes = ['title', 'maxSeats'];
    const include = {
      model: EventBookings,
      attributes: ['fullName', 'email', 'seats', 'price'],
      include: {
        model: EventTickets,
        attributes: ['name', 'price'],
      }
    }

    if(req.session.user.isAdmin) {
      bookings = await Event.findOne({
        where: { uid: req.params.eventUid },
        attributes,
        include
      });
    } else {
      bookings = await Event.findOne({
        where: { uid: req.params.eventUid, Organizer: req.session.user.uuid },
        attributes,
        include
      });
    }

    res.status(200).send({ success: true ,event: bookings });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}


