// module.exports = app => {
//   const usersController = require('../Controller/user.controller');

//   let router = require('express').Router();


//   router.post('/',  usersController.create);

//   app.use('/api/users', router)
// }


const usersController = require('../Controller/user.controller');

let router = require('express').Router();


router.post('/',  usersController.create);


module.exports = router