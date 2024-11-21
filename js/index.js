let tiragePokemon=[]
let nb_click = 0;
let click1 = "";
let id1 = "";


//-----------------------------//
// Création du tableau de jeu //
//---------------------------//

for (let i = 0; i < 6; i++) {
    const tirage = Math.round((Math.random() * 199)+1);
    tiragePokemon.push([tirage]);
}

let tirageAvecDoublon = tiragePokemon.concat(tiragePokemon); 

for (let i = tirageAvecDoublon.length - 1; i >= 0; i--) {          // Mélange tirageAvecDoublon méthode Fisher-Yates
    const j = Math.floor(Math.random() * (i + 1));
    [tirageAvecDoublon[i], tirageAvecDoublon[j]] = [tirageAvecDoublon[j], tirageAvecDoublon[i]];
}
console.log(tirageAvecDoublon)

for (let i = 0; i < tirageAvecDoublon.length; i++) {
    card = document.createElement("div");
    card.className = "card";
    cardImage = document.createElement("img");
    cardImage.id = i + 1
    cardImage.className = tirageAvecDoublon[i]
    cardImage.src = "src/img/dessus.png"
    // cardImage.src = "img/Pokemon" + finalArray[i] + ".png";
    card.appendChild(cardImage);
    board.appendChild(card);
}

document.querySelectorAll("img").forEach(function(img) {
    img.addEventListener("click", function() {
    
      // Change l'image de face
    this.src = "./src/img/Pokemon" + this.className + ".png";
    
    // Affiche l'adresse de l'image de face dans la console
    console.log("adresse img de face :", this.src);
  
      // Vérifie si c'est le premier clic
    if (nb_click === 0) {
        nb_click += 1;
        click1 = this.src;
        id1 = this.id;
        console.log(click1);
        console.log(id1);
        console.log("click:", nb_click);
    }
    });
});


