import { removeCharacter, getAllData } from "./module/FireBaseAuth.js";


const characterData = document.getElementById("character-data");
const loaderContainer = document.getElementById("loader-container");

async function fetchCharacters() {
    
    try {
        let response = await getAllData();
        hideLoader();
        loadAllCharacters(response);
    } catch(e) {
        console.log(`Unable to load - ${e}`);
        displayLoader();
    }
}

async function loadAllCharacters(characters) {
    let cell = 0;
    console.log(characters);
    const charactersArray = Object.keys(characters);
    let parent;
    let currentCount = charactersArray.length;
    if (currentCount === 0) {
        alert("No data!");
        window.open("/index.html", "_self");
    }

    while (characterData.firstChild) {
        characterData.removeChild(characterData.lastChild);
    }

    for (let idx = 0; idx < charactersArray.length; idx++) {
        if (cell === 0) {
            parent = document.createElement("div");
            parent.setAttribute("class", "characters-row");
        }
        let newChild = document.createElement("div");
        if (cell == 0) {
            newChild.style.marginLeft = "0";
        }
        newChild.setAttribute("id", characters[charactersArray[idx]].id);
        newChild.setAttribute("class", "characters");
        newChild.addEventListener("click", function(e) {
            window.open(`/hero.html?characterID=${characters[charactersArray[idx]].id}`, "_blank");
        });

        let heroImage = characters[charactersArray[idx]].img;


        let favIcon = "/assets/tile001.png";


        // newChild.innerHTML = `
        // <img class="img-style" src="${ heroImage.path }.${ heroImage.extension }" alt="HeroLogo">
        // <div class="about-hero">
        //     <div class="hero-name">${ results[idx].name }</div>
        //     <img class="fav-icon" src="${ favIcon }" onClick="${favIconHandler()}" >
        // </div>`;


        const childImg = document.createElement("img");
        childImg.setAttribute("class", "img-style");
        childImg.setAttribute("src", `${ heroImage }`);
        childImg.setAttribute("alt", "HeroLogo");

        newChild.appendChild(childImg);
        const aboutHero = document.createElement("div");
        aboutHero.setAttribute("class", "about-hero");

        const heroName = document.createElement("div");
        heroName.setAttribute("class", "hero-name");
        heroName.innerText = `${ characters[charactersArray[idx]].name }`;

        const heroFavIcon = document.createElement("img");
        heroFavIcon.setAttribute("class", "fav-icon");
        heroFavIcon.setAttribute("src", `${ favIcon }`);
        heroFavIcon.addEventListener("click", async function(e) {
            e.stopPropagation();
            const parent = e.target.parentElement.parentElement;
            console.log(parent.id);
            await removeCharacter(parent.id);
            parent.style.display = "none";
        });

        aboutHero.appendChild(heroName);
        aboutHero.appendChild(heroFavIcon);
        newChild.append(aboutHero);


        parent.appendChild(newChild);
        cell++;
        if (cell == 5 || idx === charactersArray.length - 1) {
            characterData.appendChild(parent);
        }
        cell %= 5;
    }
    
}


function displayLoader() {
    loaderContainer.style.display = "block";
    characterData.style.display = "none";
}

function hideLoader() {
    loaderContainer.style.display = "none";
    characterData.style.display = "block";
}

displayLoader();
fetchCharacters();