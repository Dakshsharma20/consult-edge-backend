require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const projectsRoute = require("./routes/projects");
const clientsRoute = require("./routes/clients");
const contactRoute = require("./routes/contact");
const subscribersRoute = require("./routes/subscribers");

const app = express();
app.use(cors());
app.use(express.json());

// Serve Uploaded Images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect DB
connectDB();

// Routes
app.use("/api/projects", projectsRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/contact", contactRoute);
app.use("/api/subscribers", subscribersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
