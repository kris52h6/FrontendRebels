import { handleHttpErrors } from "../../utils.js";
const matchesUrl = "http://localhost:8080/api/matches/";
const teamsUrl = "http://localhost:8080/api/teams";
const signupsUrl = "http://localhost:8080/api/signups/findSignups/";
const addSignUpUrl = "http://localhost:8080/api/signups";
const refereeUrl = "http://localhost:8080/api/users/referee";
let teamsKeyValue = new Map();
let user;
let matchId;

export function initMatch() {
    setup();
}

async function setup() {
    matchId = getMatchIdFromUrl();
    const match = await fetch(matchesUrl + matchId).then(handleHttpErrors);
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
    signupList.innerHTML = "";
    let listData = signups
        .map((s) =>
        `
        <div class = "list-item">
        <li id="${s.id}">${s.refereeUsername}</li> 
        <button class = "btn">+</button>
        </div>
        `)
        .join("\n");
    signupList.innerHTML = DOMPurify.sanitize(listData);

    document.querySelector("#signup-list").addEventListener("mouseup", (e) => {
        const refereeUsername = e.target.previousElementSibling.innerHTML
        const signupId = e.target.previousElementSibling.id
        addAccepted(refereeUsername, signupId)
    })
    document.querySelector("#signup-button").onclick = addSignUp;

}

function displayAccepted(match){
    const acceptedList = document.querySelector("#accepted-list");
    acceptedList.innerHTML = "";
    const listData = match.acceptedReferees.map((a) =>
        `
        <li>${a}</li>
        `)
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

    const addSignUp = await fetch(addSignUpUrl, options).then(handleHttpErrors);

    const signups = await fetch(signupsUrl + matchId).then(handleHttpErrors);
    displaySignups(signups);
}

async function addAccepted(refereeUsername, signupId){
    const acceptedObject = {};
    acceptedObject.matchId = matchId;
    acceptedObject.username = refereeUsername;
    acceptedObject.signupId = signupId;

    const options = {};
    options.method = "PATCH";
    options.headers = {"Content-type": "application/json"};
    options.body = JSON.stringify(acceptedObject)

    const addAccepted = await fetch(matchesUrl, options).then(handleHttpErrors);
    const signups = await fetch(signupsUrl + matchId).then(handleHttpErrors);
    const accepted = await fetch(matchesUrl + matchId).then(handleHttpErrors);
    displaySignups(signups);
    displayAccepted(accepted)
}

async function getUser() {
    const token = "Bearer " + localStorage.getItem("token");
    const options = {};
    options.method = "GET";
    options.headers = { Authorization: token };
    return await fetch(refereeUrl, options).then(handleHttpErrors);
}
