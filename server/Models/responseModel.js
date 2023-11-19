const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  response_text: { type: String, required: true },
  response_from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  response_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback', required: true },

//   send_at: { type: Date, required: true },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
