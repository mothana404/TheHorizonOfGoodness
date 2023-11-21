const express = require('express');
const router = express.Router();
const userscontrol = require('../Controllers/authorizationController');
const auth = require('../Middleware/authorization');
const passport = require('passport');
const logout = require('../Middleware/logout');
const donationsController = require("../controllers/donationsController");
require('../Middleware/googleAuth');

router.get('/loginpage', (req, res) => { res.render('loginview.ejs'); });

router.post('/register', userscontrol.createUser, donationsController.getDonations);
router.post('/login', userscontrol.loginUser , donationsController.getDonations);

router.get('/auth/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

router.get('/google/callback', passport.authenticate( 'google', {
        successRedirect: '/getDonations',
        failureRedirect: '/unauthirized',
}));

router.get('/unauthirized' , (req, res) => { res.send('unauthirized'); });

router.get('/userprofile', auth.userProfile);

router.put('/updateuser', userscontrol.updateuser);

router.get('/logout', logout.logout ,(req, res) => { res.render('loginview.ejs'); });

module.exports = router;