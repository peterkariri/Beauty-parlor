const express=require('express');
const mysql= require('mysql');
const app = express();
const passport =require('passport')
const bcrypt=require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const session=require('express-session')
const bodyParser = require('body-parser')
const port=3000
//creatin a database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'beauty_palor'
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Database connection established');
  });

app.set("view-engine", "ejs")
//middleware for the app
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret:"chickennuggets",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
//passport configuration
passport.use(new LocalStrategy(
    function(email, password, done) {
      // Check if user exists in database
      if (email && password === 'password') {
        return done(null, { email: email });
      } else {
        return done(null, false);
      }
    }
  ));
passport.serializeUser((user,done)=>{
    done(null,user.email)
})
passport.deserializeUser((id,done)=>{
    //find user in database with id//.....
    done(null,{email:id})
})
//get routes to fetch inventory data from the database 

app.get('/',(req, res)=>{
    
    res.render('home.ejs')
})

//login routes
app.get('/login',(req, res)=>{
    res.render('login.ejs')
})
//signup rout
app.get('/signup',(req, res)=>{
    res.render('signup.ejs')
})
app.get('/about',(req, res)=>{
    res.render('about.ejs')
})
app.get('/customers',(req, res)=>{
    res.render('customers.ejs')
})
app.get('/appointments',(req, res)=>{
    res.render('appointments.ejs')
})
app.get('/inventory',(req, res)=>{
    res.render('inventory.ejs')

})
/* app.get('/nails',(req, res)=>{
    res.render('nails.ejs')

}) */
app.get('/products',(req, res)=>{
    res.render("products.ejs")
})
app.get('/products/product1',(req, res)=>{
    res.render('product1.ejs')
})
app.get('/products/product2',(req, res)=>{
    res.render('product2.ejs')
})

app.get('/products/product3',(req, res)=>{
    res.render('product3.ejs')
})

app.get('/products/product4',(req, res)=>{
    res.render('product4.ejs')
})

app.get('/products/product5',(req, res)=>{
    res.render('product5.ejs')
})

app.get('/products/product6',(req, res)=>{
    res.render('product6.ejs')
})
app.get('/nails',(req, res)=>{
  res.render('product2.ejs')
})

app.get('/booknow',(req, res)=>{
    if (req.isAuthenticated()) {
      // Show book appointment page
      res.render('booknow');
    } else {
      // Redirect to sign-up page
      res.redirect('/signup');
    }
  });


//post routes to get data from user routes

// Login route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/booknow',
    failureRedirect: '/login'
  }));

  app.post('/signup', async (req, res) => {
    // Checking if password and confirm_password match
    if (req.body.password == req.body.confirmpassword) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const query = `INSERT INTO  Users(first_name,last_name, email, password, phone_number) VALUES(?,?,?,?,?)`;
        const userData = [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
          req.body.phone_number
        ];
  
        connection.query(query, userData, (sqlErr) => {
          if (sqlErr) {
            console.log(sqlErr);
            res.send("error please contact the administrator");
          } else {
            // In case of a successful registration
            res.redirect("/login");
          }
        });
      } catch (sqlErr) {
        console.log(sqlErr);
        res.status(403).send("There was an error with your request please try again later");
      }
    } else {
      res.send("Password and confirm password do not match");
    }
  });
// Signup route
/* app.post('/signup', function(req, res) {
    // Create new user in database
    //...
    // Log in new user
    req.login(req.body.fullname,(err) =>{
      if (err) { return next(err); }
      res.redirect('/booknow');
    });
  }); */

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})