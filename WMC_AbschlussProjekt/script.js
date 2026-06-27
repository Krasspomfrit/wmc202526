let favoriteMovies = [];

const contentDiv = document.getElementById('content');
const btnHome = document.getElementById('nav-home');
const btnSearch = document.getElementById('nav-search');
const btnFavorites = document.getElementById('nav-favorites');

btnHome.addEventListener('click', () => {
    switchActiveTab(btnHome);
    renderHome();
});

btnSearch.addEventListener('click', () => {
    switchActiveTab(btnSearch);
    renderSearch();
});

btnFavorites.addEventListener('click', () => {
    switchActiveTab(btnFavorites);
    renderFavorites();
});

function switchActiveTab(activeBtn) {
    [btnHome, btnSearch, btnFavorites].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
    contentDiv.innerHTML = '';
}

function renderHome() {
    const title = document.createElement('h1');
    title.textContent = "Willkommen beim Film Info Hub!";
    const text = document.createElement('p');
    text.textContent = "Nutze die Suche, um nach deinen Lieblingsserien und -filmen zu suchen und speichere sie in deinen Favoriten.";

    contentDiv.appendChild(title);
    contentDiv.appendChild(text);
}

function renderSearch() {
    const title = document.createElement('h1');
    title.textContent = "Film- und Seriensuche";

    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Z.B. Batman, Breaking Bad...";
    input.style.padding = "10px";

    const searchBtn = document.createElement('button');
    searchBtn.textContent = "Suchen";
    searchBtn.className = "action-btn";
    searchBtn.style.marginLeft = "10px";

    const resultsDiv = document.createElement('div');

    searchBtn.addEventListener('click', () => {
        const query = input.value;
        if(!query) return;

        resultsDiv.innerHTML = "Lädt...";

        fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = '';

                if(data.length === 0) {
                    resultsDiv.textContent = "Keine Treffer gefunden.";
                    return;
                }

                data.forEach(item => {
                    const show = item.show;

                    const card = document.createElement('div');
                    card.className = "movie-card";

                    const info = document.createElement('span');
                    info.textContent = `${show.name} (Bewertung: ${show.rating.average || 'N/A'})`;

                    const favBtn = document.createElement('button');
                    favBtn.textContent = "Zu Favoriten hinzufügen";
                    favBtn.className = "action-btn";

                    favBtn.addEventListener('click', () => {
                        if(!favoriteMovies.includes(show.name)) {
                            favoriteMovies.push(show.name); // Array befüllen
                            alert(`${show.name} wurde hinzugefügt!`);
                        } else {
                            alert("Ist bereits in den Favoriten.");
                        }
                    });

                    card.appendChild(info);
                    card.appendChild(favBtn);
                    resultsDiv.appendChild(card);
                });
            });
    });

    contentDiv.appendChild(title);
    contentDiv.appendChild(input);
    contentDiv.appendChild(searchBtn);
    contentDiv.appendChild(resultsDiv);
}

function renderFavorites() {
    const title = document.createElement('h1');
    title.textContent = "Meine Favoriten";
    contentDiv.appendChild(title);

    if (favoriteMovies.length === 0) {
        const text = document.createElement('p');
        text.textContent = "Noch keine Favoriten gespeichert.";
        contentDiv.appendChild(text);
        return;
    }

    favoriteMovies.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = "movie-card";

        const info = document.createElement('span');
        info.textContent = movie;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Löschen";
        deleteBtn.className = "action-btn";

        deleteBtn.addEventListener('click', () => {
            favoriteMovies.splice(index, 1);
            renderFavorites();
        });

        card.appendChild(info);
        card.appendChild(deleteBtn);
        contentDiv.appendChild(card);
    });
}

renderHome();