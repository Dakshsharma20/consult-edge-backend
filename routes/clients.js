const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const upload = require("../middlewares/upload");

// GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort("-createdAt");
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create client
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, designation, description } = req.body;

    const newClient = new Client({
      name,
      designation,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
