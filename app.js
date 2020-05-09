var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/URLShortener',{ useNewUrlParser: true },function(){
    console.log('connected to mongodb');
});


var routes = require('./routes/dashboard');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname , 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized:true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.user = req.user || null;
    next();
})

app.use('/', routes);
app.use('/users', users);
app.get('/', function(req, res){
    res.render('index');
});


// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    console.log(db);
  
    db.collection('clicks').save(click, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log('click added to db');
      res.sendStatus(201);
    });
  });
  
  // get the click data from the database
  app.get('/clicks', (req, res) => {
    db.collection('clicks').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });









app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), function(){
    console.log('Server listening on port ' +app.get('port'));
});
