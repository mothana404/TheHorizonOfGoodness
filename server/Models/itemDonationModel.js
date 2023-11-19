const mongoose = require('mongoose');

const itemDonationSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: true },
  item_type: { type: String, required: true },
  item_img: { type: String, required: true },
  item_from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // item_for: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  is_deleted: { type: Boolean, default: false, required: true },
});

const ItemDonation = mongoose.model('ItemDonation', itemDonationSchema);

module.exports = ItemDonation;