// Mode strict (slide 51, bonnes pratiques slide 141).
"use strict;"
// Déclaration de variables avec let (slide 51) ; types primitifs number / boolean (slide 37)
let lignes= 0;
let total_points=0;
let sortAsc = true;
// Constante avec const (slide 51) ; Tableau d'objets (slide 40) ; Objets littéraux {clé:valeur} (slide 39)
const persons = [{nom:"nom-1",prenom:"prenom-1",points:5},
                    {nom:"nom-2",prenom:"prenom-2",points:10},
                    {nom:"nom-3",prenom:"prenom-3",points:15}];


// Définition d'une fonction (slides 45-46) ; pas de fonction main() en JS : le code est exécuté de haut en bas (slide 33)
function init(){
   // forEach : boucle sur un tableau (slide 44) avec une fonction fléchée (slide 46) passée en callback (slide 47)
   persons.forEach((elem)=>{
   // Accès aux propriétés d'un objet avec la notation pointée (slide 39)
   doInsert(elem.nom,elem.prenom,elem.points);

   });
    
}

// Fonction avec paramètres (slide 45)
function doInsert(nom,prenom,points){
// Opérateur d'incrémentation (slide 41) : variable globale modifiée dans une fonction (portée globale, slide 50)
lignes++;
// Opérateur combiné += (slide 41)
total_points +=points;
// Appel d'une autre fonction (slide 45)
doInsertRowTable(lignes,nom,prenom,points);
update_summary();

}



function doInsertRowTable(num,nom,prenom,points){
// Retrouver un élément HTML par sélecteur CSS avec querySelector (slides 76-78) ; DOM (slides 55-56)
const table= document.querySelector('table tbody');

// Création d'un élément HTML à partir de zéro avec createElement (slide 104)
let row = document.createElement("tr");

// setAttribute : modifier/ajouter un attribut d'un élément (slide 107)
row.setAttribute("class","row");

// Fonctionnalité 3 (partie survol) : événements onmouseover et onmouseout
// Événement onmouseover (au survol) attaché à l'élément (slides 136-137, 140) ; traitement via une fonction anonyme (slide 46)
row.onmouseover = function () {
    // Modifier le style CSS via la propriété style (slides 94-95)
    row.style.backgroundColor = "#eef5ff";
};
 // Événement onmouseleave (quand l'élément n'est plus survolé) (slide 140)
 row.onmouseleave = function () {
    // Remise à vide du style (on retire la couleur) via style (slides 94-95)
    row.style.backgroundColor = "";
};

// Création de plusieurs éléments td (slide 104)
const col1 = document.createElement("td");
const col2 = document.createElement("td");
const col3 = document.createElement("td");
const col4 = document.createElement("td");
const col5 = document.createElement("td");

// innerText : modifier le contenu textuel d'un élément (slides 90-91)
col1.innerText = num;
col2.innerText = nom;
col3.innerText = prenom;
col4.innerText = points;
// Création d'un élément input (slide 104) et définition de son type avec setAttribute (slide 107)
const chkbx = document.createElement("input")
chkbx.setAttribute("type","checkbox");
// Fonctionnalité 1 : met à jour le compteur dans #p2 quand on coche/décoche
// Événement onchange (changement d'état) (slides 136, 138-139) avec un traitement sous forme de fonction (slide 134)
chkbx.onchange = function () {
     compterSelection();
};


// appendChild : ajouter un élément enfant à la fin (slides 103-104)
col5.appendChild(chkbx);


// Attribut class défini avec setAttribute (slide 107)
col1.setAttribute("class","col_number");
col2.setAttribute("class","col_text");
col3.setAttribute("class","col_text");
col4.setAttribute("class","col_number");
col5.setAttribute("class","col_chkbox");

// append : ajouter plusieurs éléments à la fin, méthode plus simple (slides 97-98)
row.append(col1,col2,col3,col4,col5);

// Insertion dans le DOM de la ligne créée (slides 103-104)
table.appendChild(row);

}
function consoleTableau(){
    // console.log : affichage dans la console des outils de développement (slide 33)
    console.log(persons);
}

function update_summary(){
    // Retrouver des éléments par identifiant via un sélecteur CSS (#id) (slides 76-78) ; (voir aussi getElementById, slides 61-64)
    const element_lignes = document.querySelector("#p1");
    const element_points = document.querySelector("#p3");

    // innerText + template literals `...${variable}` (slides 91 et 141)
    element_lignes.innerText =`${lignes} ligne(s) `;
    element_points.innerText = `Total point(s)= ${total_points} `;

}

