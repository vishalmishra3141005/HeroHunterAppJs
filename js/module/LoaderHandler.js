
import { characterData, loader } from "./PageElement.js";
export function displayLoader() {
    characterData.style.display = "none";
    loader.style.display = "block";
}

export function hideLoader() {
    characterData.style.display = "block";
    loader.style.display = "none";
}