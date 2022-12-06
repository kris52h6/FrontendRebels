import {handleHttpErrors, sanitizeStringWithTableRows} from "../../utils.js";
import {makeAdminUrl} from "../../settings.js";

export function initMakeAdmin(){
    window.onload = getUserInfo()

}

async function makeAdmin(username){
    let adminUrl = makeAdminUrl + username

    const token = "Bearer " + localStorage.getItem("token")
    const options = {}
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);
    options.method = "PATCH"
    options.headers = myHeaders
    const makeAdmin = await fetch(adminUrl, options)
    location.replace("/#/getReferees")


}

async function getUserInfo(){
    const url = window.location.href.split("=");
    const username = url[1];
    makeAdmin(username)
}