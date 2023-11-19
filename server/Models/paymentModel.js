const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  payment_date: { type: Date, required: true },
  payment_from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  payment_for: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;