# CineVerse

CineVerse is a beginner-friendly full-stack movie discovery website built with Node.js, Express, EJS, and PostgreSQL.

## Current features

- Responsive dark-themed homepage
- Movie collection from PostgreSQL
- Search by title
- Filter by genre
- Individual movie detail pages
- Custom 404 and error pages
- Database health endpoint at `/health`

## Requirements

Install these first:
- Node.js LTS (includes npm)
- PostgreSQL
- Visual Studio Code
- Git

## 1. Install dependencies

Open a terminal in this project folder and run:

```bash
npm install
```

## 2. Create the database

Create a PostgreSQL database named `cineverse`.

Using pgAdmin:
1. Connect to your local PostgreSQL server.
2. Right-click Databases and choose Create > Database.
3. Enter `cineverse`.
4. Open Query Tool for the new database.
5. Open `database/schema.sql`, copy its contents into Query Tool, and run it.
6. Repeat with `database/seed.sql` to add sample movies.

Alternatively, using `psql`:

```bash
psql -U postgres -c "CREATE DATABASE cineverse;"
psql -U postgres -d cineverse -f database/schema.sql
psql -U postgres -d cineverse -f database/seed.sql
```

## 3. Configure environment variables

Copy `.env.example` to a new file named `.env`.

Update `DATABASE_URL` with your own PostgreSQL username and password. For example:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cineverse
NODE_ENV=development
```

Replace `YOUR_PASSWORD` with your actual local PostgreSQL password. Do not commit `.env` to GitHub.

## 4. Run the website

```bash
npm run dev
```

Open http://localhost:3000.

Check the database connection at http://localhost:3000/health. It should return JSON with `"status":"ok"` and `"database":"connected"`.

## 5. Git and GitHub

If you already created an empty GitHub repository, open a terminal in the project folder:

```bash
git init
git add .
git commit -m "Build CineVerse starter website"
git branch -M main
git remote add origin YOUR_NEW_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_NEW_REPOSITORY_URL` with the HTTPS or SSH URL of your own repository. If Git says a remote named `origin` already exists, run `git remote -v` and update it only if needed.

## Next development stages

1. Improve the movie data and visual polish.
2. Add a movie API for up-to-date movie information.
3. Add secure user registration and login.
4. Add watchlists connected to user accounts.
5. Add tests, validation, security hardening, and deployment.

## Notes

- Sample movie records are starter/demo data. Some poster image URLs may need replacing if an external image host changes or an image does not load.
- Authentication and watchlists are intentionally not implemented in this starter stage.
- Never commit passwords, database URLs containing credentials, or API keys.
