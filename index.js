const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.route.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node API Server with Express!');
});

mongoose.connect("mongodb+srv://abdulmuiz5086:uFO4HyH9nA9t92ys@medrepcrm.tnn0r.mongodb.net/crmDatabase?retryWrites=true&w=majority&appName=MedRepCRM")
.then(() => {
    console.log('MongoDB connected successfully')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });
})
.catch((err) => {
    console.log('MongoDB connection error:', err)
});