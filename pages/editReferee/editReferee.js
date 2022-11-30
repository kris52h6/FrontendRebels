const refereeUrl = "http://localhost:8080/api/users/referee";
import { handleHttpErrors } from "../../utils.js";

export function initEditReferee(){
    window.addEventListener("load", editReferee())
}

async function editReferee(){
    getUserInfo();
    document.querySelector("#btn-user-add").onclick = changeReferee;

    async function changeReferee(){
        const refreeUpdates = {}
        refreeUpdates.email = document.querySelector("#input-user-email").value
        refreeUpdates.firstname = document.querySelector("#input-user-firstname").value
        refreeUpdates.lastname = document.querySelector("#input-user-lastname").value
        refreeUpdates.bankInformation = document.querySelector("#input-user-bankinformation").value
        refreeUpdates.license = document.querySelector("#input-user-license").value
        const token = "Bearer " + localStorage.getItem("token")

        console.log(refreeUpdates);
        const options = {}

        const myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Authorization', token);
        
        
        options.method = "PATCH"
        options.headers = myHeaders
        options.body = JSON.stringify(refreeUpdates)
        console.log(options)
        const addUser = await fetch(refereeUrl, options).then(handleHttpErrors).then(data => {
            location.replace("/#/myProfile")
        }).catch(err => {
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = err.message
            errorDiv.removeAttribute("hidden")})
    }

    async function getUserInfo(){
        const token = "Bearer " + localStorage.getItem("token")

        const options = {}
        options.method = "GET"
        options.headers = {"Authorization": token}

        const refereeInfo = await fetch(refereeUrl,options).then(handleHttpErrors)
        console.log(refereeInfo)
        document.querySelector("#input-user-username").value = (refereeInfo.username)
        document.querySelector("#input-user-email").value = refereeInfo.email
        document.querySelector("#input-user-firstname").value = refereeInfo.firstname
        document.querySelector("#input-user-lastname").value = refereeInfo.lastname
        document.querySelector("#input-user-bankinformation").value = refereeInfo.bankInformation
        document.querySelector("#input-user-license").value = refereeInfo.license
        
    }
}
