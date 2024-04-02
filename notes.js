//customers should be a protected route 
//for one to login account first
//anyone can view the homepage but once clicked the get started link has to have an account.
//inventory should be protected and can only be viewed by logged in user and admin and the salonist should be the ones responsible for updating it (ie if product is empty update and on arrival update )
//onclixk appointment ,system should chek if user is logged in and has an account to give the session 
//a favicon picture
//th home page shoul have info and images
//the customers should be accessed by individual persons and they can book thier appointments and see whats suites them without seeing what other customers are seein ie)personalized styles form cookies of whatthey like to view and search for
//once a user clicks login and doesn't have an account ,they should be redirected to sign up and create a new account if it doesnt exist and if it exists they are directed back to the login account 
//generate ll the routes ,session managers and protected routes and anything that will make this system work efficiently in the server,js and in the appointments.ejs,home.ejs,inventory.ejs,customers.ejs and login and signup routesconst express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/salon-cosmetic-db');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/inventory');
  } else {
    res.render('homepage');
  }
});

app.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/inventory');
  } else {
    res.render('login');
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/inventory',
  failureRedirect: '/login'
}));

app.get('/sign-up', (req, res) => {
  if (req.user) {
    res.redirect('/inventory');
  } else {
    res.render('sign-up');
  }
});

app.post('/sign-up', (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false
  });
  user.save((err) => {
    if (err) {
      return res.status(500).send('There was an error creating the user.');
    }
    res.redirect('/login');
  });
});

app.get('/inventory', (req, res) => {
  if (req.user && req.user.isAdmin) {
    res.render('inventory');
  } else {
    res.redirect('/');
  }
});

app.post('/inventory', (req, res) => {
  if (req.user && req.user.isAdmin) {
    // Update the inventory
    res.redirect('/inventory');
  } else {
    res.redirect('/');
  }
});

app.get('/customers', (req, res) => {
  if (req.user && req.user.isAdmin) {
    res.render('customers');
  } else {
    res.redirect('/');
  }
});

app.get('/appointment', (req, res) => {
  if (req.user && req.user.isAdmin) {
    res.redirect('/inventory');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});pema 
