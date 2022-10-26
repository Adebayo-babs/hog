	
	const express = require('express'),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    session = require('express-session'),
    app = express();
    const passport = require("passport");
    require('./config/passport')(passport); 


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

//BELOW WE CONNECT TO MONGO DATABASE
mongoose.connect("mongodb+srv://Adebayo:welldone@cluster0.kjsnn.mongodb.net/HOG", {useNewUrlParser:true});


//EXPRESS-SESSION MIDDLEWARE
  app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
  }))


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH
app.use(flash());

app.use((req, res, next) => {
  res.locals.message = req.flash('message');
  res.locals.error_msg = req.flash('error_msg');
  next();

})

//WE IMPORT THE ROUTES FILES

app.use('/', require('./routes/admin'));
app.use('/', require('./routes/indexRoute'));

app.listen(process.env.PORT || 5000, function(){
  console.log("Server is running on port 5000")
})