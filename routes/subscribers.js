const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// POST subscribe
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    let existing = await Subscriber.findOne({ email });
    if (existing) return res.json(existing); // Avoid duplicate emails

    const sub = new Subscriber({ email });
    await sub.save();

    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all subscribers
router.get("/", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort("-createdAt");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
