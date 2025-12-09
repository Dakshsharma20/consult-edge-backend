const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST contact form
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    const contact = new Contact({
      fullName,
      email,
      mobile,
      city,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const list = await Contact.find().sort("-createdAt");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
