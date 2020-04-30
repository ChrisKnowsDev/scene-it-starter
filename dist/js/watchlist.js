const watchlist = localStorage.getItem('watchlist');
const watchlistParsed = JSON.parse(watchlist);
const movieContainer = document.querySelector('#movies .container');

// Render movies
function renderMovies(movieArr) {
  const movieHtmlArray = movieArr.map(currentMovie => {
    if (currentMovie) {
      return `
        <div class="movie">
          <img src="${currentMovie.Poster}" alt="" />
          <div class="movie-info">
            <h3 class="movie-title">${currentMovie.Title}</h3>
            <p class="date">${currentMovie.Year}</p>
            <button onclick="removeFromWatchList('${currentMovie.Title}')">Remove</button>
          </div>
        </div>`;
    }
  });
  return movieHtmlArray.join('');
}
movieContainer.innerHTML = renderMovies(watchlistParsed);

// Remove form local storage
function removeFromWatchList(title) {
  // use filter to find by id and localstorage.removeItem()
  const movieToDelete = watchlistParsed.filter(movie => movie.Title === title);
  localStorage.removeItem(movieToDelete);
}
