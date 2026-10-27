const express = require("express");
const controller = require("../controllers/movieController");

const router = express.Router();

router.get("/", controller.renderHome);
router.get("/movies", controller.renderMovies);
router.get("/movies/:id", controller.renderMovieDetails);

module.exports = router;
