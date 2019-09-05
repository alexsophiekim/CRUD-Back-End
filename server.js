const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config.json');
const Work = require('./models/work');

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@sophiecluster-lhxyp.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/',function(req,res){
    res.send('Welcome! This is our portfolio.');
});

app.post('/add', function(req,res){
  console.log('gottem');
  const workItem = new Work({
    id: mongoose.Types.ObjectId(),
    workName: req.body.workName,
    workAuthor: req.body.workAuthor,
    workImg: req.body.workImg,
    authorURL: req.body.authorURL
  });
    res.send(workItem);
  // workItem.save().then(result => {
  //   res.send(result);
  // }).catch(err => res.send(err));
});

app.get('/view',function(req,res){
  Work.find().then(result => {
    res.send(result);
  })
});

app.delete('/view/:id',function(req,res){
    res.send('Welcome! This is delete endpoint.');
});

app.get('/update',function(req,res){
    res.send('Welcome! This is our Update endpoint.');
});

app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
