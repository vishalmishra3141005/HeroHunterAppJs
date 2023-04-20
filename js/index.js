
/* this file contains the functions that call the 
api and create the home page */

import { auth } from "./module/AuthenticationData.js";



async function homeLoader() {
    const baseUrl = "https://gateway.marvel.com";
    let getCharacterApi = "/v1/public/characters";

    let getApi = `${baseUrl}/${getCharacterApi}?${auth}`;
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
}

homeLoader();