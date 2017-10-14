const express = require('express');
const router = express.Router();
const User = require('../models').User;

module.exports = (passport) => {
    router.post('/signup', (req, res) => {
        res.send(200);
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
