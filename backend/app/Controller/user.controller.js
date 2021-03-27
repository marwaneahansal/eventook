const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const { validationResult } = require('express-validator');


const User = db.users;

// Register a new user
exports.register = async (req, res) => {
  
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).send({ success: false, errors: errors.mapped() });
    

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }

    
    const savedUser = await User.create(user);

    let token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: 60*60*1000*24 });

    res.status(200).send({ 
      success: true,
      user: {name: savedUser.name, email: savedUser.email },
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

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*1000*24 });

    res.status(200).send({ success: true, user: {name: user.name, email: user.email }, token});

  } catch(err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}


exports.getLoggedInUser = async (req, res) => {

  try {
    let token = req.headers['authorization'];
    
    if(!token) return res.status(401).send({ success: false, message: 'No token is provided. Try to login again!' });
  
    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);


    const {id, name, email} = await User.findByPk(tokenDecoded.id);


    res.status(200).send({ success: true, user: {id, name, email}});

  } catch(err) {
    res.status(500).send({success: false, message: err.message || "Ooops, some error occured. Please try again!"});
  }
}