function doNewData(){
 
// Récupération des champs du formulaire avec querySelector (slides 76-78)
const elt_nom = document.querySelector("#form_nom");
const elt_prenom = document.querySelector("#form_prenom");
const elt_points = document.querySelector("#form_points");


// Propriété value d'un champ de saisie : attribut accessible directement par son nom (slides 92-93)
let nom = elt_nom.value;
let prenom = elt_prenom.value;
// parseInt : conversion String -> number (typage faible et dynamique, slides 31 et 37)
let points = parseInt(elt_points.value);
// Condition if...else (slide 42) ; opérateurs logiques || et de comparaison stricte === (slides 41 et 141)
// Number.isNaN : vérifie que la conversion a réussi (types primitifs, slide 37)
if(nom ==="" ||prenom ===""|| Number.isNaN(points)){
    // alert : boîte d'alerte du BOM (objet window, pop-ups, slide 116)
    alert("Formulaire incomplet !");
}
else{
doInsert(nom,prenom,points);

// push : méthode utile des tableaux (slide 38) ; objet littéral avec propriétés abrégées {nom,prenom,points} (slide 39)
persons.push({nom,prenom,points});

// Vider les champs en modifiant leur propriété value (slides 92-93)
elt_nom.value ="";
elt_prenom.value ="";
elt_points.value ="";
}

}

function deleteRow(){
// Condition if (slide 42) avec comparaison stricte === (slides 41 et 141)
if (lignes === 0) {
        alert("Le tableau est vide !");
        // return : sortie de la fonction (slide 45)
        return;
}
    // querySelectorAll : retourne une collection d'éléments selon un sélecteur CSS (slides 76-78) ; pseudo-classe :checked (sélecteur CSS)
    const checkedBoxes = document.querySelectorAll('.col_chkbox input[type="checkbox"]:checked');
// length : taille de la collection (slide 38)
if (checkedBoxes.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
}
// confirm : boîte de dialogue du BOM (window, pop-ups, slide 116) ; opérateur logique ! (slide 41)
if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
        return;
}
// Retrouver plusieurs éléments : collection à parcourir (slides 79-83)
const rows = document.querySelectorAll("table tbody tr");

// forEach avec fonction fléchée en callback (slides 44, 46-47) ; boucle sur une collection (slide 82)
rows.forEach((row, index) => {
 // Retrouver un élément enfant à partir de l'élément courant (slides 76-78, 85-86)
 const checkbox = row.querySelector('.col_chkbox input[type="checkbox"]');
        
// Condition if (slide 42) ; opérateur logique && ; propriété checked (attribut accessible directement, slides 92-93)
if (checkbox && checkbox.checked) {
// Collection de td indexée à partir de 0 avec [3] (slide 68) ; navigation dans l'arbre DOM (slides 88-89)
const pointsCell = row.querySelectorAll("td")[3];
// Lecture du contenu avec innerText (slide 91) et conversion en nombre avec parseInt (slides 31 et 37)
const pts = parseInt(pointsCell.innerText);

// Opérateurs combiné -= et de décrémentation -- (slide 41)
total_points -= pts;
lignes--;

// remove : supprimer l'élément du DOM (slides 99-100)
row.remove();
// splice : méthode utile des tableaux pour supprimer des éléments (slide 38)
persons.splice(index, 1);
}
    
});

    update_summary();
}
// Fonctionnalité 1 : compter les cases cochées et afficher dans #p2
function compterSelection() {
// querySelectorAll : collection de cases à cocher (slides 76-78)
const cases = document.querySelectorAll('table tbody .col_chkbox input[type="checkbox"]');
let nbCoches = 0;

// Boucle for classique (slide 44) parcourant une collection (slide 82)
for (let i = 0; i < cases.length; i++) {
    // Condition if (slide 42) ; propriété checked (slides 92-93)
    if (cases[i].checked) {
     nbCoches = nbCoches + 1;
    }
}

    // getElementById : retrouver un élément par son identifiant (slides 61-64) ; innerText + template literal (slides 91 et 141)
    document.getElementById("p2").innerText = `${nbCoches} sélectionné(s)`;
}
// Fonctionnalité 2 : cocher toutes les cases du tableau
function cocherTout() {
const cases = document.querySelectorAll('table tbody .col_chkbox input[type="checkbox"]');
// Boucle for (slide 44) sur une collection d'éléments (slide 82)
for (let i = 0; i < cases.length; i++) {
    // Modification d'une propriété (attribut) d'un élément (slides 92-93)
    cases[i].checked = true;
}

    // Mise à jour du compteur (appel de fonction, slide 45)
    compterSelection();
}
// Fonctionnalité 3 (partie classList) : ajouter/retirer la classe .ligne_marquee sur les lignes cochées
function marquerSelection() {
const rows = document.querySelectorAll("table tbody tr");

// Boucle for (slide 44)
for (let i = 0; i < rows.length; i++) {
const chkbx = rows[i].querySelector('.col_chkbox input[type="checkbox"]');
    if (chkbx && chkbx.checked) {
    // classList.toggle : ajoute la classe si absente, la retire si présente (slide 108)
    rows[i].classList.toggle("ligne_marquee");
    }
}
}





// Appel de init() en fin de script : le script s'exécute de haut en bas (slide 33) ;
// placé en fin de body (ou avec defer / DOMContentLoaded) pour que le DOM soit chargé (slides 26-27)
init()