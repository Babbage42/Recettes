/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("coucou !!!");
    // Cordova is now initialized. Have fun!
    /*console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');*/
    //recognizeText();
}

function recognizeText()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100, correctOrientation: true });
}
function onSuccess(imageData) {
      mltext.getText(textOnSuccess, textOnFail,{imgType : 0, imgSrc : imageData});
      // for imgType Use 0,1,2,3 or 4
      
}
function onFail(message) {
      alert('Failed because: ' + message);
}

function textOnSuccess(recognizedText) {
    //var element = document.getElementById('pp');
    //element.innerHTML=recognizedText.blocks.blocktext;
    //Use above two lines to show recognizedText in html
    console.log(recognizedText);
    
    let text = analyze(recognizedText.blocks.blocktext);
    
    document.getElementById('objet').innerHTML = JSON.stringify(recognizedText);
    
    document.getElementById('resultat').innerHTML =  (recognizedText.lines.linetext);
}
function textOnFail(message) {
    alert('Failed because: ' + message);
}


var listeIngredients = ["BOUILLON DE CUISSON","CUBE DE BOUILLON","CLOU DE GIROFLE","TOMATE","PENNE","SPAGHETTI","LINGUINE","FARINE","OEUF","SAUCISSE","VEAU","POULET","GUANCIALE","PARMESAN","JUS DE CITRON","CITRON","CREME FRAICHE","CRèME FRAîCHE","MARGARINE","OIGNON","CAROTTE","FENOUIL","ECHALOTE","POIVRE","SEL","LARD FUM","HUILE D'OLIVE","VIN BLANC","VIN ROUGE","THYM","LAURIER","PERSIL","CURRY","CURCUMA","EAU"];


let text = `
INGRÉDIENTS : 4 PERS.
2 saucisses de Morteau
200 g de tomates concassées
1 oignon
100 ml d’eau
1 demi c. à café de piment de Cayenne en poudre
1 branche de thym
1 c. à café de curcuma
5 g de gingembre frais
1 c. à soupe d’huile d’olive
PRÉPARATION :
Préparation
5 min
Cuisson
10 min

1.
Coupez les saucisses en rondelles. Épluchez et émincez l’oignon.

GESTES TECHNIQUES

Émincer ses légumes

Tailler un oignon
2.
Dans la cuve du Cookeo, mettez l’huile d’olive, les saucisses de Morteau, l’oignon puis démarrez le mode dorer. Laissez revenir 2 minutes.

3.
Ajoutez les tomates concassées, l’eau, le piment, le curcuma, le gingembre frais, le thym, puis programmez 8 minutes en cuisson sous pression.

4.
Rectifiez l’assaisonnement puis servez.
`;
/*
let text = `1 h 45
Facile
0 commentaire

Pour le repas de ce soir, réalisez un incontournable de la cuisine française: une blanquette de veau en sauce. Pourquoi ? Une viande tendre et fondante en bouche accompagnée d'une sauce onctueuse et gourmande. Un grand classique qui pourtant fait toujours autant des heureux ! Peut-être vous d'ailleurs ?

INGRÉDIENTS : 4 PERS.
1 kg de veau en morceaux
1 carotte
1 oignon
1/2 citron
30 g de margarine
30 g de farine
1/2 l de bouillon de cuisson du veau
2 c. à soupe de crème fraîche
1 jus de citron
1 clou de girofle
1 bouquet garni (persil, thym, laurier)
sel, poivre
PRÉPARATION :
Préparation
15 min
Cuisson
1 h 30 min

1.
Frottez les morceaux de viande avec le 1/2 citron afin qu'ils restent blancs. Mettez-les dans une casserole d'eau froide avec la carotte, l'oignon piqué du clou de girofle, le bouquet garni, le sel, le poivre. Portez à ébullition. Couvrez puis laissez mijoter doucement 1 h 15. Écumez pendant la cuisson.

GESTES TECHNIQUES

Tailler un oignon
2.
Préparez la sauce : 30 min avant la fin de la cuisson de la viande, mélangez dans une casserole à feu doux, la margarine et la farine. Ajoutez-y 1/2 litre de bouillon de blanquette. Remuez jusqu'à ébullition avec une cuillère en bois. Laissez mijoter 10 min à feu doux. Puis, hors du feu, ajoutez la crème fraîche et le jus de citron.

3.
Égouttez bien la viande à la fin de la cuisson puis déposez-la sur un plat chaud, ajoutez les oignons et carottes. Recouvrez le tout de sauce. Saupoudrez, si possible, avec un peu de persil haché. Servez avec du riz nature cuit 17 min à l'eau bouillante salée ou des pommes de terre cuites 30 min dans le bouillon de la blanquette, et en même temps qu'elle.`;
*/

