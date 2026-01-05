document.addEventListener("DOMContentLoaded", () => {
    const $modalBackground = document.querySelector("#modal-background");
    const $searchButton = document.querySelector("#search-button");

    loadMovies();

    $modalBackground.addEventListener("click", closeModal);

    $searchButton.addEventListener("click", () => {
        try {
            let { movieTitle, movieYear } = checkInputs();

            requestMovie(movieTitle, movieYear);
        } catch (error) {
            console.error(error.message);
        }
    });
});

function findMovieByPosterURL(posterURL) {}

function checkInputs() {
    const movieTitle = document.querySelector("#movie-title").value;
    const movieYear = document.querySelector("#movie-year").value;

    if (movieTitle != "" && !isNaN(Number(movieYear))) {
        return { movieTitle, movieYear };
    } else {
        throw new Error("Busca Inválida");
    }
}

async function requestMovie(movieTitle, movieYear = "") {
    try {
        let url;
        if (movieYear != "") {
            url = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movieTitle}&y=${movieYear}`;
        } else {
            url = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movieTitle}`;
        }
        const request = await fetch(url);
        const data = await request.json();

        if (!request.ok) {
            throw new Error("Erro na requisição da API.");
        } else if (data.Error) {
            throw new Error("Filme não encontrado");
        } else {
            openModal(data);
        }
    } catch (error) {
        console.error(error.message);
    }
}

function addToList(posterURL = "") {
    const $movieListContainer = document.querySelector("#movie-list-container");
    const $movieList = document.querySelectorAll(".movie-list");

    if (posterURL == "") {
        const $poster = document.querySelector("#modal-poster");
        posterURL = $poster.src;
    }

    $movieListContainer.innerHTML += `
    <div id="movie-index-${$movieList.length}" class="movie-container movie-list">
    <img src="${posterURL}" alt="Poster do filme" />
    <button id="remove-button" onclick="removeMovie(this)">Remover Filme</button>
    </div>`;

    closeModal();
    // saveMovie(posterURL);
}

function removeMovie(element) {
    const $movieListContainer = document.querySelector("#movie-list-container");
    const $movieDiv = element.parentNode;
    let savedMovies = localStorage.getItem("movies");
    savedMovies = JSON.parse(savedMovies);

    $movieDiv.classList.add("hidden");

    setTimeout(() => {
        $movieListContainer.removeChild($movieDiv);
    }, 3 * 2000);

    const posterURL = $movieDiv.querySelector("img").src;

    for (movie of Object.values(savedMovies)) {
        if (movie.Poster == posterURL) {
            delete savedMovies[movieTitle];
            localStorage.setItem("movies", JSON.stringify(savedMovies));
        }
    }
    window.location.reload();
}

// function saveMovie(posterURL) {
//     if (movieList != null) {
//         movieList = JSON.parse(movieList);
//     } else {
//         movieList = {};
//     }

//     movieList[newMovie.Title] = newMovie;
//     localStorage.setItem("movies", JSON.stringify(movieList));
// }

function loadMovies() {
    let savedMovies = localStorage.getItem("movies");
    savedMovies = JSON.parse(savedMovies);
    if (savedMovies != null) {
        for (data of Object.values(savedMovies)) {
            addToList(data.Poster);
        }
    }
}
