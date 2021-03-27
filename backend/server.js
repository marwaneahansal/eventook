const express = require('express');
const cors = require('cors');


require('dotenv').config();



const app = express();


let corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models'); 
db.sequelize.sync({ force: true }).then(() => {
  console.log('Re-creating db');
});

// Routes
const userRoutes = require('./app/routes/user.routes');



app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to EVENTOOK API!');
})




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});

