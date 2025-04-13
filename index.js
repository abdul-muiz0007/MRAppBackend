const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.route.js');
const povsRoutes = require('./routes/povs.route.js');
const territoriesRoutes = require('./routes/territories.route.js');
const org = require('./routes/organisation.route.js');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true // if you're using cookies/auth headers
  }));

app.use('/api/users', userRoutes);
app.use('/api/povs', povsRoutes);
app.use('/api/territories', territoriesRoutes);
app.use('/api/org', org);

app.get('/', (req, res) => {
    res.send('Hello from Node API Server with Express!');
});

mongoose.connect("mongodb+srv://hashmisathnara7:gMmEl5jtHboXwHso@medrepcrm.tnn0r.mongodb.net/crmDatabase?retryWrites=true&w=majority&appName=MedRepCRM")
.then(() => {
    console.log('MongoDB connected successfully')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });
})
.catch((err) => {
    console.log('MongoDB connection error:', err)
});