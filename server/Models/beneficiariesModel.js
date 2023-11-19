const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  beneficiarie_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  beneficiarie_description: { type: String, required: true },
  card_number: { type: Number, required: true },
  beneficiarie_amount: { type: Number, required: true },
  beneficiarie_accepted: { type: Boolean, default: false, required: true },
  beneficiarie_type: { type: String, required: true },
  status: { type: Boolean, default: false, required: true },
  is_deleted: { type: Boolean,default: false, required: true },
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

module.exports = Beneficiary;