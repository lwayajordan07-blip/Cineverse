const movieModel = require("../models/movieModel");

async function renderHome(req, res, next) {
  try {
    const movies = await movieModel.getFeaturedMovies();
    res.render("pages/home", {
      title: "Discover your next favorite movie",
      movies
    });
  } catch (error) {
    next(error);
  }
}

async function renderMovies(req, res, next) {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : "";
    const genre = typeof req.query.genre === "string" ? req.query.genre : "";
    const [movies, genres] = await Promise.all([
      movieModel.getAllMovies(search, genre),
      movieModel.getGenres()
    ]);
    res.render("pages/movies", {
      title: "Explore movies",
      movies,
      genres,
      search,
      selectedGenre: genre
    });
  } catch (error) {
    next(error);
  }
}

async function renderMovieDetails(req, res, next) {
  try {
    const movie = await movieModel.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).render("pages/not-found", {
        title: "Movie not found",
        message: "We couldn't find that movie."
      });
    }
    res.render("pages/movie-detail", {
      title: movie.title,
      movie
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { renderHome, renderMovies, renderMovieDetails };
