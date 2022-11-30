const clubURL = "http://localhost:8080/api/clubs/"
import {handleHttpErrors} from "../../utils.js";
export function initClub(){
    window.addEventListener("load", getClub())
}

function getClub(){
    const clubName = clubURL + getClubFromUrl();
    fetch(clubName).then(handleHttpErrors).then(data => {
        console.log(data)
        document.querySelector("#input-club-name").innerHTML = DOMPurify.sanitize(data.name)
        document.querySelector("#input-club-address").innerHTML = DOMPurify.sanitize(data.address)
        document.querySelector("#input-club-email").innerHTML = DOMPurify.sanitize(data.email)
    }).catch(err => {
        console.log(err)
    });
}

function getClubFromUrl(){
    const splitUrl = window.location.href.split("=")
    const clubName = splitUrl[1]
    return clubName;
}