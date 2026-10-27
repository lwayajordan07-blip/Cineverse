CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  overview TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  backdrop_url TEXT,
  release_year INTEGER NOT NULL CHECK (release_year BETWEEN 1888 AND 2100),
  rating NUMERIC(3,1) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 10),
  genre VARCHAR(60) NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_movies_title ON movies (title);
CREATE INDEX IF NOT EXISTS idx_movies_genre ON movies (genre);
