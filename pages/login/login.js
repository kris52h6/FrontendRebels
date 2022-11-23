const loginUrl = "http://localhost:8080/api/auth/login";
import { handleHttpErrors } from "../../utils.js";

export function initLogin(){
    window.addEventListener("load",login())
}


async function login(){
    document.querySelector("#btn-user-login").onclick = checkLogin


async function checkLogin(){

    const userDetails = {}
    userDetails.username = document.querySelector("#input-user-username").value
    userDetails.password = document.querySelector("#input-user-password").value

    const options = {}
    options.method = "POST"
    options.headers = {"Content-type": "application/json"}
    options.body = JSON.stringify(userDetails)
    const response = await fetch(loginUrl, options).then(handleHttpErrors)

        localStorage.setItem("token", response.token)
        
}
}