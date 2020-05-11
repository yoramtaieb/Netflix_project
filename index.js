import { fetchMovie } from "./apiService.js";
import Header from "./components/Header.mjs";

(async() => {
    //Callback
    const getResponse = (data) => {
        return data;
    };
    try {
        let movie = fetchMovie(157336, getResponse);
        console.log(movie);
        document.getElementById("header").innerHTML = Header(movie);
        document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    } catch (e) {
        console.log(e)
    }

    const movie = fetch('https://api.themoviedb.org/3/movie/99?api_key=617f779f9850bfb3355824689e154920&language=fr-FR%27')
        .then(resultat => resultat.json())
        .then(cacaProut => { console.log(cacaProut) })
    console.log(movie)



})();



//2
// (() => {
//     let movie = fetchMovie(157336).then(movie => {
//         console.log(movie)
//         document.getElementById("header").innerHTML = Header(movie);
//         document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//     })

// })();

//3
// (async () => {
//     let movie = await fetchMovie(157336);
//     console.log(movie)
//     document.getElementById("header").innerHTML = Header(movie);
//     document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
// })();