// const API_KEY = "cb24851a";
//
const home = document.getElementById("home");

async function showHomePage(searchTerm) {
  const apiKey = "cb24851a";
  const apiUrl = `https://www.omdbapi.com/?s=popular&type=movie&apikey=${apiKey}`;

  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "<h2>Popular Movies</h2>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response == "True") {
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
  } catch (error) {
    console.error("Error fetching movies:", error.message);
  }
}
home.addEventListener("click", () => {
  const searchTerm = "popular";
  showHomePage(searchTerm);
});
// fetch(`https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`)
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.Response == "True") {
//       console.log(data);
//       const movies = data.Search;
//       const movieList = document.createElement("ul");
//       movies.forEach((movie) => {
//         const li = createMovieListItem(movie);
//         movieList.appendChild(li);
//       });
//       contentDiv.appendChild(movieList);
//     } else {
//       contentDiv.innerHTML = "<h2>No popular movies found.</h2>";
//     }
//     })
//     .catch((error) => {
//       console.log("Error: " + error);
//       contentDiv.innerHTML =
//         "<h2>An error occurred while fetching popular movies.</h2>";
//     });
// }

function searchMovies() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();

  if (!query) {
    alert("Please enter a movie name to search.");
  } else {
    fetch("https://www.omdbapi.com/?s=" + query + "&apikey=" + API_KEY)
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
}

function showFavorites() {
  const contentDiv = document.getElementById("content");
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  if (favorites) {
    const movieList = document.createElement("ul");
    favorites.forEach((movie) => {
      const li = createMovieListItem(movie);
      movieList.appendChild(li);
    });
    contentDiv.appendChild(movieList);
  } else {
    contentDiv.innerHTML = "<h2>No favorite movies found.</h2>";
  }
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

  // Create a `favoriteBtn` element.
  const favoriteBtn = document.createElement("button");

  // Set the `innerText` property of the `favoriteBtn` element to "Add to Favorites".
  favoriteBtn.innerText = "Add to Favorites";

  // Append the `favoriteBtn` element to the `li` element.
  li.appendChild(favoriteBtn);

  // Check if the movie is already in the favorites list.
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const isFavorited = favorites.some((movie) => movie.imdbID === movie.imdbID);

  // If the movie is already in the favorites list, set the `favoriteBtn` element's `classlist` property to `active` and disable the button.
  if (isFavorited) {
    favoriteBtn.classList.add("active");
    favoriteBtn.disabled = true;
  }

  // Add an event listener to the `favoriteBtn` element. When the button is clicked, the `favorites` object is checked to see if the movie is already in the favorites list. If the movie is not in the favorites list, it is added to the list.
  favoriteBtn.addEventListener("click", () => {
    if (!isFavorited) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  });

  // Return the `li` element.
  return li;
}

function createFavoriteButton(imdbID) {
  // Create a new `button` element.
  const btn = document.createElement("button");

  // Set the `innerText` property of the `button` element to "Add to Favorites".
  btn.innerText = "Add to Favorites";

  // Return the `button` element.
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const isFavorited = favorites.some((movie) => movie.imdbID === movie.imdbID);

  if (isFavorited) {
    btn.classList.add("active");
    btn.innerText = "Favorited";
    btn.disabled = true;
  }
  btn.addEventListener("click", () => {
    // Retrieve favorite movies
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const selectedMovie = favorites.find(
      (movie) => movie.imdbID === movie.imdbID
    );

    if (selectedMovie) {
      alert("This movie is already in your favorites.");
      return;
    }

    fetch(`https://www.omdbapi.com/?i=${imdbID}`)
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

// Function to fetch movies from the OMDB API
// async function getMovies(searchTerm) {
//   const apiKey = "cb24851a";
//   const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data.Response === "True") {
//       return data.Search;
//     } else {
//       throw new Error(data.Error);
//     }
//   } catch (error) {
//     console.error("Error fetching movies:", error.message);

//   }
// }

// // Function to handle form submission
// function handleFormSubmit(event) {
//   event.preventDefault();

//   const searchTerm = document.getElementById("searchInput").value.trim();

//   if (searchTerm === "") {
//     console.log("Please enter a valid movie title.");
//     return;
//   }

//   displayMovies(searchTerm);
// }

// // Function to display movies on the page
// function displayMovies(searchTerm) {
//   getMovies(searchTerm)
//     .then((movies) => {
//       const resultsDiv = document.getElementById("content");
//       resultsDiv.innerHTML = ""; // Clear previous results

//       if (movies) {
//         movies.forEach((movie) => {
//           const movieTitle = movie.Title;
//           const movieYear = movie.Year;
//           const moviePoster = movie.Poster;

//           // Create elements to display movie information
//           const movieDiv = document.createElement("div");
//           movieDiv.classList.add("movie");

//           const titleElement = document.createElement("h3");
//           titleElement.textContent = `${movieTitle} (${movieYear})`;
//           const posterElement = document.createElement("img");
//           posterElement.src = moviePoster;

//           // Append elements to the results div
//           movieDiv.appendChild(titleElement);
//           movieDiv.appendChild(posterElement);
//           resultsDiv.appendChild(movieDiv);
//         });
//       } else {
//         resultsDiv.textContent = "No movies found.";
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// // Function to fetch movies with a popular search term on page load
// function fetchPopularMovies() {
//   const popularSearchTerm = "popular"; // Replace 'popular' with your desired popular search term
//   displayMovies(popularSearchTerm);
// }

// // Add event listener to the form
// const searchForm = document.getElementById("searchForm");
// searchForm.addEventListener("submit", handleFormSubmit);

// // Fetch popular movies on page load
// fetchPopularMovies();
