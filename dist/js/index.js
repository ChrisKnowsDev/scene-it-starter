// c9d5a7f0

window.addEventListener('DOMContentLoaded', () => {
  // DOM variables
  const movieContainer = document.querySelector('#movies .container');
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');

  // Render Movies
  function renderMovies(movieArr) {
    const movieHtmlArray = movieArr.map(
      currentMovie => `
       <div class="movie">
          <img src="${currentMovie.Poster}" alt="" />
          <div class="movie-info">
            <h3 class="movie-title">${currentMovie.Title}</h3>
            <p class="date">${currentMovie.Year}</p>
            <button>Add</button>
          </div>
        </div>
      `
    );
    searchInput.value = '';
    return movieHtmlArray.join('');
  }

  // Listen for form submit
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchValue = searchInput.value;
    const searchEndpoint = `http://www.omdbapi.com/?s=${searchValue}&apikey=c9d5a7f0`;
    const moviePromise = fetch(searchEndpoint);
    moviePromise
      .then(response => response.json())
      .then(data => {
        movieContainer.innerHTML = renderMovies(data.Search);
      })
      .catch(err => console.log(err));
  });
});
