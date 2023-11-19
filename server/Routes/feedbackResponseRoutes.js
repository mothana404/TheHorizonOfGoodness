const express = require('express');
const router = express.Router();
const feedbackresponse = require('../Controllers/feedbackresponseController');
const Middleware = require('../Middleware/authorization');

//for the user
router.post('/sendfeedback', Middleware.authorize, feedbackresponse.sendfeedback);
router.get('/getresponse', Middleware.authorize, feedbackresponse.getresponse);
//for the admin
router.post('/sendresponse', Middleware.authorize, feedbackresponse.sendresponse);
router.get('/getfeedback', Middleware.authorize, feedbackresponse.getfeedback);

module.exports = router;