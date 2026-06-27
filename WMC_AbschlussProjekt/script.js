

let pokemonTeam = [];

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
    title.textContent = "Willkommen im Pokédex Hub!";
    
    const text = document.createElement('p');
    text.textContent = "Suche nach Pokémon, sieh dir ihre Typen an und stelle dein eigenes Pokémon-Team zusammen.";
    
    const introImg = document.createElement('img');
    introImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
    introImg.style.width = "200px";
    
    contentDiv.appendChild(title);
    contentDiv.appendChild(text);
    contentDiv.appendChild(introImg);
}

function renderSearch() {
    const title = document.createElement('h1');
    title.textContent = "Pokémon-Suche";
    
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Z.B. pikachu, charizard, Gengar...";
    
    const searchBtn = document.createElement('button');
    searchBtn.textContent = "Suchen";
    searchBtn.className = "action-btn";
    searchBtn.style.marginLeft = "10px";
    
    const resultsDiv = document.createElement('div');

    searchBtn.addEventListener('click', () => {
        const query = input.value.trim().toLowerCase();
        if(!query) return;

        resultsDiv.innerHTML = "<p>Suche im hohen Gras...</p>";

        fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
            .then(response => {
                if (!response.ok) throw new Error("Nicht gefunden");
                return response.json();
            })
            .then(pokemon => {
                resultsDiv.innerHTML = '';
                
                const card = document.createElement('div');
                card.className = "pokemon-card";
                
                const name = document.createElement('h2');
                name.textContent = pokemon.name.toUpperCase();
                
                const img = document.createElement('img');
                img.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
                img.className = "pokemon-img";
                
                const types = pokemon.types.map(t => t.type.name).join(', ');
                const typeInfo = document.createElement('p');
                typeInfo.innerHTML = `<strong>Typ:</strong> ${types}`;
                
                const heightInfo = document.createElement('p');
                heightInfo.innerHTML = `<strong>Größe:</strong> ${pokemon.height / 10} m | <strong>Gewicht:</strong> ${pokemon.weight / 10} kg`;

                const favBtn = document.createElement('button');
                favBtn.textContent = "In mein Team aufnehmen";
                favBtn.className = "action-btn";
                
                favBtn.addEventListener('click', () => {
                    const exists = pokemonTeam.some(p => p.name === pokemon.name);
                    if(!exists) {
                        pokemonTeam.push({
                            name: pokemon.name,
                            img: pokemon.sprites.front_default
                        });
                        alert(`${pokemon.name.toUpperCase()} wurde deinem Team hinzugefügt!`);
                    } else {
                        alert("Dieses Pokémon ist bereits in deinem Team.");
                    }
                });

                // Alles zusammenbauen
                card.appendChild(name);
                card.appendChild(img);
                card.appendChild(typeInfo);
                card.appendChild(heightInfo);
                card.appendChild(favBtn);
                resultsDiv.appendChild(card);
            })
            .catch(() => {
                resultsDiv.innerHTML = "<p style='color: #ff1c1c;'>Pokémon wurde nicht gefunden. Achte auf die richtige Schreibweise auf Englisch!</p>";
            });
    });

    contentDiv.appendChild(title);
    contentDiv.appendChild(input);
    contentDiv.appendChild(searchBtn);
    contentDiv.appendChild(resultsDiv);
}

function renderFavorites() {
    const title = document.createElement('h1');
    title.textContent = "Mein Pokémon-Team";
    contentDiv.appendChild(title);

    if (pokemonTeam.length === 0) {
        const text = document.createElement('p');
        text.textContent = "Dein Team ist noch leer. Gehe zur Suche, um Pokémon zu fangen!";
        contentDiv.appendChild(text);
        return;
    }

    const teamGrid = document.createElement('div');
    teamGrid.style.display = "flex";
    teamGrid.style.flexWrap = "wrap";
    teamGrid.style.justifyContent = "center";

    pokemonTeam.forEach((pokemon, index) => {
        const card = document.createElement('div');
        card.className = "pokemon-card";
        card.style.margin = "10px";
        card.style.width = "180px";

        const name = document.createElement('h3');
        name.textContent = pokemon.name.toUpperCase();

        const img = document.createElement('img');
        img.src = pokemon.img;
        img.style.width = "96px";

        const releaseBtn = document.createElement('button');
        releaseBtn.textContent = "Freilassen";
        releaseBtn.className = "action-btn";
        releaseBtn.style.backgroundColor = "#555";
        
        releaseBtn.addEventListener('click', () => {
            pokemonTeam.splice(index, 1);
            renderFavorites();
        });

        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(releaseBtn);
        teamGrid.appendChild(card);
    });

    contentDiv.appendChild(teamGrid);
}

renderHome();