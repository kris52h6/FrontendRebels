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
        document.querySelector("#club-name-header").innerHTML = DOMPurify.sanitize(data.name)
        const teamHeader = DOMPurify.sanitize(data.name) + "s hold"
        document.querySelector("#team-name-header").innerHTML = teamHeader
        createTeams(data.teams) 
    })  ;
}

function getClubFromUrl(){
    const splitUrl = window.location.href.split("=")
    const clubName = splitUrl[1]
    return clubName;
}




function createTeams(teams){
    if(document.querySelector(".teamsCreated") == null){

    for(let count = 0; count< teams.length ; count++){
        createTeam(teams[count],teams.length,count)
    }
}
}

function createTeam(team, size, count ){

    const row = document.createElement("div")
    row.className = "row teamsCreated"
    
    const nameDiv = document.createElement("div")
    nameDiv.className = "col-sm-3"

    const teamName = document.createElement("p")
    teamName.className = "mb-0"
    teamName.innerText = "Hold navn"

    const nameInputDiv = document.createElement("div")
    nameInputDiv.className = "col-sm-9"

    const nameInputP = document.createElement("p")
    nameInputDiv.className = "col-sm-9"
    nameInputDiv.id = "input-club-name"
    nameInputDiv.innerText = team

    

    const hr = document.createElement("hr")

    
    nameDiv.appendChild(teamName)
    nameInputDiv.appendChild(nameInputP)

    row.appendChild(nameDiv)
    row.appendChild(nameInputDiv)

    
    if(count < size-1){
    row.appendChild(hr)
    }
    document.querySelector("#teams").appendChild(row)

}