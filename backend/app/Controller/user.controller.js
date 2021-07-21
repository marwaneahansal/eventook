const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const { validationResult } = require('express-validator');


const User = db.User;
const Event = db.Event;
const EventBookings = db.EventBookings;

// Register a new user
exports.register = async (req, res) => {

  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({ success: false, errors: errors.mapped() });



    const tempUser = await User.findOne({ where: { email: req.body.email }});

    if(tempUser !== null) return res.status(200).send({ success: false, message: "Email already in use!" });


    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isEventOrganizer: user.isEventOrganizer,
      isAdmin: user.isAdmin
    }
    const role = req.session.user.isEventOrganizer ? 'eventOrganizer' : req.session.user.isAdmin ? 'admin': null;


    const savedUser = await User.create(user);

    res.status(200).send({
      success: true,
      user: {name: savedUser.name, email: savedUser.email, 	role },
    });
  } catch(err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }

}


exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).send({ success: false, errors: errors.mapped() });

    const user = await User.findOne({ where: { email: req.body.email }});

    if(user === null) return res.status(200).send({ success: false, message: "Email OR password wrong!"});


    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) return res.status(200).send({ success: false, message: "Email OR password wrong!"});

    if(!user.isEventOrganizer && !user.isAdmin) return res.status(200).send({ success: false, message: "Login is for events organizers for now!"});

    req.session.user = { uuid: user.uuid, email: user.email, name: user.name, isEventOrganizer: user.isEventOrganizer, isAdmin: user.isAdmin };
    const role = req.session.user.isEventOrganizer ? 'eventOrganizer' : req.session.user.isAdmin ? 'admin': null;

    res.status(200).send({ success: true, user: {name: user.name, email: user.email, role }});

  } catch(err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}


exports.getLoggedInUser = (req, res) => {
  if(req.session.user && req.cookies.user_sid) {
    const user = req.session.user;
    const role = req.session.user.isEventOrganizer ? 'eventOrganizer' : req.session.user.isAdmin ? 'admin': null;
    res.status(200).send({ success: true, user: { uuid: user.uuid, email: user.email, name: user.name, role }});
  } else {
    res.status(200).send({ success: false, user: null });
  }
}

exports.logout = (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.status(200).send({ success: true });
  } else {
    res.status(401).send({ success: false, message: 'Unauthorized' });
  }
}

exports.getDashboardStatistics = async (req, res) => {
  try {
    const eventsApprovedCount = await Event.count({ where: { Organizer: req.session.user.uuid, approved: true }});
    const eventsNotApprovedCount = await Event.count({ where: { Organizer: req.session.user.uuid, approved: false }});
    const ticketsBooked = await EventBookings.sum('seats',{ include: {
      model: Event,
      where: {
        Organizer: req.session.user.uuid,
        approved: true
      }
    }});
    const totalEvents = eventsApprovedCount + eventsNotApprovedCount;

    const lastEvents = await Event.findAll(
      {
        where: { Organizer: req.session.user.uuid, approved: true },
        order: [ ['eventDateStart', 'ASC' ] ],
        attributes: ['title'],
        include: {
          model: EventBookings,
          attributes: ['seats']
        }
      }
    );

    res.status(200).send({ success: true, statistics: { eventsApprovedCount, eventsNotApprovedCount, ticketsBooked, totalEvents, lastEvents } });
  } catch (err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}