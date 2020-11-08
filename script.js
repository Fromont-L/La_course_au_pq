var gagnants = [false, false, false, false, false, false];
var firsts = [false, false, false, false, false, false];

//Génération d'un tableau
function generateTable() {
  let table = document.getElementById("tableau");
  var couleurs = ['#C10001', '#FFC001', '#197EC6', '#01B051', '#F08B47', '#7E44AA'];
  for (var i = 0; i < 6; i++) {
    let row = table.insertRow();
    for (var j = 0; j < 9; j++) {
      let cell = row.insertCell();
      cell.style.backgroundColor = couleurs[i];
      var img = document.createElement("img");
      img.src = "pq/Caddie" + (j+1).toString() + ".png";
      img.id = i.toString() + "-" + j.toString();
      img.classList.add("caddie");
      if (j > 0) {
        img.style.visibility="hidden";
      } else {
        img.style.visibility="visible";
      }
      cell.appendChild(img);
    }
  }
}

//Boutons de règles afficher/masquer
function togg(element){
  let cetelem = document.getElementById(element);
  if(getComputedStyle(cetelem).display != "none"){
    cetelem.style.display = "none";
  } else {
    cetelem.style.display = "block";
  }
};

//Dés 1 et 2, réagit avec la fonction suivante
function random() {
  document.getElementById("choixreg").disabled = true;
  var dice1 = Math.floor (Math.random()*6);
  var dice2 = Math.floor (Math.random()*6);
  let img_d1 = document.getElementById("d1");
  let img_d2 = document.getElementById("d2");
  img_d1.src = "pq/" + (dice1+1).toString() + ".png";
  img_d2.src = "pq/" + (dice2+1).toString() + ".png";
  avance(dice1);
  avance(dice2);
  ptetlafin();
}

//Cache toutes les cases sauf l'endroit où se situe le "pion" sur le plateau
function avance(caddie) {
  var colonne = 0;
  while (document.getElementById(caddie.toString() + "-" + colonne.toString()).style.visibility =="hidden"){
    colonne ++;
  }
  if (colonne < 8){ 
    var id1 = caddie.toString() + "-" + colonne.toString();
    var id2 = caddie.toString() + "-" + (colonne+1).toString();
    document.getElementById(id1).style.visibility ="hidden";
    document.getElementById(id2).style.visibility ="visible";
  }
}

//Désigne un ou plusieurs gagnants
function ptetlafin() {
  
  var gagnants_temp = gagnants.slice();
  for (var i = 0; i < 6; i++){
    for (var j = 0; j < 9; j++){
      var id = i.toString() + "-" + j.toString();
      if (j == 8 && document.getElementById(id).style.visibility =="visible" ){
        gagnants[i] = true;
      }
    }
  }
  if (document.getElementById("choixreg").checked == true){
    if (!(gagnants_temp.includes(true)) && gagnants.includes(true)){
      firsts = gagnants.slice();
    }
    if (!(gagnants.includes(false))){
      var resultat= [false, false, false, false, false, false];
      for (var k=0; k < 6; k++){
        if (firsts[k] == true || gagnants_temp[k] == false){
          resultat[k] = true;
        }
      }
      affichegagnants(resultat);
    }
  }
  else {

    if (gagnants.includes(true)){
      affichegagnants(gagnants);
    }
  }
  console.log(gagnants);
  console.log(gagnants_temp);
  console.log(firsts);
}

//Affiche le nom de la couleur du ou des gagnants
function affichegagnants(liste){
  var couleurs =["rouge","jaune","bleu","vert","orange","violet"];
  document.getElementById("nospam").disabled ='true';
  document.getElementById("pqwin").style.display ="block";
  var nbgagnant = 0;
  var text = "";
  for (var i = 0; i < 6; i++){
    if (liste[i] && nbgagnant == 0){
      text = text + couleurs[i];
      nbgagnant++;
    }
    else if(liste[i]){
      text = text + " et " + couleurs[i];
      nbgagnant++;
    }
    var span = document.getElementById('textwin')
    span.style.fontSize = '26px' // Font-size à 30px
    span.style.fontFamily = 'Comic sans MS' // Changement de police
    span.style.fontStyle = 'strong' // Changement de "style"
    span.style.fontShadow = 'pink'
    span.style.testShadow = 'pink, 20px'
  }
  if (nbgagnant == 1){
    text = "Le gagnant est : " + text;
  }
  else {
    text = "Les gagnants sont : " + text;
  }
  document.getElementById("textwin").innerHTML =text;
}

//Recommencer en fin de partie
function reset(){
  togg("pqwin");
  gagnants = [false, false, false, false, false, false];
  firsts = [false, false, false, false, false, false];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 6; j++) {
      var id = j.toString() + "-" + i.toString();
      if (i == 0){
        document.getElementById(id).style.visibility = "visible";
      }
      else {
        document.getElementById(id).style.visibility = "hidden";
      }
    }
  }
  document.getElementById("nospam").disabled = false;//empêche un bug
  document.getElementById("choixreg").disabled = false;//empêche changement de règle en jeu
}

