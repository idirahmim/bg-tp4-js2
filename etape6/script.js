"use strict;"
let lignes= 0;
let total_points=0;
const persons = [{nom:"nom-1",prenom:"prenom-1",points:5},
                    {nom:"nom-2",prenom:"prenom-2",points:10},
                    {nom:"nom-3",prenom:"prenom-3",points:15}];


function init(){
   persons.forEach((elem)=>{
   doInsert(elem.nom,elem.prenom,elem.points);

   });
    
}

function doInsert(nom,prenom,points){
lignes++;
total_points +=points;
doInsertRowTable(lignes,nom,prenom,points);
update_summary();

}



function doInsertRowTable(num,nom,prenom,points){
const table= document.querySelector('table tbody');

let row = document.createElement("tr");

row.setAttribute("class","row");
const col1 = document.createElement("td");
const col2 = document.createElement("td");
const col3 = document.createElement("td");
const col4 = document.createElement("td");
const col5 = document.createElement("td");

col1.innerText = num;
col2.innerText = nom;
col3.innerText = prenom;
col4.innerText = points;
const chkbx = document.createElement("input")
chkbx.setAttribute("type","checkbox");
col5.appendChild(chkbx);


col1.setAttribute("class","col_number");
col2.setAttribute("class","col_text");
col3.setAttribute("class","col_text");
col4.setAttribute("class","col_number");
col5.setAttribute("class","col_chkbox");

row.append(col1,col2,col3,col4,col5);

table.appendChild(row);

}
function consoleTableau(){
    console.log(persons);
}

function update_summary(){
    const element_lignes = document.querySelector("#p1");
    const element_points = document.querySelector("#p3");

    element_lignes.innerText =`${lignes} ligne(s) `;
    element_points.innerText = `Total point(s)= ${total_points} `;

}

function doNewData(){
 
const elt_nom = document.querySelector("#form_nom");
const elt_prenom = document.querySelector("#form_prenom");
const elt_points = document.querySelector("#form_points");


let nom = elt_nom.value;
let prenom = elt_prenom.value;
let points = parseInt(elt_points.value);
if(nom ==="" ||prenom ===""|| Number.isNaN(points)){
    alert("Formulaire incomplet !");
}
else{
doInsert(nom,prenom,points);

persons.push({nom,prenom,points});

elt_nom.value ="";
elt_prenom.vlaue ="";
elt_points.value ="";
}

}

function deleteRow(){
if (lignes === 0) {
        alert("Le tableau est vide !");
        return;
}
    const checkedBoxes = document.querySelectorAll('.col_chkbox input[type="checkbox"]:checked');
if (checkedBoxes.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
}
if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
        return;
}
const rows = document.querySelectorAll("table tbody tr");

rows.forEach((row, index) => {
 const checkbox = row.querySelector('.col_chkbox input[type="checkbox"]');
        
if (checkbox && checkbox.checked) {
const pointsCell = row.querySelectorAll("td")[3];
const pts = parseInt(pointsCell.innerText);

total_points -= pts;
lignes--;

row.remove();
persons.splice(index, 1);
}
    
});

    update_summary();
}



init()

