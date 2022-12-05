
import {refereeUrl, refereeUrlChangePassword} from "../../settings.js";

import {handleHttpErrors} from "../../utils.js";

export function initEditRefereePassword() {
    window.addEventListener("load", editReferee())
}

async function editReferee() {
    getUserInfo();
    document.querySelector("#btn-user-add").onclick = changeRefereePassword;

    async function changeRefereePassword() {
        const refreeUpdates = {}
        refreeUpdates.password = document.querySelector("#input-user-password").value
        refreeUpdates.passwordVerify = document.querySelector("#input-user-password-verify").value
        const token = "Bearer " + localStorage.getItem("token")

        var passwordCheckVar = passwordCheck(refreeUpdates.password, refreeUpdates.passwordVerify)

        if (!passwordCheckVar) {
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Password matcher ikke"
            errorDiv.removeAttribute("hidden")
        } else if (validateRefereeWhiteSpace(refreeUpdates)) {
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Password må ikke indeholde mellemrum"
            errorDiv.removeAttribute("hidden")
        } else {

            const options = {}

            const myHeaders = new Headers();
            myHeaders.append('Content-type', 'application/json');
            myHeaders.append('Authorization', token);


            options.method = "PATCH"
            options.headers = myHeaders
            options.body = JSON.stringify(refreeUpdates)
            const addUser = await fetch(refereeUrlChangePassword, options)
            location.replace("/#/myProfile")
        }
    }


    async function getUserInfo() {
        const token = "Bearer " + localStorage.getItem("token")

        const options = {}
        options.method = "GET"

        options.headers = {"Authorization": token}

        const refereeInfo = await fetch(refereeUrl, options).then(handleHttpErrors)
        console.log(refereeInfo)
        document.querySelector("#input-user-username").value = (refereeInfo.username)
    }
}

function passwordCheck(password, passwordCheck) {
    if (password == passwordCheck && !password == "") {
        return true
    } else {
        return false
    }
}


function hasWhiteSpace(s) {
    const whitespaceChars = [' ', '\t', '\n'];
    return whitespaceChars.some(char => s.includes(char));
}

function validateRefereeWhiteSpace(refreeUpdates) {
    for (const refereeField in refreeUpdates) {
        var input = refreeUpdates[refereeField]
        if (hasWhiteSpace(input)) {
            console.log(hasWhiteSpace(input))
            return true
        } else {
            return false
        }
    }

}

