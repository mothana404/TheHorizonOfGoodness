const express = require("express");
const router = express.Router();
const donationsController = require("../controllers/donationsController");
const verifyJWT = require("../Middleware/authorization");

const image = require('../Middleware/multerFirebase');

router.post(
  "/addDonation",
  verifyJWT.authorize,
  image.uploadImg,
  donationsController.addDonation
);
router.put("/updateDonation/:donation_id", donationsController.updateDonation);
router.put("/deleteDonation/:donation_id", donationsController.deleteDonation);
router.get("/getDonations", donationsController.getDonations);



router.get(
  "/filterDonationsByType/:donation_type",
  donationsController.filterDonationsByType
);
router.get(
  "/getDonationById/:donation_id", 
  donationsController.getDonationById
);
router.get(
  "/getDonationBySearch/:donation_title",
  donationsController.getDonationBySearch
);
router.get(
  "/getDonationsWithPagination",
  donationsController.getDonationsWithPagination
);

module.exports = router;
