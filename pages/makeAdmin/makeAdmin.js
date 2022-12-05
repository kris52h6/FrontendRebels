import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js";
import {makeAdminUrl} from "../../settings.js";

export function initMakeAdmin(){
    window.onload = getUserInfo()

}

async function makeAdmin(username){
    makeAdminUrl += username;
    const token = "Bearer " + localStorage.getItem("token")
    const options = {}
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    options.method = "PATCH"
    options.headers = myHeaders
    const makeAdmin = await fetch(makeAdminUrl, options)
    makeAdminUrl = "http://localhost:8080/api/users/makeAdmin/"
    location.replace("/#/getReferees")


}

async function getUserInfo(){
    const url = window.location.href.split("=");
    const username = url[1];
    makeAdmin(username)
}