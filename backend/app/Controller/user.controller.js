const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const { validationResult } = require('express-validator');


const User = db.User;

// Register a new user
exports.register = async (req, res) => {

  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({ success: false, errors: errors.mapped() });



    const tempUser = await User.findOne({ where: { email: req.body.email }});

    if(tempUser !== null) return res.status(400).send({ success: false, message: "Email already in use!" });


    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      eventCreator: req.body.eventCreator
    }


    const savedUser = await User.create(user);

    let token = jwt.sign({ uuid: savedUser.uuid }, process.env.JWT_SECRET, { expiresIn: 60*60*1000*24 });

    res.status(200).send({
      success: true,
      user: {name: savedUser.name, email: savedUser.email, eventCreator: savedUser.eventCreator },
      token
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

    if(user === null) return res.status(400).send({ success: false, message: "Email OR password wrong!"});


    let isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) return res.status(400).send({ success: false, message: "Email OR password wrong!"});

    let token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET, { expiresIn: 60*60*1000*24 });

    res.status(200).send({ success: true, user: {name: user.name, email: user.email, eventCreator: user.eventCreator }, token});

  } catch(err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}


exports.getLoggedInUser = async (req, res) => {

  try {
    let token = req.headers['authorization'];

    if(!token) return res.status(401).send({ success: false, message: 'No token is provided. Try to login again!' });

    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);


    const {id, name, email, eventCreator} = await User.findByPk(tokenDecoded.id);


    res.status(200).send({ success: true, user: {id, name, email, eventCreator}});

  } catch(err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}


exports.createAdmin = async (req, res) => {
  // TODO: Do it with sequelize seeders
  try {
    const user = await User.findOne({ where: { email: "admin@admin.com" }});

    if(user !== null) return res.status(500).send({success: false, message: "Admin Already created!"});

    const admin = {
      name: "Admin",
      email: "admin@admin.com",
      password: await bcrypt.hash("admin", 10),
      eventCreator: true
    }

    const {id, name, email, eventCreator} = await User.create(admin);

    let token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: 60*60*1000*24 });

    res.status(200).send({ success: true, user: {id, name, email, eventCreator }, token});

  } catch (err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}