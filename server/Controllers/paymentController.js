const stripe = require("stripe")(
  "sk_test_51OCizILLmtJgsGjhKcKg5Lk0FoXKwJJbs9xIeYxPH07CWN8jB8DGeDij7QvAnGZm0k0B9SlOlEU0EtsYydAPnvDH002qVZo6ac"
); // Replace with your actual Stripe secret key
const Donation = require("../Models/paymentModel");
const mongoose = require("mongoose");
// const { render } = require("../server");

exports.processDonation = async (req, res) => {
  try {
    console.log(req.body);
    const { amount, payment_method } = req.body;

    // Create a PaymentIntent to confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: "usd",
      payment_method: payment_method,
      confirmation_method: "manual",
      confirm: true,
      return_url: "http://localhost:5500", // Specify your actual success URL
    });

    // Handle the success or failure of the payment intent
    if (paymentIntent.status === "succeeded") {
      // Payment succeeded, save donation data to the database
      const donation = new Donation({
        amount: amount, // Store the amount in cents or adjust based on your model
        payment_date: new Date(),
        payment_for: "6557932492967ea83aa1d4c1",
        // payment_for: mongoose.Types.ObjectId(req.user._id), // Convert to ObjectId
        payment_from: "5fb3b8de3f068509588d8d3a", // Convert to ObjectId
      });

      await donation.save();
      res.send({
        client_secret: paymentIntent.client_secret,
        donationId: donation._id,
      });
    } else {
      // Payment failed, handle as needed
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error("Payment Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.processDonationid = async (req, res) => {
  try {
    console.log(req.body);
    const { amount, payment_method } = req.body;

    // Create a PaymentIntent to confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: "usd",
      payment_method: payment_method,
      confirmation_method: "manual",
      confirm: true,
      return_url: "http://localhost:5500", // Specify your actual success URL
    });

    // Handle the success or failure of the payment intent
    if (paymentIntent.status === "succeeded") {
      // Get the donation _id from request parameters
      const donationId = req.params.donationId; // Adjust accordingly based on your route

      // Payment succeeded, save donation data to the database
      const donation = new Donation({
        amount: amount,
        payment_date: new Date(),
        payment_for: donationId, // Set the donation _id dynamically
        payment_from: "5fb3b8de3f068509588d8d3a", // Convert to ObjectId
      });

      // Save the donation to get the donation _id
      const savedDonation = await donation.save();

      // Update total_donation in your schema
      const updatedDonation = await Donation.findByIdAndUpdate(
        savedDonation._id,
        { $inc: { total_donation: amount } }, // Increment total_donation by the donation amount
        { new: true } // Return the updated document
      );

      res.send({
        client_secret: paymentIntent.client_secret,
        donationId: updatedDonation._id,
      });
    } else {
      // Payment failed, handle as needed
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error("Payment Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Donation.find();
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postPayments = async (req, res) => {
  try {
    const payments = await Donation.find();
    // res.json(payments);
    res.render("payment.ejs", { payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get payments by user ID
exports.getPaymentsByUserId = async (req, res) => {
  try {
    // Extract user ID from the request object
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const payments = await Payment.find({ payment_from: userId });

    if (payments.length === 0) {
      return res
        .status(404)
        .json({ error: "No payments found for the specified user ID" });
    }

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments by user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get paginated payments
exports.getPaginatedPayments = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default to page 1 if not specified
    const pageSize = req.query.pageSize || 10; // Default page size to 10 if not specified

    const skip = (page - 1) * pageSize;

    // Fetch paginated payments
    const payments = await Donation.find().skip(skip).limit(pageSize);

    res.json(payments);
  } catch (error) {
    console.error("Error fetching paginated payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
