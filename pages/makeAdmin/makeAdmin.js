import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js";
var makeAdminUrl = "http://localhost:8080/api/users/makeAdmin/"
export function initMakeAdmin(){
    window.onload = getUserInfo()

}

async function makeAdmin(username){
    makeAdminUrl += username;
    const token = "Bearer " + localStorage.getItem("token")

    console.log(token)
    const options = {}
    const myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('Authorization', token);
    options.method = "PATCH"
    options.headers = myHeaders
    const makeAdmin = await fetch(makeAdminUrl, options).then(handleHttpErrors)
}

async function getUserInfo(){
    const url = window.location.href.split("=");
    const username = url[1];
    makeAdmin(username)
}