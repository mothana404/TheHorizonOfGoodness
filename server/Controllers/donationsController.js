const Donation = require("../Models/donationModel");

async function addDonation(req, res) {
  try {
    const donor_id = req.user.id;
    if (req.user.role === 2) {
      const {
        donation_title,
        donation_description,
        donation_type,
        expected_outcome,
      } = req.body;
      console.log(res.locals);
      const donation_img = res.locals.site;
      const newDonation = new Donation({
        donation_title,
        donation_description,
        donor_id,
        donation_type,
        expected_outcome,
        created_at: new Date(), // Set the current date and time
        donation_img,
        is_deleted: false, // New donations are not deleted by default
      });

      await newDonation.save();
      res.status(201).json(newDonation);
    } else {
      res.status(401).json({ error: "User is unotharized for this action" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateDonation(req, res) {
  try {
    const { donation_id } = req.params;
    const {
      donation_title,
      donation_description,
      donation_type,
      expected_outcome,
      donation_img,
    } = req.body;

    // Check if the donation exists and is not soft-deleted
    const donation = await Donation.findOne({
      _id: donation_id,
      is_deleted: false,
    });

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    // Update the donation
    donation.donation_title = donation_title || donation.donation_title;
    donation.donation_description =
      donation_description || donation.donation_description;
    donation.donation_type = donation_type || donation.donation_type;
    donation.expected_outcome = expected_outcome || donation.expected_outcome;
    donation.donation_img = donation_img || donation.donation_img;

    await donation.save();

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteDonation(req, res) {
  try {
    const { donation_id } = req.params;
    const donation = await Donation.findOneAndUpdate(
      { _id: donation_id, is_deleted: false },
      { is_deleted: true },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDonations(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 4;

    const donations = await Donation.find({ is_deleted: false }).limit(limit);

    // res.json(donations);
    res.render("homepageView.ejs", { donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function filterDonationsByType(req, res) {
  try {
    const { donation_type } = req.params;

    if (!donation_type) {
      return res.status(400).json({ error: "Missing donation_type parameter" });
    }

    const donations = await Donation.find({
      donation_type,
      is_deleted: false,
    });

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDonationById(req, res) {
  try {
    const { donation_id } = req.params;

    const donation = await Donation.findOne({
      _id: donation_id,
      is_deleted: false,
    });

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDonationBySearch(req, res) {
  try {
    const { donation_title } = req.params;

    if (!donation_title) {
      return res
        .status(400)
        .json({ error: "Missing donation_title parameter" });
    }

    const donations = await Donation.find({
      donation_title,
      is_deleted: false,
    });

    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDonationsWithPagination(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const donations = await Donation.find({ is_deleted: false });

    const results = {};

    if (endIndex < donations.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = donations.slice(startIndex, endIndex);

    // res.render("homepageView.ejs", { results });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  addDonation,
  updateDonation,
  deleteDonation,
  getDonations,
  filterDonationsByType,
  getDonationById,
  getDonationBySearch,
  getDonationsWithPagination,
};
