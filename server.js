const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config.json');
const Work = require('./models/work');

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@sophiecluster-lhxyp.mongodb.net/work?retryWrites=true&w=majority`, {useNewUrlParser: true});
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
  const work = new Work({
    _id: new mongoose.Types.ObjectId(),
    workName: req.body.workName,
    workAuthor: req.body.workAuthor,
    workImg: req.body.workImg,
    authorURL: req.body.authorURL
  });

    res.send(workItem);
});

app.post('/view',function(req,res){
  workItem.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});

app.get('/view',function(req,res){
  work.save().then(result => {
      res.send(result)
  }).catch(err => res.send(err))
});

app.get('/viewAll',function(req,res){
    res.send('Welcome! This is Read endpoint.');
});

app.delete('/view/:id',function(req,res){
    res.send('Welcome! This is delete endpoint.');
});

app.get('/update',function(req,res){
    res.send('Welcome! This is our Update endpoint.');
});


app.post('/users',function(req,res){
  User.findOne({ username:req.body.username}, function(err, result){
    if (result) {
        res.send('Sorry, this is already existed');
    } else {
      const hash = bcrypt.hashSync(req.body.password);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save().then(result => {
        res.send(result)
      }).catch(err => res.send(err))
    }
  })
})

app.post('/getUser', function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username}, function(err, result){
    if (checkUser) {
        if (bcrypt.compareSync(password,checkUser.password)) {
          console.log('password matched');
          res.send(checkUser)
        } else {
          console.log('password does not matched');
          res.send('Invalid password');
        }
    } else {
      res.send('Invalid user')
    }
  })
})

app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
