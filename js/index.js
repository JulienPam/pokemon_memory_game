let tiragePokemon = [];
let nb_click = 0;
let click1 = "";
let id1 = "";
let handicap = 0;
let doubleCounter = window.innerWidth > 1000 ? 8 : 6;

//-----------------------------//
// Création du tableau de jeu //
//-----------------------------//

// Création du tableau de tirage aléatoire
for (let i = 0; i < doubleCounter; i++) {
    const tirage = Math.floor(Math.random() * 200) + 1;
    tiragePokemon.push(tirage);
}

// Double les cartes pour former les paires
let tirageAvecDoublon = tiragePokemon.concat(tiragePokemon);

// Mélange les cartes (méthode Fisher-Yates)
for (let i = tirageAvecDoublon.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tirageAvecDoublon[i], tirageAvecDoublon[j]] = [tirageAvecDoublon[j], tirageAvecDoublon[i]];
}

// Affiche les cartes sur le tableau de jeu
const board = document.getElementById("board"); // Assure-toi que cet élément existe dans le HTML
for (let i = 0; i < tirageAvecDoublon.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImage = document.createElement("img");
    cardImage.id = i;
    cardImage.dataset.pokemonId = tirageAvecDoublon[i];
    cardImage.src = "src/img/dessus.png";
    card.appendChild(cardImage);
    board.appendChild(card);
}

// Gestion des clics sur les cartes
document.querySelectorAll("img").forEach(function(img) {
    img.addEventListener("click", function() {
        // Change l'image pour afficher le Pokémon
        this.src = "./src/img/Pokemon" + this.dataset.pokemonId + ".png";
        
        // Vérifie le premier clic
        if (nb_click === 0) {
            nb_click += 1;
            click1 = this.dataset.pokemonId;
            id1 = this.id;
        } else {
            // Deuxième clic
            const click2 = this.dataset.pokemonId;
            const id2 = this.id;
            
            if (id1 === id2) return; // Empêche de cliquer deux fois sur la même carte
            
            if (click1 !== click2) {
                // Mauvaise paire
                handicap += 1;
                document.getElementById("handicap").textContent = handicap;
                
                setTimeout(() => {
                    document.getElementById(id1).src = "src/img/dessus.png";
                    document.getElementById(id2).src = "src/img/dessus.png";
                }, 1000);
            } else {
                // Bonne paire trouvée
                doubleCounter -= 1;
                setTimeout(() => {
                    document.getElementById(id1).style.opacity = 0;
                    document.getElementById(id2).style.opacity = 0;
                }, 600);
            }
            
            nb_click = 0;
            
            // Victoire
            if (doubleCounter === 0) {
                const finalBox = document.createElement("div");
                finalBox.className = "finalbox";
                finalBox.innerHTML = "Vous avez gagné";
                
                const button = document.createElement("button");
                button.textContent = "Rejouer";
                button.className = "btn";
                button.addEventListener("click", function() {
                    location.reload();
                });
                
                finalBox.appendChild(button);
                document.querySelector("main").prepend(finalBox);
            }
        }
    });
});