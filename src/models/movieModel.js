const db = require("../config/database");

async function getFeaturedMovies() {
  const result = await db.query(
    `SELECT id, title, overview, poster_url, backdrop_url, release_year,
            rating, genre, featured
     FROM movies
     ORDER BY featured DESC, rating DESC, title ASC
     LIMIT 8`
  );
  return result.rows;
}

async function getAllMovies(searchTerm = "", genre = "") {
  const result = await db.query(
    `SELECT id, title, overview, poster_url, backdrop_url, release_year,
            rating, genre, featured
     FROM movies
     WHERE ($1 = '' OR title ILIKE '%' || $1 || '%')
       AND ($2 = '' OR genre = $2)
     ORDER BY featured DESC, rating DESC, title ASC`,
    [searchTerm.trim(), genre]
  );
  return result.rows;
}

async function getMovieById(id) {
  const result = await db.query(
    `SELECT id, title, overview, poster_url, backdrop_url, release_year,
            rating, genre, featured
     FROM movies WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

async function getGenres() {
  const result = await db.query(
    "SELECT DISTINCT genre FROM movies ORDER BY genre ASC"
  );
  return result.rows.map((row) => row.genre);
}

module.exports = { getFeaturedMovies, getAllMovies, getMovieById, getGenres };
