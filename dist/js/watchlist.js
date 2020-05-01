const movieContainer = document.querySelector('#movies .container');
let watchlist = localStorage.getItem('watchlist');
let watchlistParsed = JSON.parse(watchlist);

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
  watchlist = localStorage.getItem('watchlist');
  watchlistParsed = JSON.parse(watchlist);
  const returnMovies = watchlistParsed.filter(movie => movie.Title !== title);
  const stringyMovies = JSON.stringify(returnMovies);
  localStorage.setItem('watchlist', stringyMovies);
  movieContainer.innerHTML = renderMovies(returnMovies);
}
