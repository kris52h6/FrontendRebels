import { matchesUrl, teamsUrl, clubUrl } from "../../settings.js";
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
let teamsKeyValue = new Map();
let matches;

export function initAllMatches() {
    setup();
}

async function setup() {
    matches = await getAllMatches();
    const teams = await getAllTeams();
    displayMatches(matches, teams);
    const clubs = await fetch(clubUrl).then(handleHttpErrors);
    filterButtons();
}

function filterButtons() {
    const buttons = document.querySelector(".btns");

    buttons.addEventListener("mouseup", (e) => {
        if (e.target.tagName.toLowerCase() == "button") {
            clearFilterButtons();
            e.target.classList.add("active-filter");
            const divisionId = e.target.id;
            filterMatches(divisionId);
        }
    });
}

function filterMatches(divisionId) {
    if (divisionId === "alle") {
        displayMatches(matches);
        return;
    }
    const filteredMatches = matches.filter((m) => m.divisionName == divisionId);
    displayMatches(filteredMatches);
}

function clearFilterButtons() {
    const buttons = document.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active-filter");
    }
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

    const nodes = document.querySelectorAll(".match");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener("mouseup", (e) => {
            const matchId = nodes[i].id;
            matchButtons(matchId);
        });
    }
}

function matchButtons(matchId) {
    const matchSplit = matchId.split("id");
    matchId = matchSplit[1];
    const link = "#/match?matchId=" + matchId;
    location.href = link;
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
    clone.querySelector(".hometeam-img").src = "./images/logos/" + m.homeTeamImg + ".png";
    clone.querySelector(".awayteam-h2").textContent = teamsKeyValue.get(m.awayTeamId);
    clone.querySelector(".awayteam-img").src = "./images/logos/" + m.awayTeamImg + ".png";
    clone.querySelector(".refereeteam-img").src = "./images/logos/" + m.refereeTeamImg + ".png";
    clone.querySelector(".referee-team").textContent = teamsKeyValue.get(m.refereeTeamId);

    match.id = "match-id" + m.id;

    for (let i = 0; i < m.numberOfReferees; i++) {
        const newRefereeIcon = document.createElement("i");
        newRefereeIcon.classList.add("fa-solid");
        newRefereeIcon.classList.add("fa-user");
        clone.querySelector(".referees").appendChild(newRefereeIcon);
        for (let j = 0; j < m.acceptedReferees.length; j++) {
            if (i < m.acceptedReferees.length) {
                newRefereeIcon.style.color = "Green";
            }
        }
    }
    match.appendChild(clone);
    matchContent.append(match);
}
