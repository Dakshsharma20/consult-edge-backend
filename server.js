// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

const projectsRoute = require("./routes/projects");
const clientsRoute = require("./routes/clients");
const contactRoute = require("./routes/contact");
const subscribersRoute = require("./routes/subscribers");

const app = express();
app.use(cors());
app.use(express.json());

// ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve Uploaded Images (public)
app.use("/uploads", express.static(uploadsDir));

// Connect DB
connectDB();

// Routes
app.use("/api/projects", projectsRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/contact", contactRoute);
app.use("/api/subscribers", subscribersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
