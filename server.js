const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config.json');

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@sophiecluster-lhxyp.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`);
});

app.get('/',function(req,res){
    res.send('Welcome! This is our portfolio.');
});

app.get('/view',function(req,res){
  // res.send('Welcome! This is Read endpoint.');
  Work.find().then(result => {
    res.send(result);
  })
});

app.delete('/view/:id',function(req,res){
    res.send('Welcome! This is delete endpoint.');
});

app.get('/add',function(req,res){
    // res.send('Welcome! This is our Create endpoint');
  const workItem = new Work({
    id: mongoose.Schema.Types.ObjectId(),
    workName: Stringreq.body.workName,
    workAuthor: Stringreq.body.workAuthor,
    workImg: Stringreq.body.workImg,
    authorURL: Stringreq.body.authorURL
  });

  workItem.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});

app.get('/update',function(req,res){
    res.send('Welcome! This is our Update endpoint.');
});


// Listen to port 3000
app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
