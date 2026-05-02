// app.js
import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.middleware.js";
import urlRoutes from "./routes/url.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config({
    path: "./.env"
});

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/v1/auth", authRoutes);
app.use("/", urlRoutes);

export default app;