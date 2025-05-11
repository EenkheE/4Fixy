const express = require("express");
const router = express.Router();
const InfrastructureIssue = require("../models/InfrastructureIssue");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const issues = await InfrastructureIssue.find();
    console.log("Fetched issues:", issues);
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const issue = await InfrastructureIssue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    console.log("Fetched issue:", issue);
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log("Uploaded file:", req.file);
  if (
    !req.body.title ||
    !req.body.lat ||
    !req.body.lng ||
    !req.body.likelihood ||
    !req.body.impact ||
    !req.body.fixDemand
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const issue = new InfrastructureIssue({
    title: req.body.title,
    description: req.body.description,
    coordinates: {
      lat: parseFloat(req.body.lat),
      lng: parseFloat(req.body.lng),
    },
    image: req.file ? `/Uploads/${req.file.filename}` : null,
    likelihood: parseInt(req.body.likelihood),
    impact: parseInt(req.body.impact),
    fixDemand: req.body.fixDemand,
  });

  try {
    const newIssue = await issue.save();
    console.log("Saved issue:", newIssue);
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
