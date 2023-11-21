const express = require("express");
const router = express.Router();
const itemDonationsController = require("../Controllers/itemDonationsController");
const auth = require('../Middleware/authorization');

router.post(
  "/addItemDonation",
  auth.authorize,
  itemDonationsController.addItemDonation
);

router.put(
  "/updateItemDonation/:itemDonation_id",
  auth.authorize,
  itemDonationsController.updateItemDonation
);
router.put(
  "/deleteItemDonation/:itemDonation_id",
  auth.authorize,
  itemDonationsController.deleteItemDonation
);

router.get("/getItemDonations",auth.authorize, itemDonationsController.getItemDonations);
router.get(
  "/filterItemDonationsByType/:item_type",
  auth.authorize,
  itemDonationsController.filterItemDonationsByType
);

router.get(
  "/getItemDonationById/:itemDonation_id",
  auth.authorize,
  itemDonationsController.getItemDonationById
);

module.exports = router;
