const $modalOverlay = document.querySelector("#modal-overlay");
const $modalContainer = document.querySelector("#modal-container");
const $modalButton = document.querySelector("#modal-button");

function closeModal() {
    $modalOverlay.classList.add("hidden");
}

function openModal(movie) {
    $modalContainer.innerHTML = `
                    <h2>${movie.Title} - ${movie.Year}</h2>
                    <section id="modal-main">
                        <img
                            id="modal-poster"
                            src="${movie.Poster}"
                            alt="Poster do filme"
                        />
                        <div id="movie-info">
                            <div>
                                <h3>${movie.Plot}</h3>
                            </div>
                            <div id="movie-genre">
                                <h4>Gênero</h4>
                                <p>${movie.Genre}</p>
                            </div>
                            <div id="movie-cast">
                                <h4>Elenco</h4>
                                <p>${movie.Actors}</p>
                            </div>
                        </div>
                    </section>
                    <section id="modal-footer">
                        <button id="modal-button" onclick="addToList()">Adicionar Filme</button>
                    </section>`;

    $modalOverlay.classList.remove("hidden");
}
