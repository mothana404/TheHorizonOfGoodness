// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController')
const virfytoken = require('../Middleware/authorization');


// router.set('view engine','ejs');
// router.set('views',path.join(__dirname, '../views'))

router.post('/process-donation',  paymentController.processDonation);
router.post('/process-donation-id/:donationId',  paymentController.processDonationid);
// Endpoint to get all payments
router.get('/payments', paymentController.getAllPayments);
router.get('/postpayments', paymentController.postPayments);
router.get('/getPaginatedPayments', paymentController.getPaginatedPayments);
// Endpoint to get payments by user ID

router.get('/payments/user', virfytoken.authorize, paymentController.getPaymentsByUserId);

module.exports = router;
