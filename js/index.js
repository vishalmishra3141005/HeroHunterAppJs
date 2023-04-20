
/* this file contains the functions that call the 
api and create the home page */

import { auth } from "./module/AuthenticationData.js";


function homeLoader() {
    console.log(auth);
}

homeLoader();