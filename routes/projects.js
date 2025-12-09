const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const upload = require("../middlewares/upload");

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort("-createdAt");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    const newProject = new Project({
      name,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
