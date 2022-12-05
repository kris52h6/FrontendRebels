import { handleHttpErrors } from "../../utils.js";
import {matchesUrl, teamsUrl, refereeUrl, signupsUrl, addSignUpUrl} from "../../settings.js";

let teamsKeyValue = new Map();
let user;
let matchId;
let globalMatch;

export function initMatch() {
    setup();
}

async function setup() {
    matchId = getMatchIdFromUrl();
    const match = await fetch(matchesUrl + matchId).then(handleHttpErrors);
    globalMatch = match;
    const teams = await fetch(teamsUrl).then(handleHttpErrors);
    const signups = await fetch(signupsUrl + matchId).then(handleHttpErrors);
    createKeyValuePairs(teams);
    displayMatch(match);
    displaySignups(signups);
    displayAccepted(match);
    user = await getUser();
}

async function displaySignups(signups) {
    const signupList = document.querySelector("#signup-list");
    const signupListClone = signupList.cloneNode(true);
    signupList.parentNode.replaceChild(signupListClone, signupList);
    document.querySelector(".error").textContent = "";

    signupListClone.innerHTML = "";
    let listData = signups
        .map(
            (s) =>
                `
        <div class = "list-item">
        <li id="${s.id}">${s.refereeUsername}</li> 
        <button class = "btn">+</button>
        </div>
        `
        )
        .join("\n");
    signupListClone.innerHTML = DOMPurify.sanitize(listData);

    signupListClone.addEventListener("mouseup", (e) => {
        const refereeUsername = e.target.previousElementSibling.innerHTML;
        const signupId = e.target.previousElementSibling.id;
        addAccepted(refereeUsername, signupId);
    });
    document.querySelector("#signup-button").onclick = addSignUp;
}

function displayAccepted(match) {
    const acceptedList = document.querySelector("#accepted-list");
    acceptedList.innerHTML = "";
    const listData = match.acceptedReferees
        .map(
            (a) =>
                `
        <li>${a}</li>
        `
        )
        .join("\n");
    acceptedList.innerHTML = DOMPurify.sanitize(listData);
}

function getMatchIdFromUrl() {
    const splitUrl = window.location.href.split("=");
    const matchId = splitUrl[1];
    return matchId;
}

function displayMatch(matchData) {
    document.querySelector("#hometeam").innerHTML = DOMPurify.sanitize(teamsKeyValue.get(matchData.homeTeamId));
    document.querySelector("#awayteam").innerHTML = DOMPurify.sanitize(teamsKeyValue.get(matchData.awayTeamId));
    document.querySelector("#starttime").innerHTML = matchData.startTime;
}

function createKeyValuePairs(teams) {
    for (let i = 0; i < teams.length; i++) {
        teamsKeyValue.set(teams[i].id, teams[i].name);
    }
}

async function addSignUp() {
    const signUpObject = {};
    signUpObject.matchId = matchId;
    signUpObject.refereeUsername = user.username;
    signUpObject.position = "ref";

    const options = {};
    options.method = "POST";
    options.headers = { "Content-type": "application/json" };
    options.body = JSON.stringify(signUpObject);

    const signups = await fetch(signupsUrl + matchId).then(handleHttpErrors);
    const refereeIsSignedUp = await checkIfRefereeIsSignedUp(signups);
    const refereeIsAccepted = await checkIfRefereeIsAdded(user.username);

    if (!refereeIsSignedUp && !refereeIsAccepted) {
        const addSignUp = await fetch(addSignUpUrl, options).then(handleHttpErrors);
        const signups = await fetch(signupsUrl + matchId).then(handleHttpErrors);
        displaySignups(signups);
    } else {
        document.querySelector(".error").textContent = "Dommer allerede tilmeldt";
    }
}

async function addAccepted(refereeUsername, signupId) {
    const acceptedObject = {};
    acceptedObject.matchId = matchId;
    acceptedObject.username = refereeUsername;
    acceptedObject.signupId = signupId;

    const options = {};
    options.method = "PATCH";
    options.headers = { "Content-type": "application/json" };
    options.body = JSON.stringify(acceptedObject);

    const refereeIsAccepted = await checkIfRefereeIsAdded(refereeUsername);
    const refereeTeam = await fetch(teamsUrl + "/" + globalMatch.refereeTeamId).then(handleHttpErrors);

    if (user.clubName == refereeTeam.club) {
        if (!refereeIsAccepted) {
            const addAccepted = await fetch(matchesUrl, options).then(handleHttpErrors);
            const signups = await fetch(signupsUrl + matchId).then(handleHttpErrors);
            const accepted = await fetch(matchesUrl + matchId).then(handleHttpErrors);
            displaySignups(signups);
            displayAccepted(accepted);
        } else {
            document.querySelector(".error").textContent = "Dommeren er allerede accepteret.";
        }
    } else {
        document.querySelector(".error").textContent = "Du er ikke dommeransvarlig for denne klub.";
    }
}

async function getUser() {
    const token = "Bearer " + localStorage.getItem("token");
    const options = {};
    options.method = "GET";
    options.headers = { Authorization: token };
    return await fetch(refereeUrl, options).then(handleHttpErrors);
}

async function checkIfRefereeIsSignedUp(signups) {
    for (let i = 0; i < signups.length; i++) {
        if (signups[i].refereeUsername === user.username) {
            return true;
        }
    }
    return false;
}

async function checkIfRefereeIsAdded(refereeUsername) {
    const match = await fetch(matchesUrl + matchId).then(handleHttpErrors);
    if (match.acceptedReferees.includes(refereeUsername)) {
        return true;
    } else {
        return false;
    }
}
