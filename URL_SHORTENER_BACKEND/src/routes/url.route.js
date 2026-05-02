// routes/url.routes.js
import { Router } from "express";
import {
  createUrl,
  redirectUrl,
  getUrls,
  getAnalytics
} from "../controllers/url.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { rateLimiter } from "../middleware/ratelimiter.middleware.js";

const router = Router();

router.post("/shorten", auth, rateLimiter, createUrl);
router.get("/urls", auth, getUrls);
router.get("/analytics", auth, getAnalytics);
router.get("/:code", redirectUrl);

export default router;