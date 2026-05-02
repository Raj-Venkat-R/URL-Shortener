import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  clicks: { type: Number, default: 0 },
  visitHistory: [
    {
      timestamp: { type: Date, default: Date.now }
    }
  ],
  userId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

export const Url = mongoose.model("Url", urlSchema);