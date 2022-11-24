import { handleHttpErrors } from "../../utils.js";
const matchesUrl = "http://localhost:8080/api/matches/";
const teamsUrl = "http://localhost:8080/api/teams";
const signupsUrl = "http://localhost:8080/api/signups/findSignups/";
let teamsKeyValue = new Map();

export function initMatch(){
    setup()
}

async function setup(){
    const id = getMatchIdFromUrl()
    const match = await fetch(matchesUrl + id).then(handleHttpErrors)
    const teams = await fetch(teamsUrl).then(handleHttpErrors)
    const signups = await fetch(signupsUrl + id).then(handleHttpErrors)
    createKeyValuePairs(teams)
    displayMatch(match)
    displaySignups(signups)
}

function displaySignups(signups){
    const signupList = document.querySelector("#signup-list")
    let listData = signups.map(s => 
        `
        <li>${s.refereeUsername}</li>
        `).join("\n");
        signupList.innerHTML = DOMPurify.sanitize(listData)
}

function getMatchIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const matchId = splitUrl[1];
    return matchId;
}

function displayMatch(matchData){
    console.log(matchData)
    document.querySelector("#hometeam").innerHTML = DOMPurify.sanitize(teamsKeyValue.get(matchData.homeTeamId))
    document.querySelector("#awayteam").innerHTML = DOMPurify.sanitize(teamsKeyValue.get(matchData.awayTeamId))
    document.querySelector("#starttime").innerHTML = matchData.startTime
     
}

function createKeyValuePairs(teams) {
    for(let i = 0; i < teams.length; i++) {
        teamsKeyValue.set(teams[i].id, teams[i].name);
    }
}

