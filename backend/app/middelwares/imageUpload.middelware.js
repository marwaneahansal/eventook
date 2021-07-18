const fs = require('fs');
const Multer = require('multer');
const path = require('path');

const uplodDir =  path.join(__dirname, '../../../frontend/uploads');

if(!fs.existsSync(uplodDir)) {
  fs.mkdirSync(uplodDir);
}

const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

let storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uplodDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +  file.originalname);
  },
});

let upload =  Multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(!mimeTypes.includes(file.mimetype)) return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));

    cb(null, true);
  }
});


module.exports = upload;