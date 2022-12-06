
import{refereeUrl} from "../../settings.js";
import {handleHttpErrors, validateAllObjectWhiteSpaces, checkIfEmptyObject} from "../../utils.js";


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


        if(checkIfEmptyObject(newReferee)){
            console.log("mangler felter")
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Venligst udfyld alle felter"
            errorDiv.removeAttribute("hidden")
        }else if (validateAllObjectWhiteSpaces(newReferee)) {
            console.log("har mellemrum")
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Du må ikke bruge mellemrum"
            errorDiv.removeAttribute("hidden")
        }
        else {
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
        }
        }
    }
