
import { auth } from "./module/AuthenticationData.js";


const baseUrl = "https://gateway.marvel.com";
const api = "v1/public/characters";
const url = new URL(window.location.toString()).searchParams;
const cID = url.get("characterID");

const fullPath = `${baseUrl}/${api}/${cID}?${auth}`;


const loaderContainer = document.getElementById("loader-container");
const heroContent = document.querySelector(".hero-content");


async function fetchData() {
    try {
        let result = await fetch(fullPath);
        let apiData;
        try {
            apiData = await result.json();
            hideLoader();
            loadCharacter(apiData.data.results);
        } catch(err) {
            displayLoader();
            console.log(err);
            console.log("Unable load data");
        }
    } catch(err) {
        console.log(err);
        displayLoader();
    }
}

function loadCharacter(apiData) {
    const mainData = apiData[0];
    console.log(mainData);
    const iconLocation = mainData.thumbnail.path;
    const iconExtension = mainData.thumbnail.extension;
    const heroIcon = document.querySelector(".hero-icon");
    heroIcon.setAttribute("src", `${iconLocation}.${iconExtension}`);

    const heroName = document.querySelector(".heroname-container");
    heroName.innerText = `${mainData.name}`;

    const aboutContainer = document.querySelector(".about-container");
    aboutContainer.innerText = `${mainData.description}`

}

function displayLoader() {
    loaderContainer.style.display = "block";
    heroContent.style.display = "none";
}

function hideLoader() {
    loaderContainer.style.display = "none";
    heroContent.style.display = "flex";

}

displayLoader();
fetchData();