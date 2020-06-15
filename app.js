var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const crypto = require('crypto');
var logger = require('morgan');
const port = 3200;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var registreRouter = require('./routes/register');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.bodyParser({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// rendering file
// get routers
app.get('/home', (req, res)=>{
  res.render('home', {title: 'Home page'})
})
app.get('/login', function(req, res){
  res.render('login', {title: 'Login page'});
})
app.get('/register', function(req, res){
  res.render('register', {title: 'Register page'});
})
app.get('/courses', function(req, res){
  res.render('courses', {title: 'Courses  page'});
})
app.get('/staff', function(req, res){
  res.render('staff', {title: 'Staff  page'});
})


// authentication register

const getHashedPassword = (password)=>{
  var sha256 = crypto.createHash('sha256');
  var hash = sha256.update(password).digest('base64');
  return hash;
}
const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

const users = [
  // This user is added to the array to avoid creating a new user on each restart
  {
      name: 'John',
      age: 'Doe',
      email: 'johndoe@email.com',
      // This is the SHA256 hash for value of `password`
      password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
  }
];

app.post('/register', (req, res) => {
  const { name, email, age, password } = req.body;

  // Check if the password and confirm password fields match
  if (password === Password) {

      // Check if user with the same email is also registered
      if (users.find(user => user.email === email)) {

          res.render('register', {
              message: 'User already registered.',
              messageClass: 'alert-danger'
          });

          return;
      }

      const hashedPassword = getHashedPassword(password);

      // Store user into the database if you are using one
      users.push({
          name,
          age,
          email,
          password: hashedPassword
      });

      res.render('login', {
          message: 'Registration Complete. Please login to continue.',
          messageClass: 'alert-success'
      });
  } else {
      res.render('register', {
          message: 'Password does not match.',
          messageClass: 'alert-danger'
      });
  }
});


// authentification login

app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies['AuthToken'];

  // Inject the user to the request
  req.user = authTokens[authToken];

  next();
});

app.get('/protected', (req, res) => {
  if (req.user) {
      res.render('protected');
  } else {
      res.render('login', {
          message: 'Please login to continue',
          messageClass: 'alert-danger'
      });
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port);
console.log(`Your app is loading on localhost:${port}`);
module.exports = app;
