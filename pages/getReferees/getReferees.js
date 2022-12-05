import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js";
import {makeAdminUrl, refereesUrl} from "../../settings.js";

export function initGetReferees(){
    setup()
}

async function setup(){
    const referees = await getAllReferees()


    displayMatches(referees)
   // makeTableRowsLinks(matches)
}

async function getAllReferees(){
    const token = "Bearer " + localStorage.getItem("token")
    const options = {}
    options.method = "GET"
    options.headers = {"Authorization": token}
    const referees = await fetch(refereesUrl, options).then(handleHttpErrors)
    return referees
}

async function makeAdmin(username){
    makeAdminUrl += username;
    const options = {}

    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('Authorization', token);
    
    
    options.method = "PATCH"
    options.headers = myHeaders
    options.body = JSON.stringify(refreeUpdates)
    const makeAdmin = await fetch(makeAdminUrl, options).then(handleHttpErrors)
}

function displayMatches(referees){
    let tableData = referees.map(r => 
        `
        <tr>
            <td>${r.username}</td>
            <td>${r.firstname}</td>
            <td>${r.lastname}</td>
            <td>${r.email}</td>
            <td>${r.license}</td>
            <td>${r.roles}</td>
            <td><a href="#/makeAdmin?username=${r.username}">Make Admin</a></td>
        </tr>
        `
    )
    const tableString = tableData.join("\n");
    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableString);
}

function makeTableRowsLinks(matches) {
    //const link = "#/matches?matchId="
    /*const link = "#/match?matchId="
    const matchAmount = matches.length
    for (let i = 0; i < matchAmount; i++) {
        document.getElementById("match-id" + matches[i].id).onclick = (event) =>{
            var j = i +1
            location.href = link+j
        }
    }*/
}