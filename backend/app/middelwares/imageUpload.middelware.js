const fs = require('fs');
const Multer = require('multer');
const path = require('path');

const uplodDir =  path.join(__dirname, '../../../frontend/uploads');

if(!fs.existsSync(uplodDir)) {
  fs.mkdirSync(uplodDir);
}


let storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uplodDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +  file.originalname);
  }
});

let upload =  Multer({
  storage: storage 
});


module.exports = upload;