
/* this file contains the functions that call the 
api and create the home page */

import { auth } from "./module/AuthenticationData.js";
import { favoriteClickHandler } from "./module/favouriteclickhandler.js"


let offset = 0;
const limit = 15;
let pagenumber = 0;

let loader = document.getElementById("loader-container");
let characterData = document.getElementById("character-data");


async function fetchCharacters() {
    const baseUrl = "https://gateway.marvel.com";
    let getCharacterApi = "/v1/public/characters";

    let getApi = `${baseUrl}/${getCharacterApi}?${auth}&limit=${limit}&offset=${offset}`;
    let jsonData;
    
    try {
        let response = await fetch(getApi);
        try {
            jsonData = await response.json();
        } catch(e) {
            console.log(`unable to parse json - ${e}`);
        }
        loadAllCharacters(jsonData);
    } catch(e) {
        console.log(`Unable to load - ${e}`);
    }
}

function displayLoader() {
    
}


function loadAllCharacters(jsonData) {
    let cell = 0;
    let results = jsonData.data.results;
    console.log(results);
    let parent;
    for (let idx = 0; idx < results.length; idx++) {
        if (cell == 0) {
            parent = document.createElement("div");
            parent.setAttribute("class", "characters-row");
        }
        let newChild = document.createElement("div");
        if (cell == 0) {
            newChild.style.marginLeft = "0";
        }
        newChild.setAttribute("id", results[idx].id);
        newChild.setAttribute("class", "characters");

        let heroImage = results[idx].thumbnail;

        newChild.innerHTML = `
        <img class="img-style" src="${heroImage.path}.${heroImage.extension}" alt="HeroLogo">
        <div class="about-hero">
            <div class="hero-name">${results[idx].name}</div>
            <img class="fav-icon" src="/assets/tile002.png">
        </div>`;

        parent.appendChild(newChild);
        cell++;
        if (cell == 5) {
            characterData.appendChild(parent);
        }
        cell %= 5;

    }
}

displayLoader();
fetchCharacters();