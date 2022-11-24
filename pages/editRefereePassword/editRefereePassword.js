const refereeUrl = "http://localhost:8080/api/users/referee";
const refreeUrlChangePassword = "http://localhost:8080/api/users/refereePassword";
import { handleHttpErrors } from "../../utils.js";

export function initEditRefereePassword(){
    window.addEventListener("load", editReferee())
}

async function editReferee(){
    getUserInfo();
    document.querySelector("#btn-user-add").onclick = changeRefereePassword;

    async function changeRefereePassword(){
        const refreeUpdates = {}
        refreeUpdates.password = document.querySelector("#input-user-password").value
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
        const addUser = await fetch(refreeUrlChangePassword, options).then(handleHttpErrors)
    }

    async function getUserInfo(){
        const token = "Bearer " + localStorage.getItem("token")

        const options = {}
        options.method = "GET"

        options.headers = {"Authorization": token}

        const refereeInfo = await fetch(refereeUrl,options).then(handleHttpErrors)
        console.log(refereeInfo)
        document.querySelector("#input-user-username").value = (refereeInfo.username)
    }
}