analyze(text);

function analyze(text)
{
    

    let r = /(\d{1,2}) pers/gi;
    let nbPersonnes = r.exec(text);
    if(nbPersonnes) nbPersonnes = nbPersonnes[1];

    
    r = /aration(?:\s|:|\n)(?:\s|\D|\n){0,1}(?:\s|\n){0,1}(\d{1,2}\s{0,1}min)/gi;
    let prepa = r.exec(text);
    console.log(prepa);
    if(prepa) prepa = prepa[1];


    r = /cuisson(?:\s|:|\n)(?:\s|\D|\n){0,1}(?:\s|\n){0,1}(\d{1,2}\s{0,1}min)/gi;
    let cuisson = r.exec(text);
    console.log(cuisson);
    if(cuisson) cuisson = cuisson[1];
    

    var m;

    /************** CHOPER ETAPES *************/
    
    let etapes = [];

    r = /(?:\d{1,2}\.|\d{1,2}\)|\d{1,2}\n|TAPE\s\d{1,2})((.|\n(?!(\d{1,2}\.|\d{1,2}\)|\d{1,2}\n|TAPE\s\d{1,2})))*)/gi;

    do {
        m = r.exec(text);
        //console.log("etape:",m);
        if (m) {
            //console.log(m[1], m[2]);
            etapes.push(m[1]);
        }
    } while (m);


    


    /****** CHOPER INGREDIENTS *******/

    let ingredients = [];

    //console.log(text.split("\n"));

    r = /(ingré((?!1\.|1\)|1\n|TAPE\s1).|\n)*)/gi;

    m = r.exec(text);

    let textIngredients = m[1];
    let lignesIngredients = textIngredients.split("\n");
    for(let ligne of lignesIngredients)
    {
        let ingredient = searchIngredient(ligne);
        if(ingredient) ingredients.push(ingredient);
    }





    
    console.log("lignesIngredients:",lignesIngredients);
    console.log("choper etapes:",etapes);
    console.log("nbpersonnes:",nbPersonnes);
    console.log("temps de préparation:",prepa);
    console.log("temps de cuisson:",cuisson);
    console.log("ingrédients:",ingredients);
}

function searchIngredient(text)
{
    for(let ing of listeIngredients)
    {
        let r = new RegExp('('+ing+')','gi'); //(\s|\w)*
        let m = r.exec(text);
        
        if(m)
        {
            console.log(m);

            let ingrédient = m[1];
            let quantite = searchQuantite(text,ingrédient);

            let nom = text.replace(quantite,"");
            //nom = nom.replace("de","");
            //nom = nom.replace("d'","");
            nom = nom.trim();

            return {"ingredient":ingrédient,"nom":nom,"qt":quantite};
        }
    }
}

function searchQuantite(text,nom)
{
    let r = /(\d+\/{0,1}\d{0,1}\s{0,1}(mg|kg|g|L|ml|cl|dl|l|c. à soupe|c. à café|c. à s.|c. à c.){0,1}\s)/g;

    let m = r.exec(text);

    if(m) return m[1].trim();
    else return null;
}

var ref;
var script;

var dico;

function startNavigation()
{
    ref = cordova.InAppBrowser.open('https://www.marmiton.org/recettes/recette_quiche-lorraine_30283.aspx', '_blank', 'EnableViewPortScale=yes', 'location=no');

    ref.addEventListener('loadstart', function() {
    });
    ref.addEventListener('loadstop', function() {
        ref.executeScript({code: "document.querySelector('script[type=\"application/ld+json\"]').innerHTML;"},
        function( values ) {
            dico = values;
            console.log("dico:",dico);
            
        });
    });
}