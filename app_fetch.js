//Fonction fetch : permet aller récupérer des informations auprès d'un serveur distant --> PROMESS dans la console
// Avec then : renvoie une  RESPONSE avec des données du serveurs, à exploiter avec la function json (console)
function capitalize (srt){
  return str[0].toUpperCase() + str.slice(1);
}

function main () {
  // 1. Prendre l'adresse IP du PC qui ouvre la page : https://api.ipify.org?format=json

  fetch('https://api.ipify.org?format=json')
  .then(result => result.json())      // comme le json renvoie aussi une promesse !
    .then(json => {                   // on peut lui lié aussi un .then pour récuperer vraiment les informations --> console.log(json.ip)) par exemple
      const ip = json.ip;

      // 2. Prendre la ville grâce à l'adresse IP : https://freegeoip.app/json/adresseIPduPC
      fetch('https://freegeoip.app/json/' + ip)
        .then(result => result.json())
        .then (json => {
          const ville = json.city;


          // 3. Prendre les infos météo grâce à la ville : http://api.openweathermap.org/data/2.5/weather?q=VilleduPC&appid=APIKEY&lang=fr&units=metric
          fetch (`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=a9b6909713aeb3552978b7534d2b5a34&lang=fr&units=metric`)
            .then(result => result.json ())
            .then (json => {
              // 4. Afficher les informations
              console.log(json);
            })
        })
      })

      //Premier .THEN :  tu reçois un result que tu transform en json
      //Deuxieme .THEN : quand tu auras terminé de transform le result en json --> console.log(json) = affiche les informations
      // afficher la ville --> si console.log(json.city) = affiche bien PARIS
}

main ();