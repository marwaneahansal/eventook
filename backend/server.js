const express = require('express');
const { Sequelize } = require('./app/models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelizeSession = new Sequelize(process.env.SESSIONS_DATABASE, process.env.SESSIONS_DB_USER, process.env.SESSIONS_DB_PASSWORD, {
  host: process.env.SESSIONS_DB_HOST,
  dialect: process.env.SESSIONS_DB_DIALECT,
});

require('dotenv').config();

const app = express();


let corsOptions = {
  origin: process.env.FRONTEND_URL,
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
    store: new SequelizeStore({
      db: sequelizeSession,
    }),
    cookie: {
      expires: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV == 'production'
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

// Routes
const userRoutes = require('./app/routes/user.routes');
const eventRoutes = require('./app/routes/event.router');


app.use('/api/users', userRoutes);

app.use('/api/events', eventRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to EVENTOOK API!');
})




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});

