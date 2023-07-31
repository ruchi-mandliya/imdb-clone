const id = new URLSearchParams(window.location.search).get("id");
const API_KEY = "cb24851a";
fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
  .then((response) => response.json())
  .then((movie) => {
    document.getElementById("movie1").innerHTML = `
      <img src="${movie.Poster}" class="poster">
      
      <div>
        <h2 class=title><span >${movie.Title}</span> <span><b>(${movie.Year}</b>)</span></h2>
      
        <p><b>${movie.Rated} | ${movie.Runtime}</b>;</p>
        
        
        <p><b>${movie.Plot}</b></p>
        <p><b>Year:</b> ${movie.Released}</p>
        
       
        
        <p class = "genre"><b>Genre:</b> ${movie.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${movie.Writer}</p>
        <p class = "actors"><b>Actors: </b>${movie.Actors}</p>
       
        <p class = "language"><b>Language:</b> ${movie.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${movie.Awards}</p>

       
      </div>
      
    `;
  });

// fetch(`https://www.omdbapi.com/?i=${id}&s=${query}&apikey=${API_KEY}`)
//   .then((response) => response.json())
//   .then((movie) => {
//     document.getElementById("movie1").innerHTML = `
//       <img src="${movie.Poster}" class="poster">

//       <div>
//         <h2 class=title><span >${movie.Title}</span> <span><b>(${movie.Year}</b>)</span></h2>

//         <p><b>${movie.Rated} | ${movie.Runtime}</b>;</p>

//         <p><b>${movie.Plot}</b></p>
//         <p><b>Year:</b> ${movie.Released}</p>

//         <p class = "genre"><b>Genre:</b> ${movie.Genre}</p>
//         <p class = "writer"><b>Writer:</b> ${movie.Writer}</p>
//         <p class = "actors"><b>Actors: </b>${movie.Actors}</p>

//         <p class = "language"><b>Language:</b> ${movie.Language}</p>
//         <p class = "awards"><b><i class = "fas fa-award"></i></b> ${movie.Awards}</p>

//       </div>
//     `;
//   });
function goToHomePage() {
  window.location.href = "index.html";
}
