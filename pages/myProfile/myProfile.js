const refereeUrl = "http://localhost:8080/api/users/referee";
import { handleHttpErrors } from "../../utils.js";
export function initMyProfile() {
    myProfileButtons()
}


function myProfileButtons(){
    getUserInfo()
    document.querySelector("#profile-change-information").onclick = goToEditProfile
    document.querySelector("#profile-change-password").onclick = goToEditPassword

}

function goToEditProfile(){
    location.replace("/#/editReferee")
}

function goToEditPassword(){
    location.replace("/#/editRefereePassword")
}





async function getUserInfo(){
    const token = "Bearer " + localStorage.getItem("token")

    const options = {}
    options.method = "GET"
    options.headers = {"Authorization": token}

    const refereeInfo = await fetch(refereeUrl,options).then(handleHttpErrors)
    document.querySelector("#input-user-username").innerHTML = DOMPurify.sanitize(refereeInfo.username)
    document.querySelector("#input-user-email").innerHTML =DOMPurify.sanitize(refereeInfo.email)
    document.querySelector("#input-user-firstname").innerHTML = DOMPurify.sanitize(refereeInfo.firstname)
    document.querySelector("#input-user-lastname").innerHTML = DOMPurify.sanitize(refereeInfo.lastname)
    document.querySelector("#input-user-bankinformation").innerHTML = DOMPurify.sanitize(refereeInfo.bankInformation)
    document.querySelector("#input-user-license").innerHTML = DOMPurify.sanitize(refereeInfo.license)
    
}