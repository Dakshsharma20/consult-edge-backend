const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  description: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", ClientSchema);
