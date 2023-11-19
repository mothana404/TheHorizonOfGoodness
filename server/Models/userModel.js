const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: Number, ref: 'Roles', required: true, default: 2 },
  phoneNumber: { type: String },
  profile_img: { type: String },
  created_at: { type: Date },
  age: { type: Number, required: false },
  googleID: { type: String },
  user_location: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;