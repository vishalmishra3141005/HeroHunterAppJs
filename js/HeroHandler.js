
import { auth } from "./module/AuthenticationData.js";


const baseUrl = "https://gateway.marvel.com";
const api = "v1/public/characters";
const url = new URL(window.location.toString()).searchParams;
const cID = url.get("characterID");

const fullPath = `${baseUrl}/${api}/${cID}?${auth}`


