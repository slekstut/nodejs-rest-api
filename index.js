const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
 console.log(error);
 const status = error.statusCode || 500;
 const message = error.message;
 res.status(status).json({ message: message });
});

// mongoose.connect('process.env.CONNECT_STRING')
mongoose.connect('mongodb+srv://slekstut:password000%21@cluster0.kzkvm.mongodb.net/messages?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true } )
.then(result => {
 app.listen(8080);
})
.catch(err => console.log(err));