
/* this file contains the functions that call the 
api and create the home page */

import { auth } from "./module/AuthenticationData.js";
import { characterData, next, prev } from "./module/PageElement.js";
import { displayLoader, hideLoader } from "./module/LoaderHandler.js";
import { searchBar, searchButton } from "./module/SearchBarHandler.js";
import { addCharacter, removeCharacter, getCharacter } from "./module/FireBaseAuth.js";

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

async function loadAllCharacters(jsonData) {
    let cell = 0;
    let results = jsonData.data.results;
    
    let parent;
    currentCount = results.length;

    if (currentCount === 0) {
        alert("No data!");
        window.open("/index.html", "_self");
    }

    while (characterData.firstChild) {
        characterData.removeChild(characterData.lastChild);
    }

    for (let idx = 0; idx < results.length; idx++) {
        if (cell === 0) {
            parent = document.createElement("div");
            parent.setAttribute("class", "characters-row");
        }
        let newChild = document.createElement("div");
        if (cell == 0) {
            newChild.style.marginLeft = "0";
        }
        newChild.setAttribute("id", results[idx].id);
        newChild.setAttribute("class", "characters");
        newChild.addEventListener("click", function(e) {
            window.open(`/hero.html?characterID=${results[idx].id}`, "_blank");
        });

        let heroImage = results[idx].thumbnail;

        let favData = null;
        try {
            favData = await getCharacter(results[idx].id);
        } catch (err) {
            favData = null;
        }

        let favIcon = `${favData ? "/assets/tile001.png" : "/assets/tile002.png"}`;


        // newChild.innerHTML = `
        // <img class="img-style" src="${ heroImage.path }.${ heroImage.extension }" alt="HeroLogo">
        // <div class="about-hero">
        //     <div class="hero-name">${ results[idx].name }</div>
        //     <img class="fav-icon" src="${ favIcon }" onClick="${favIconHandler()}" >
        // </div>`;


        const childImg = document.createElement("img");
        childImg.setAttribute("class", "img-style");
        childImg.setAttribute("src", `${ heroImage.path }.${ heroImage.extension }`);
        childImg.setAttribute("alt", "HeroLogo");

        newChild.appendChild(childImg);
        const aboutHero = document.createElement("div");
        aboutHero.setAttribute("class", "about-hero");

        const heroName = document.createElement("div");
        heroName.setAttribute("class", "hero-name");
        heroName.innerText = `${ results[idx].name }`;

        const heroFavIcon = document.createElement("img");
        heroFavIcon.setAttribute("class", "fav-icon");
        heroFavIcon.setAttribute("src", `${ favIcon }`);
        heroFavIcon.addEventListener("click", async function(e) {
            e.stopPropagation();
            let newFavData = null;
            try {
                newFavData = await getCharacter(results[idx].id);
            } catch (err) {
                newFavData = null;
            }
            const charId = `${ results[idx].id }`;
            const newData = { 
                id: `${results[idx].id}`,
                img: `${ heroImage.path }.${ heroImage.extension }`,
                name: `${ results[idx].name }`,
            };
            let doesItExist = newFavData !== null ? true : false;
            if (doesItExist) {
                removeCharacter(charId);
                doesItExist = false;              
            } else {
                addCharacter(charId, newData);
                doesItExist = true;
            }
            console.log(await getCharacter(charId));
            favIcon = `${doesItExist ? "/assets/tile001.png" : "/assets/tile002.png"}`;
            heroFavIcon.setAttribute("src", `${ favIcon }`);
        });

        aboutHero.appendChild(heroName);
        aboutHero.appendChild(heroFavIcon);
        newChild.append(aboutHero);


        parent.appendChild(newChild);
        cell++;
        if (cell == 5 || idx === results.length - 1) {
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
            alert("Reached last page...!");
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



offset = 0;
searchOffset = 0;
searchBar.value = "";
displayLoader();
fetchCharacters();