
import { auth } from "./module/AuthenticationData.js";


const baseUrl = "https://gateway.marvel.com";
const api = "v1/public/characters";
const url = new URL(window.location.toString()).searchParams;
const cID = url.get("characterID");

const fullPath = `${baseUrl}/${api}/${cID}?${auth}`;

console.log(fullPath);
const loaderContainer = document.getElementById("loader-container");
const heroContent = document.querySelector(".hero-content");


let comicsVis = false;
let seriesVis = false;
let storiesVis = false;
let eventsVis = false;

const comics = document.getElementById("comics");
const series = document.getElementById("series");
const stories = document.getElementById("stories");
const events = document.getElementById("events");

const comicsHeading = document.getElementById("comics-heading");
comicsHeading.addEventListener("click", function(e) {
    if (comicsVis) {
        comics.style.display = "none";
    } else {
        comics.style.display = "block";
    }
    comicsVis = !comicsVis
});


const seriesHeading = document.getElementById("series-heading");
seriesHeading.addEventListener("click", function(e) {
    if (seriesVis) {
        series.style.display = "none";
    } else {
        series.style.display = "block";
    }
    seriesVis = !seriesVis;
});


const storiesHeading = document.getElementById("stories-heading");
storiesHeading.addEventListener("click", function(e) {
    if (storiesVis) {
        stories.style.display = "none";
    } else {
        stories.style.display = "block";
    }
    storiesVis = !storiesVis;
});

const eventsHeading = document.getElementById("events-heading");
eventsHeading.addEventListener("click", function(e) {
    if (eventsVis) {
        events.style.display = "none";
    } else {
        events.style.display = "block";
    }
    eventsVis = !eventsVis;
});


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

    const comicContainer = comics.firstElementChild;

    const comicData = mainData.comics.items;

    const comicArray = comicData.map((currComic) => {
        return `<li class="item-style">${currComic.name}</li>`;
    });
    comicContainer.innerHTML = "";
    for (let currComics of comicArray) {
        comicContainer.innerHTML += currComics;
    }
    
    const seriesContainer = series.firstElementChild;

    const seriesData = mainData.series.items;
    const seriesArray = seriesData.map((currSeries) => {
        return `<li class="item-style">${currSeries.name}</li>`;
    });

    seriesContainer.innerHTML = "";
    for (let currSeries of seriesArray) {
        seriesContainer.innerHTML += currSeries;
    }

    const storiesContainer = stories.firstElementChild;

    const storiesData = mainData.stories.items;
    const storiesArray = storiesData.map((currStories) => {
        return `<li class="item-style">${currStories.name}</li>`;
    });

    storiesContainer.innerHTML = "";
    for (let currStories of storiesArray) {
        storiesContainer.innerHTML += currStories;
    }

    const eventsContainer = events.firstElementChild;

    const eventsData = mainData.events.items;
    const eventsArray = eventsData.map((currEvents) => {
        return `<li class="item-style">${currEvents.name}</li>`
    });

    eventsContainer.innerHTML = "";
    for (let currEvents of eventsArray) {
        eventsContainer.innerHTML += currEvents;
    }
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