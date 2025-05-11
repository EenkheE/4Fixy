const express = require("express");
const router = express.Router();
const PictureSpot = require("../models/PictureSpot");
const multer = require("multer");
const path = require("path"); // Add this import

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all picture spots
router.get("/", async (req, res) => {
  try {
    const spots = await PictureSpot.find();
    console.log("Fetched spots:", spots);
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single picture spot
router.get("/:id", async (req, res) => {
  try {
    const spot = await PictureSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: "Spot not found" });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single picture spot
router.get("/:id", async (req, res) => {
  try {
    const spot = await PictureSpot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: "Spot not found" });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new picture spot
router.post("/", upload.single("image"), async (req, res) => {
  console.log("Uploaded file:", req.file); // Log for debugging
  if (!req.file && !req.body.image) {
    return res.status(400).json({ message: "Image upload failed" });
  }

  const spot = new PictureSpot({
    title: req.body.title,
    description: req.body.description,
    coordinates: {
      lat: parseFloat(req.body.lat),
      lng: parseFloat(req.body.lng),
    },
    image: req.file ? `/Uploads/${req.file.filename}` : null,
  });

  try {
    const newSpot = await spot.save();
    res.status(201).json(newSpot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
