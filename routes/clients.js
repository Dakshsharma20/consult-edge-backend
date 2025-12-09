// backend/routes/clients.js
const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const upload = require("../middlewares/multer");

// helper base URL for production / local
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

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

    const imageUrl = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : "";

    // build absolute image URL using BASE_URL env var
const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
const imgUrl = req.file ? `${base}/uploads/${req.file.filename}` : "";

const newClient = new Client({
  name,
  designation,
  description,
  imageUrl: imgUrl,
});


    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Client POST error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
