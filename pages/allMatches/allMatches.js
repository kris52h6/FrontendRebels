import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
const matchesUrl = "http://localhost:8080/api/matches";
const teamsUrl = "http://localhost:8080/api/teams";
let teamsKeyValue = new Map();

export function initAllMatches() {
    setup();
}

async function setup() {
    const matches = await getAllMatches();
    const teams = await getAllTeams();
    displayMatches(matches, teams);
    makeTableRowsLinks(matches);
}

async function getAllMatches() {
    const matches = await fetch(matchesUrl).then(handleHttpErrors);
    return matches;
}

async function getAllTeams() {
    const teams = await fetch(teamsUrl).then(handleHttpErrors);
    createKeyValuePairs(teams);
    return teams;
}

function createKeyValuePairs(teams) {
    for (let i = 0; i < teams.length; i++) {
        teamsKeyValue.set(teams[i].id, teams[i].name);
    }
}

function displayMatches(matchesData) {
    console.log(matchesData);
    let tableData = matchesData.map(
        (m) =>
            `
        <tr id = match-id${m.id}>
            <td>${teamsKeyValue.get(m.homeTeamId)}</td>
            <td>${teamsKeyValue.get(m.awayTeamId)}</td>
            <td>"${m.divisionName}"</td>
            <td>${m.startTime}</td>
        </tr>
        `
    );
    const tableString = tableData.join("\n");
    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableString);
}

function makeTableRowsLinks(matches) {
    //const link = "#/matches?matchId="
    const link = "#/match?matchId=";
    const matchAmount = matches.length;
    for (let i = 0; i < matchAmount; i++) {
        document.getElementById("match-id" + matches[i].id).onclick = (event) => {
            var j = i + 1;
            location.href = link + j;
        };
    }
}
