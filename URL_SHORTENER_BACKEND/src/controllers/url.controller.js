// controllers/url.controller.js
import { Url } from "../models/url.model.js";
import { generateCode } from "../utils/generateCode.js";

// CREATE SHORT URL
export const createUrl = async (req, res) => {
  const { originalUrl } = req.body;

  const shortCode = generateCode();

  const url = await Url.create({
    originalUrl,
    shortCode,
    userId: req.user.userId
  });

  res.json({ shortUrl: `http://localhost:4000/${shortCode}` });
};

// REDIRECT
export const redirectUrl = async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });

  if (!url) return res.status(404).json({ message: "Not found" });

  url.clicks++;
  url.visitHistory.push({});
  await url.save();

  res.redirect(url.originalUrl);
};

// SEARCH + FILTER
export const getUrls = async (req, res) => {
  const { search, minClicks } = req.query;

  let filter = { userId: req.user.userId };

  if (search) {
    filter.originalUrl = { $regex: search, $options: "i" };
  }

  if (minClicks) {
    filter.clicks = { $gte: Number(minClicks) };
  }

  const urls = await Url.find(filter);

  res.json(urls);
};

// AGGREGATION
export const getAnalytics = async (req, res) => {
  const data = await Url.aggregate([
    { $match: { userId: req.user.userId } },
    { $sort: { clicks: -1 } },
    { $limit: 5 }
  ]);

  res.json(data);
};