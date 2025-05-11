const mongoose = require("mongoose");

const infrastructureIssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  image: {
    type: String,
  },
  likelihood: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  impact: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  fixDemand: {
    type: String,
    enum: ["Immediate", "High", "Moderate", "Low"],
    required: true,
  },
});

module.exports = mongoose.model(
  "InfrastructureIssue",
  infrastructureIssueSchema
);
