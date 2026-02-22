import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
  serviceNo: {
    type: Number,
    required: true,
    index: true
  },

  from: {
    type: String,
    required: true,
    index: true
  },

  to: {
    type: String,
    required: true,
    index: true
  },

  via: {
    type: String,
    default: []
  },

  busType: {
    type: String,
    required: true
  },

  departureTime: {
    type: String,
    required: true
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model("Bus", BusSchema);