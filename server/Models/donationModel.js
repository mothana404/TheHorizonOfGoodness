const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donation_title: { type: String, required: true },
  donation_description: { type: String, required: true },
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donation_type: { type: String, required: true },
  expected_outcome: { type: Number, required: true },
  created_at: { type: Date, required: true },
  total_donation: { type: Number, default: 0, required: true },
  donation_img: { type: String, required: true },
  is_deleted: { type: Boolean, required: true },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;

// const {
//   donation_title,
//   donation_description,
//   donation_type,
//   expected_outcome,
//   total_donation,
//   donation_img,
// } = req.body;