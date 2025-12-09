// backend/routes/projects.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const upload = require("../middlewares/multer");

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort("-createdAt");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create project with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : "";

    const newProject = await Project.create({
      name,
      description,
      imageUrl,
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Project POST error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
