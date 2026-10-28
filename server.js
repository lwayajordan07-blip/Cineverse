
require("dotenv").config();

const express = require("express");
const path = require("path");
const { pool } = require("./src/config/database");
const movieRoutes = require("./src/routes/movieRoutes");
const {
  notFound,
  errorHandler,
} = require("./src/middleware/errorHandlers");

const app = express();
const PORT = process.env.PORT || 3000;

// Check environment configuration without revealing credentials
console.log(
  "DATABASE_URL loaded:",
  Boolean(process.env.DATABASE_URL)
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Application routes
app.use("/", movieRoutes);

// Database health check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`CineVerse is running at http://localhost:${PORT}`);
});

// Graceful shutdown
async function shutdown() {
  console.log("Shutting down CineVerse...");

  server.close(async () => {
    try {
      await pool.end();
      console.log("Database connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Shutdown error:", error.message);
      process.exit(1);
    }
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
