import {createNavBar} from "../../topMenuNavBar.js";


export function initLogout(){
    window.addEventListener("load", logout())
}


function logout(){
    localStorage.removeItem("token")
    createNavBar(false)

    location.replace("/#/")
}