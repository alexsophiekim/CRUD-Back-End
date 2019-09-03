const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config.json');

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:<${config.MONGO_PASSWORD}>@sophiecluster-lhxyp.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`);
});


// Listen to port 3000
app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`);
});
