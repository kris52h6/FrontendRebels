import {clubUrl} from "../../settings.js";

import { handleHttpErrors } from "../../utils.js";

export function initCreateClub(){
    window.addEventListener("load", createClub())
}

async function createClub(){
    document.querySelector("#btn-club-add").onclick = makeNewReferee;

    async function makeNewReferee(){
        const newClub = {}
        newClub.name = document.querySelector("#input-club-clubname").value
        newClub.address = document.querySelector("#input-club-email").value
        newClub.email = document.querySelector("#input-club-adresse").value


        const token = "Bearer " + localStorage.getItem("token")

        const requestHeaders = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Authorization', token);
        
        const options = {}
        options.method = "POST"
        options.headers = requestHeaders
        options.body = JSON.stringify(newClub)
        
        const addUser = await fetch(clubUrl, options).then(handleHttpErrors)
    }
}
