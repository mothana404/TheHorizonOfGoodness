const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback_text: { type: String, required: true },
  feedback_from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

//   feedback_for: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemDonation', required: true },
//   send_at: { type: Date, required: true },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;