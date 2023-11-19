const ItemDonation = require("../Models/itemDonationModel");

async function addItemDonation(req, res) {
  try {
    const { item_name, item_description, item_type, item_img } = req.body;
    const donor_id = req.params.donor_id; // Assuming donor_id is in the request parameters

    const newItemDonation = new ItemDonation({
      item_name,
      item_description,
      item_type,
      item_img,
      item_from: donor_id, // Associate the ItemDonation with the donor_id
      is_deleted: false,
    });

    await newItemDonation.save();
    res.status(201).json(newItemDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateItemDonation(req, res) {
  try {
    const { itemDonation_id } = req.params;
    const { item_name, item_description, item_type, item_img } = req.body;

    const itemDonation = await ItemDonation.findOneAndUpdate(
      { _id: itemDonation_id, is_deleted: false },
      { $set: { item_name, item_description, item_type, item_img } },
      { new: true }
    );

    if (!itemDonation) {
      return res.status(404).json({ error: "Item Donation not found" });
    }

    res.json(itemDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteItemDonation(req, res) {
  try {
    const { itemDonation_id } = req.params;

    const itemDonation = await ItemDonation.findOneAndUpdate(
      { _id: itemDonation_id, is_deleted: false },
      { is_deleted: true },
      { new: true }
    );

    if (!itemDonation) {
      return res.status(404).json({ error: "Item Donation not found" });
    }

    res.json(itemDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getItemDonations(req, res) {
  try {
    const itemDonations = await ItemDonation.find({ is_deleted: false });
    res.json(itemDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function filterItemDonationsByType(req, res) {
  try {
    const { item_type } = req.params;

    if (!item_type) {
      return res.status(400).json({ error: "Missing item_type parameter" });
    }

    const itemDonations = await ItemDonation.find({
      item_type,
      is_deleted: false,
    });

    res.json(itemDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getItemDonationById(req, res) {
  try {
    const { itemDonation_id } = req.params;

    const itemDonation = await ItemDonation.findOne({
      _id: itemDonation_id,
      is_deleted: false,
    });

    if (!itemDonation) {
      return res.status(404).json({ error: "Item Donation not found" });
    }

    res.json(itemDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  addItemDonation,
  updateItemDonation,
  deleteItemDonation,
  getItemDonations,
  filterItemDonationsByType,
  getItemDonationById,
};
