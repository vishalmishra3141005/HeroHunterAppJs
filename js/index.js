
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
    } catch(e) {
        console.log(`Unable to fetch data - ${e}`);
    }
    console.log(jsonData);

    let dataCount = jsonData.count;
    let dataReceived = jsonData.results;


    

}

function displayLoader() {
    
}

displayLoader();
// fetchCharacters();