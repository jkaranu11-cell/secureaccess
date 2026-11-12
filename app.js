
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// Security headers
app.use(helmet());

// Parse JSON requests
app.use(express.json({ limit: "10kb" }));

// CORS configuration for local development
app.use(cors());

// General API rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

app.use("/api", limiter);

// Welcome endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to SecureAccess API"
    });
});

// Health endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Online",
        service: "SecureAccess API"
    });
});

// Unknown route handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;
