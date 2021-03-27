const db = require('../models');
const User = db.users;

// Register a new user
exports.create = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }


  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ooops, some error occured. Please try again!"
      })
    })

};