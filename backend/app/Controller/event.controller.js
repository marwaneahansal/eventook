const db = require('../models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');



const Event = db.Event;
const User = db.User;

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).send({ success: false, errors: errors.mapped() });


    let token = req.headers['authorization'];

    if(!token) return res.status(401).send({ success: false, message: 'No token is provided. Try to login again!' });

    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(tokenDecoded.id);


    if(!user.eventCreator) return res.status(401).send({ success: false, message: 'Unauthorized' });

    const event = {
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      adresse: req.body.city,
      eventDateStart: req.body.eventDateStart,
      eventDateEnd: req.body.eventDateEnd,
      maxSeats: req.body.maxSeats,
      description: req.body.description,
      coverImage: req.files['coverImage'][0].filename,
      mainImage: req.files['mainImage'][0].filename,
      images: {
        image_1: req.files['images'][0].filename ? req.files['images'][0].filename : null,
        image_2: req.files['images'][1].filename ? req.files['images'][1].filename : null,
        image_3: req.files['images'][2].filename ? req.files['images'][2].filename : null,
        image_4: req.files['images'][3].filename ? req.files['images'][3].filename : null
      },
      UserId: user.id
    }


    const savedEvent = await Event.create(event);

    res.status(200).send({ success: true, event: savedEvent });
  } catch(err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.findAll = async (req, res) => {
  // TODO: pagination
  try {
    const events = await Event.findAll();

    res.status(200).send({ success: false, events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.findOne = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    res.status(200).send({ success: true, event });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.update = async (req, res) => {
  try {
    let token = req.headers['authorization'];

    if(!token) return res.status(401).send({ success: false, message: 'No token is provided. Try to login again!' });

    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(tokenDecoded.id);


    if(!user.eventCreator) return res.status(401).send({ success: false, message: 'Unauthorized' });


    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    if(event.approved || event.UserId !== tokenDecoded.id) return res.status(404).send({ success: false, message: "You can't update this event!" });

    await event.update(req.body);

    res.status(200).send({ success: true, message: "Event updated successully!", event });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


exports.delete = async (req, res) => {
  // delete if not approved
  try {

    let token = req.headers['authorization'];

    if(!token) return res.status(401).send({ success: false, message: 'No token is provided. Try to login again!' });

    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(tokenDecoded.id);


    if(!user.eventCreator) return res.status(401).send({ success: false, message: 'Unauthorized' });


    const event = await Event.findByPk(req.params.eventId);

    if(event === null) return res.status(404).send({ success: false, message: 'Event not found!' });

    if(event.approved || event.UserId !== tokenDecoded.id) return res.status(404).send({ success: false, message: "You can't delete this event!" });

    await Event.destroy({ where: { id: event.id } });

    res.status(200).send({ success: true, message: "Event deleted successully!" });
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


exports.findAllApproved = async (req, res) => {
  // TODO: pagination
  try {
    const events = await Event.findAll({ where: { approved: true }});

    res.status(200).send({ success: true, events });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
};


