const API_KEY = "cb24851a";

function showHomePage() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "<h2>Popular Movies</h2>";

  fetch(`https://www.omdbapi.com/?s=popular&type=movie&apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        console.log(data);
        const movies = data.Search;
        const movieList = document.createElement("ul");

        movies.forEach((movie) => {
          const li = createMovieListItem(movie);
          movieList.appendChild(li);
        });
        contentDiv.appendChild(movieList);
      } else {
        contentDiv.innerHTML = "<h2>No popular movies found.</h2>";
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
      contentDiv.innerHTML =
        "<h2>An error occurred while fetching popular movies.</h2>";
    });
}

function createMovieListItem(movie) {
  // Create a new `li` element.
  const li = document.createElement("li");

  // Set the `innerHTML` property of the `li` element to a string that contains the movie's poster, title, and year.
  li.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          `;
  const favoriteBtn = createFavoriteButton(movie.imdbID);
  li.appendChild(favoriteBtn);

  return li; // Return the created `li` element.
}
function searchMovies() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a movie name to search.");
    return;
  }
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `<h2>Search Results for "${query}"</h2>`;

  // fetch("https://www.omdbapi.com/?s=" + query + "&apikey=" + API_KEY)
  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response == "True") {
        const movies = data.Search;
        const movieList = document.createElement("ul");
        movies.forEach((movie) => {
          const li = createMovieListItem(movie);
          movieList.appendChild(li);
        });
        contentDiv.appendChild(movieList);
      } else {
        contentDiv.innerHTML = `<p>No movies found for "${query}".</p>`;
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
      contentDiv.innerHTML = `<p>An error occurred while searching for movies.</p>`;
    });
}
function showFavorites() {
  const contentDiv = document.getElementById("content");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length > 0) {
    contentDiv.innerHTML = "<h2>My favorite Movies</h2>";

    const movieList = document.createElement("ul");
    favorites.forEach((movie) => {
      const li = createMovieListItem(movie);
      const removeBtn = createRemoveButton(movie.imdbID);
      li.appendChild(removeBtn);
      movieList.appendChild(li);
    });
    contentDiv.appendChild(movieList);
  } else {
    contentDiv.innerHTML = "<h2>No favorite movies found.</h2>";
  }
}

// Create a `favoriteBtn` element.
// const favoriteBtn = document.createElement("button");

// // Set the `innerText` property of the `favoriteBtn` element to "Add to Favorites".
// favoriteBtn.innerText = "Add to Favorites";

// // Append the `favoriteBtn` element to the `li` element.
// li.appendChild(favoriteBtn);

// // Check if the movie is already in the favorites list.
// const favorites = JSON.parse(localStorage.getItem("favorites"));
// const isFavorited = favorites.some((movie) => movie.imdbID === movie.imdbID);

// // If the movie is already in the favorites list, set the `favoriteBtn` element's `classlist` property to `active` and disable the button.
// if (isFavorited) {
//   favoriteBtn.classList.add("active");
//   favoriteBtn.innerText = "favourited";
//   favoriteBtn.disabled = true;
// }

// // Add an event listener to the `favoriteBtn` element. When the button is clicked, the `favorites` object is checked to see if the movie is already in the favorites list. If the movie is not in the favorites list, it is added to the list.
// favoriteBtn.addEventListener("click", () => {
//   if (!isFavorited) {
//     favorites.push(movie);
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }
//   return li;
// });

// Return the `li` element.

function createFavoriteButton(imdbID) {
  // Create a new `button` element.
  const btn = document.createElement("button");

  // Set the `innerText` property of the `button` element to "Add to Favorites".
  btn.innerText = "Add to Favorites";

  // Return the `button` element.
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorited = favorites.some((movie) => movie.imdbID === imdbID);

  if (isFavorited) {
    btn.classList.add("active");
    btn.innerText = "Favorited";
    btn.disabled = true;
  }
  btn.addEventListener("click", () => {
    // Retrieve favorite movies
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const selectedMovie = favorites.find((movie) => movie.imdbID === imdbID);

    if (selectedMovie) {
      alert("This movie is already in your favorites.");
      return;
    }
    // fetch movie details
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          favorites.push(data);
          localStorage.setItem("favorites", JSON.stringify(favorites));

          // Update the UI
          btn.classList.add("active");
          btn.innerText = "Favorited";
          btn.disabled = true;
        } else {
          alert("Failed to add the movie to favorites");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("An error occurred while fetching movie details");
      });
  });
  return btn;
}
function createRemoveButton(imdbID) {
  const button = document.createElement("button");
  button.innerText = "Remove from Favorites";

  button.addEventListener("click", () => {
    // Retrieve favorite movies from local storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Remove the movie from the list of favorite movies
    favorites = favorites.filter((movie) => movie.imdbID !== imdbID);

    // Update the list of favorite movies in local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Display the updated list of favorite movies
    showFavorites();
  });

  return button;
}
// const id = new URLSearchParams(window.location.search).get("id");

// fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
//   .then((response) => response.json())
//   .then((movie) => {
//     document.getElementById("movie").innerHTML = `
//       <img src="${movie.Poster}" class="poster">

//       <div>
//         <h2>${movie.Title} (${movie.Year})</h2>

//         <p>${movie.Rated} | ${movie.Runtime}</p>

//         <p>${movie.Plot}</p>

//         <p>Director: ${movie.Director}</p>
//         <p>Stars: ${movie.Actors}</p>
//       </div>
//     `;
//   });
showHomePage();
