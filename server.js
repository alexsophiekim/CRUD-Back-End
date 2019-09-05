const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config.json');
const Work = require('./models/work');
const User = require('./models/users');

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
  console.log('working');
  const work = new Work({
    _id: new mongoose.Types.ObjectId(),
    workName: req.body.workName,
    workAuthor: req.body.workAuthor,
    workImg: req.body.workImg,
    authorURL: req.body.authorURL
  });

  work.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});


app.get('/view',function(req,res){
  Work.find().then(result => {
    res.send(result);
  })
});

app.delete('/view/:workName',function(req,res){
  const workName = req.params.workName;
  Work.findById(id, function(err, product){
      if(work['workName'] == req.body.workName){
          Work.deleteOne({ _id: id }, function (err) {
              res.send('deleted');
          });
      } else {
          res.send('401');
      }
  }).catch(err => res.send('cannot find product with that id'));
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

app.get('/getUser', function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username}, function(err, checkUser){
    if (checkUser) {
        if (bcrypt.compareSync(req.body.password,checkUser.password)) {
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
