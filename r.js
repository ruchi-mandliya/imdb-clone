const API_KEY = "cb24851a";
async function getMovies(API_KEY) {
  const res = await fetch(
    `https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`
  );
  const data = await res.json();

  if (data.Response == "True") {
    console.log(data);
  }
}

getMovies(API_KEY);

// function fetchPopularMovies() {
//   const popularSearchTerm = "popular"; // Replace 'popular' with your desired popular search term
//   displayMovies(popularSearchTerm);
// }

// // Add event listener to the form
// const searchForm = document.getElementById("searchForm");
// searchForm.addEventListener("submit", handleFormSubmit);

// // Fetch popular movies on page load
// fetchPopularMovies();
