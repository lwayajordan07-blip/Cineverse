function notFound(req, res) {
  res.status(404).render("pages/not-found", {
    title: "Page not found",
    message: "That page doesn't exist. Let's get you back to the movies."
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(500).render("pages/error", {
    title: "Something went wrong",
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong. Please try again later."
  });
}

module.exports = { notFound, errorHandler };
