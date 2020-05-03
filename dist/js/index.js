const movieContainer = document.querySelector('#movies .container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const noImage = './images/no_image.png';

// Render movies
function renderMovies(movieArr) {
  const movieHtmlArray = movieArr.map(
    currentMovie => `<div class="movie">
    <img src="${
      currentMovie.Poster === 'N/A'
        ? './images/no_image.png'
        : currentMovie.Poster
    }" alt="" />
    <div class="movie-info">
      <h3 class="movie-title">${currentMovie.Title}</h3>
      <p class="date">${currentMovie.Year}</p>
      <a href='#'>More Info</a>
      <button id='btn-${currentMovie.imdbID}' onclick="saveToWatchList('${
      currentMovie.imdbID
    }')">Add</button>
    </div>
  </div>`
  );
  return movieHtmlArray.join('');
}

// listen for form submit

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchValue = searchInput.value;
  const urlEncoded = encodeURIComponent(searchValue);
  const searchEndpoint = `https://www.omdbapi.com/?s=${urlEncoded}&apikey=c9d5a7f0`;
  const moviePromise = fetch(searchEndpoint);
  moviePromise
    .then(response => response.json())
    .then(data => {
      movieContainer.innerHTML = renderMovies(data.Search);
    })
    .catch(err => console.log(err));
  searchInput.value = '';
});

// save movie to watchlist
function saveToWatchList(id) {
  const btn = document.getElementById(`btn-${id}`);
  btn.textContent = 'Added';
  const searchEndpoint = `https://www.omdbapi.com/?i=${id}&apikey=c9d5a7f0`;
  const moviePromise = fetch(searchEndpoint);
  moviePromise
    .then(response => response.json())
    .then(data => {
      let watchlistJSON = localStorage.getItem('watchlist');
      let watchlist = JSON.parse(watchlistJSON);
      if (watchlist === null) {
        watchlist = [];
      }
      if (watchlist.find(movie => movie.imdbID === id)) {
        alert('Already here');
        return;
      }
      watchlist.push(data);
      watchlistJSON = JSON.stringify(watchlist);
      localStorage.setItem('watchlist', watchlistJSON);
    })
    .catch(err => console.log(err));
}
