
/* this file contains the functions that call the 
api and create the home page */

import { auth } from "./module/AuthenticationData.js";
import { characterData, next, prev } from "./module/PageElement.js"
import { displayLoader, hideLoader } from "./module/LoaderHandler.js"
import { searchBar, searchButton } from "./module/SearchBarHandler.js";


let offset =  0;
// let pageNumber = 0;
const limit = 15;

let currentCount = 0;
let searchTerm = ""
let searchOffset = 0;

async function fetchCharacters() {
    const baseUrl = "https://gateway.marvel.com";
    let getCharacterApi = "/v1/public/characters";
    let getApi;
    if (searchTerm) {
        getApi = `${baseUrl}/${getCharacterApi}?${auth}&limit=${limit}&offset=${searchOffset}&nameStartsWith=${searchTerm}`;
    } else {
        getApi = `${baseUrl}/${getCharacterApi}?${auth}&limit=${limit}&offset=${offset}`;
    } 
    let jsonData;
    console.log(getApi);
    
    try {
        let response = await fetch(getApi);
        try {
            jsonData = await response.json();
        } catch(e) {
            console.log(`unable to parse json - ${e}`);
        }
        hideLoader();
        loadAllCharacters(jsonData);
    } catch(e) {
        console.log(`Unable to load - ${e}`);
        displayLoader();
    }
}



function loadAllCharacters(jsonData) {
    let cell = 0;
    let results = jsonData.data.results;
    let parent;
    currentCount = results.length;

    while (characterData.firstChild) {
        characterData.removeChild(characterData.lastChild);
    }

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
    if (searchTerm) {
        searchOffset += results.length;
    } else {
        offset += results.length;
    }
    
}

next.addEventListener("click", function(e) {
    displayLoader();
    fetchCharacters();
});

prev.addEventListener("click", function(e) {
    if (searchTerm) {
        searchOffset -= currentCount;
        searchOffset -= 15;
        if (searchOffset < 0) {
            alert("Reached last page");
            searchOffset = 0;
        }
    } else {
        offset -= currentCount;
        offset -= 15;
        if (offset < 0) {
            alert("Reached last page...!");
            offset = 0;
        }
    }
    displayLoader();
    fetchCharacters();
});


searchButton.addEventListener("click", function(e) {
    searchTerm = searchBar.value;
    searchOffset = 0;
    offset = 0;
    displayLoader();
    fetchCharacters();
});

searchBar.value = "";
displayLoader();
fetchCharacters();