const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/multer");
const Project = require("../models/Project");
const upload = require("../middlewares/multer");

// Add project with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newProject = await Project.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;
