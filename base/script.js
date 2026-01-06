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
            notie.alert({ type: "error", text: error.message });
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
        notie.alert({ type: "error", text: error.message });
    }
}

function addToList(posterURL = "", loading = false) {
    let savedMovies = localStorage.getItem("movies");

    if (savedMovies != null) {
        savedMovies = JSON.parse(savedMovies);
    } else {
        savedMovies = {};
    }
    const $savedMoviesContainer = document.querySelector(
        "#movie-list-container"
    );
    const $savedMovies = document.querySelectorAll(".movie-list");

    if (posterURL == "") {
        const $poster = document.querySelector("#modal-poster");
        posterURL = $poster.src;
    }

    try {
        if (!loading) {
            for (let i = 0; i <= Object.values(savedMovies).length; i++) {
                if (savedMovies[i] == posterURL) {
                    throw new Error("Esse filme já esta na lista");
                }
            }
            saveMovie(posterURL, savedMovies);
        }

        $savedMoviesContainer.innerHTML += `
                    <div id="movie-index-${$savedMovies.length}" class="movie-container movie-list">
                    <img src="${posterURL}" alt="Poster do filme" />
                    <button id="remove-button" onclick="removeMovie(this)">Remover Filme</button>
                    </div>`;

        closeModal();
    } catch (error) {
        notie.alert({ type: "error", text: error.message });
    }
}

function removeMovie(element) {
    const $savedMoviesContainer = document.querySelector(
        "#movie-list-container"
    );
    const $movieDiv = element.parentNode;
    let savedMovies = localStorage.getItem("movies");
    savedMovies = JSON.parse(savedMovies);

    $movieDiv.classList.add("hidden");

    setTimeout(() => {
        $savedMoviesContainer.removeChild($movieDiv);
    }, 3 * 2000);

    const posterURL = $movieDiv.querySelector("img").src;

    for (i of Object.keys(savedMovies)) {
        if (savedMovies[i] == posterURL) {
            delete savedMovies[i];
            localStorage.setItem("movies", JSON.stringify(savedMovies));
        }
    }
    window.location.reload();
}

function saveMovie(posterURL, savedMovies) {
    const tam = Object.values(savedMovies).length;

    savedMovies[tam] = posterURL;
    localStorage.setItem("movies", JSON.stringify(savedMovies));
}

function loadMovies() {
    let savedMovies = localStorage.getItem("movies");
    savedMovies = JSON.parse(savedMovies);

    if (savedMovies != null) {
        for (data of Object.values(savedMovies)) {
            addToList(data, true);
        }
    }
}
