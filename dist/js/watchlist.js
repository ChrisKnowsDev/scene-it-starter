document.addEventListener('DOMContentLoaded', () => {
  const watchlist = localStorage.getItem('watchlist');
  const watchlistParsed = JSON.parse(watchlist);
  const movieContainer = document.querySelector('#movies .container');
  // Render movies
  function renderMovies(movieArr) {
    const movieHtmlArray = movieArr.map(
      currentMovie => `
      <div class="movie">
        <img src="${currentMovie.Poster}" alt="" />
        <div class="movie-info">
          <h3 class="movie-title">${currentMovie.Title}</h3>
          <p class="date">${currentMovie.Year}</p>
          <button>Remove</button>
        </div>
      </div>`
    );
    return movieHtmlArray.join('');
  }
  movieContainer.innerHTML = renderMovies(watchlistParsed);
});
