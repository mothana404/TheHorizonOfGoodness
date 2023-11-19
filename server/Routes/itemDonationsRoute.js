const express = require("express");
const router = express.Router();
const itemDonationsController = require("../Controllers/itemDonationsController");

router.post(
  "/addItemDonation/:donor_id",
  itemDonationsController.addItemDonation
);

router.put(
  "/updateItemDonation/:itemDonation_id",
  itemDonationsController.updateItemDonation
);
router.put(
  "/deleteItemDonation/:itemDonation_id",
  itemDonationsController.deleteItemDonation
);

router.get("/getItemDonations", itemDonationsController.getItemDonations);
router.get(
  "/filterItemDonationsByType/:item_type",
  itemDonationsController.filterItemDonationsByType
);
router.get(
  "/getItemDonationById/:itemDonation_id",
  itemDonationsController.getItemDonationById
);

module.exports = router;
