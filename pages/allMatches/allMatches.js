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
    setupButtons();
}

async function setupButtons() {
    const buttons = document.querySelector(".btns");
    buttons.addEventListener("mouseup", (e) => {
        const divisionId = e.target.id;
        fetchByDivision(divisionId);
    });
}

async function fetchByDivision(divisionId) {
    const matchesByDivision = await fetch(matchesUrl + "/division/" + divisionId).then(handleHttpErrors);
    displayMatches(matchesByDivision);
    makeTableRowsLinks(matchesByDivision);

    console.log(matchesByDivision);
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
    document.querySelector("#match-content").innerHTML = "";
    matchesData.forEach((m) => {
        displayMatch(m);
    });
}

function displayMatch(m) {
    const date = new Date(m.startTime);
    const dateOptions = {
        dateStyle: "long",
    };
    const dateFormatted = date.toLocaleDateString("da-DK", dateOptions);
    const matchTemplate = document.querySelector("template");
    const clone = matchTemplate.cloneNode(true).content;
    const matchContent = document.querySelector("#match-content");
    const match = document.createElement("div");
    match.classList.add("match");

    clone.querySelector(".match-time").textContent = dateFormatted;
    clone.querySelector(".hometeam-h2").textContent = teamsKeyValue.get(m.homeTeamId);
    clone.querySelector(".hometeam-img").src = "./images/logos/" + m.homeTeamId + ".png";
    clone.querySelector(".awayteam-h2").textContent = teamsKeyValue.get(m.awayTeamId);
    clone.querySelector(".awayteam-img").src = "./images/logos/" + m.awayTeamId + ".png";
    clone.querySelector(".refereeteam-img").src = "./images/logos/" + m.refereeTeamId + ".png";
    clone.querySelector(".referee-team").textContent = teamsKeyValue.get(m.refereeTeamId);

    match.id = "match-id" + m.id;

    const amountOfAcceptedReferees = m.acceptedReferees;
    const refereeNodes = clone.querySelectorAll(".referees");
    if (amountOfAcceptedReferees != 0) {
        for (let i = 0; i < amountOfAcceptedReferees.length; i++) {
            refereeNodes[0].children[i].style.color = "Green";
        }
    }

    match.appendChild(clone);
    matchContent.append(match);
}

// function displayMatches(matchesData) {
//     console.log(matchesData);
//     let tableData = matchesData.map(
//         (m) =>
//             `
//         <tr id = match-id${m.id}>
//             <td>${teamsKeyValue.get(m.homeTeamId)}</td>
//             <td>${teamsKeyValue.get(m.awayTeamId)}</td>
//             <td>"${m.divisionName}"</td>
//             <td>${m.startTime}</td>
//         </tr>
//         `
//     );
//     const tableString = tableData.join("\n");
//     document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableString);
// }

function makeTableRowsLinks(matches) {
    const link = "#/match?matchId=";
    const matchAmount = matches.length;
    for (let i = 0; i < matchAmount; i++) {
        document.getElementById("match-id" + matches[i].id).onclick = (event) => {
            var j = i + 1;
            location.href = link + j;
        };
    }
}
