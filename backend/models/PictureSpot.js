const mongoose = require("mongoose");

const pictureSpotSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { type: String }, // Path to uploaded image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PictureSpot", pictureSpotSchema);
