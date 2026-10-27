// Shared browser-side JavaScript for CineVerse.
// Movie search currently uses a standard GET form, so it works without JavaScript.
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('input[name="search"]');
  if (searchInput) {
    searchInput.setAttribute("autocomplete", "off");
  }
});
