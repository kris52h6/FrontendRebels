const refereeUrl = "http://localhost:8080/api/users/referee";
import { handleHttpErrors } from "../../utils.js";

export function initCreateReferee(){
    window.addEventListener("load", createReferee())
}

async function createReferee(){
    document.querySelector("#btn-user-add").onclick = makeNewReferee;

    async function makeNewReferee(){
        const newReferee = {}
        newReferee.username = document.querySelector("#input-user-username").value
        newReferee.email = document.querySelector("#input-user-email").value
        newReferee.password = document.querySelector("#input-user-password").value
        newReferee.firstname = document.querySelector("#input-user-firstname").value
        newReferee.lastname = document.querySelector("#input-user-lastname").value
        newReferee.bankInformation = document.querySelector("#input-user-bankinformation").value
        newReferee.license = document.querySelector("#input-user-license").value

        if (validateReferee(newReferee)) {
            const options = {}
            options.method = "POST"
            options.headers = {"Content-type": "application/json"}
            options.body = JSON.stringify(newReferee)
            //if user is added to database, then redirect to login page
            await fetch(refereeUrl, options).then(handleHttpErrors).then(data => {
                console.log(data)
                location.replace("/#/login")
            }).catch(err => {
                const errorDiv = document.querySelector("#error")
                errorDiv.innerHTML = err.message
                errorDiv.removeAttribute("hidden")
            })
        } else {
            console.log("HEJ")
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Venligst udfyld alle felter"
            errorDiv.removeAttribute("hidden")
        }
    }

    function validateReferee(newReferee){
        if(newReferee.username === ""
            || newReferee.email === ""
            || newReferee.password === ""
            || newReferee.firstname === ""
            || newReferee.lastname === ""
            || newReferee.bankInformation === ""
            || newReferee.license === ""){
            return false
        }
        return true
    }
}
