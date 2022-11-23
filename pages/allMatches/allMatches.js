import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js";
const matchesUrl = "http://localhost:8080/api/matches";
const teamsUrl = "http://localhost:8080/api/teams";
let teamsKeyValue = new Map();

export function initAllMatches(){
    setup()
}

async function setup(){
    const matches = await getAllMatches()
    const teams = await getAllTeams()
    displayMatches(matches, teams)
    console.log(matches)
    console.log(teams)
}

async function getAllMatches(){
    const matches = await fetch(matchesUrl).then(handleHttpErrors);

    
    const matchesAsString = matches.map(m => 
        `
        <tr>
            <td>${m.homeTeamId}</td>
            <td>${m.awayTeamId}</td>
            <td>U13</td>
            <td>${m.startTime}</td>
        </tr>
        `
    );

    const tableString = matchesAsString.join("\n");
    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableString);
    return matches
}

async function getAllTeams(){
    const teams = await fetch(teamsUrl).then(handleHttpErrors)
    createKeyValuePairs(teams);
    return teams
}

function createKeyValuePairs(teams) {
    for(let i = 0; i < teams.length; i++) {
        teamsKeyValue.set(teams[i].id, teams[i].name);
    }
}

function displayMatches(matchesData){
    let tableData = matchesData.map(m => 
        `
        <tr>
            <td>${teamsKeyValue.get(m.homeTeamId)}</td>
            <td>${teamsKeyValue.get(m.awayTeamId)}</td>
            <td>"U13"</td>
            <td>${m.startTime}</td>
        </tr>
        `
    )
    const tableString = tableData.join("\n");
    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableString);
}