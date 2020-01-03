// Mot clé JS pour que FETCH ne retourne pas une promesse mais LA RESOLUTION DE CETTE PROMESSE
// --> au lieu de l'objet qui est directement renvoyé par FETCH --> le travail se fait et on me donne ce qui es trouvé lors de ce travail
// donc AWAIT --> attend que tout une partie soit fini, pour enfin me renvoyer la dernière resolution (ex : json.ip) pour le mettre dans la CONST

// pour utiliser AWAIT il faut que la fonction soit déclarée ASYNC

// ASYNC/AWAIT permet de rendre une promese synchrone

const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-sunny",
  "Snow": "wi wi-day-snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
}


function capitalize (str){
  return str[0].toUpperCase() + str.slice(1);
}

//donne un param par défaut à la fonction main : withID

async function main(withIP = true){
  let ville; //car ne peux plus être une constante

  //si on travail sur l'IP
  //Alors allons chercher l'IP et la ville
if (withIP) {
  const ip = await fetch('https://api.ipify.org?format=json')
  .then(result => result.json())
  .then(json => json.ip)

// dans ma CONST ip : tu vas faire ce FETCH, qui va chercher l'adress IP
// mais tu vas attendre que le travail des .THEN soit fait
// et ce qui va dans ip c'est le resultat de tout ça

  ville = await fetch('https://freegeoip.app/json/' + ip)
  .then(result => result.json())
  .then (json => json.city)

} else {
  ville = document.querySelector('#ville').textContent;
}

  const meteo = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=a9b6909713aeb3552978b7534d2b5a34&lang=fr&units=metric`)
  .then(result => result.json ())
  .then (json => json)

  console.log(meteo);

  // 4. Afficher les informations
  displayWeatherInfos(meteo)

}

//Choisir les bons éléments retournés dans la console pour les afficher
function displayWeatherInfos(data){
  const name = data.name;
  const temperature = data.main.temp;
  const conditions = data.weather[0].main;
  const description = data.weather[0].description;

  // Affichage des élements sur la page
  document.querySelector('#ville').textContent = name;
  document.querySelector('#temperature').textContent = Math.round(temperature);
  document.querySelector('#conditions').textContent = capitalize(description);
  document.querySelector('i.wi').className = weatherIcons[conditions]; //en reprenant le tableau d'objet plus haut

  //Affichage des background-image
  document.body.className = conditions.toLowerCase();
}

// Editer le H1
const ville = document.querySelector('#ville');

ville.addEventListener('click',() => {
  ville.contentEditable = true;
});

// Bind de ENTER
ville.addEventListener('keydown', (e) => { //fonction qui prend en parametre l'evenement
  if(e.keyCode === 13) {//seulement pour le bouton ENTER qui a le code 13 (keycode.io)
    e.preventDefault(); //retire l'event par defaut de la touche (ici, aller à la ligne)
    ville.contentEditable = false;  // on arrête d'éditer

    //on rappel la fonction main avec false pour ne pas rentrer dans la condition
    main(false);
  }
})

main();




