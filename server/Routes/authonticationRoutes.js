const express = require('express');
const router = express.Router();
const userscontrol = require('../Controllers/authorizationController');
const auth = require('../Middleware/authorization');
// const google = require('../Middleware/googleAuth');
const passport = require('passport');
require('../Middleware/googleAuth');

router.get('/loginpage', (req, res) => {
    res.render('loginview.ejs');
});

router.post('/register', userscontrol.createUser);
router.post('/login', userscontrol.loginUser);

router.get('/auth/google',
  passport.authenticate('google', 
    { scope:
      [ 'email', 'profile' ] 
    }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/unauthirized',
}));

router.get('/homepage', auth.authorize, (req, res) => {
    res.render('homepageView.ejs');
});

router.get('/unauthirized' , (req, res) => {
    res.send('unauthirized');
});

router.put('/updateuser', userscontrol.updateuser);

module.exports = router;