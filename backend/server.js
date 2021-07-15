const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


require('dotenv').config();



const app = express();


let corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
  })
);


// remove cookie if session is not valid
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});


const imageUpload = require('./app/middelwares/imageUpload.middelware');

// Routes
const userRoutes = require('./app/routes/user.routes');
const eventRoutes = require('./app/routes/event.router');


app.use('/api/users', userRoutes);

const cpUpload = imageUpload.fields([{ name: 'coverImage', maxCount: 1}, { name: 'mainImage', maxCount: 1}, { name: 'images', maxCount: 4}]);
app.use('/api/events', cpUpload, eventRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to EVENTOOK API!');
})




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});

