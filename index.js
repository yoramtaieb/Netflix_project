import {fetchMovie, fetchNetflixOriginals}  from "./apiService.js";
import Header from "./components/Header.mjs";

// (() => {
//     //Callback
//     const getResponse = (data) => {
//         return data;
//     };
//     try {
//         let movie = fetchMovie(157336, getResponse);
//         console.log(movie);
//         document.getElementById("header").innerHTML = Header(movie);
//         document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//     } catch (e) {
//         console.log(e)
//     }

//     console.log(fetchMovie)
// })();



//2
// (() => {
//     let movie = fetchMovie(157336).then(movie => {
//         console.log(movie)
//         document.getElementById("header").innerHTML = Header(movie);
//         document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//     })

// })();

// 3
(async() => {
    let movie = await fetchMovie(157336);
    //console.log(movie)
    document.getElementById("header").innerHTML = Header(movie);
    document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    let movies = await fetchNetflixOriginals();
    movies = movies.results

    let netflixOriginals = document.getElementsByClassName("movies__container--movie__netflix")[0]
    console.log(netflixOriginals)
    for(let i = 0; i < movies.length; i++){
        
        netflixOriginals.innerHTML += `
            <img src="https://image.tmdb.org/t/p/original//${movies[i].poster_path}" class="movies__container--movie-image"/>
            `
        netflixOriginals.style.overflow = "auto"
        netflixOriginals.style.display = "flex"
        console.log(movies[i].poster_path)
    }
})();