const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');


var REQUIRED_ENV = "SECRET MONGODB_URI".split(" ");

REQUIRED_ENV.forEach(el => {
    if (!process.env[el]) {
        console.error("Missing required env var " + el);
        process.exit(1);
    }
});

mongoose.connect(process.env.MONGODB_URI);

const User = require('./backend/models').User;

const routes = require('./backend/routes/routes');
const auth = require('./backend/routes/auth');
const app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec((err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        // if there's an error, finish trying to authenticate (auth failed)
        if (err) {
            console.error('Error fetching user in LocalStrategy', err);
            return done(err);
        }
        // if no user present, auth failed
        if (!user) {
            // return done(null, false, { message: 'Incorrect username.' });
            return done(null, false);
        }
        // if passwords do not match, auth failed
        if (user.password !== password) {
            // return done(null, false, { message: 'Incorrect password.' });
            return done(null, false);
        }
        // username and password match! auth has has succeeded
        return done(null, user);
    });
}));


app.use('/', auth(passport));
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
