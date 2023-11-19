// // paymentMiddleware.js
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const paymentMiddleware = {
//   createPaymentIntent: async (req, res, next) => {
//     try {
//       const { amount } = req.body;

//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: Math.round(amount), // Amount in cents
//         currency: 'usd',
//         // Other payment intent details...
//       });

//       req.paymentIntent = paymentIntent;
//       next();
//     } catch (error) {
//       console.error('Payment Intent Creation Error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// };

// module.exports = paymentMiddleware;
