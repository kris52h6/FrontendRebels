
import{refereeUrl} from "../../settings.js";
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

     if (!validateRefereeWhiteSpace(newReferee)){
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Du må ikke bruge mellemrum"
            errorDiv.removeAttribute("hidden")
        }else if(!validateReferee(newReferee)){
            console.log("HEJ")
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Venligst udfyld alle felter"
            errorDiv.removeAttribute("hidden")
        }else {
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

    function validateReferee(newReferee){
        if(newReferee.username === ""
            || newReferee.email === ""
            || newReferee.password === ""
            || newReferee.firstname === ""
            || newReferee.lastname === ""
            || newReferee.bankInformation === ""
            || newReferee.license === ""){
            return true
        }
        return false
    }

    function hasWhiteSpace(s) {
        const whitespaceChars = [' ', '\t', '\n'];
        return whitespaceChars.some(char => s.includes(char));
    }

    function validateRefereeWhiteSpace(newReferee){
        for (const refereeField in newReferee){
            var input = newReferee[refereeField]
            if(hasWhiteSpace(input)) {
                console.log(hasWhiteSpace(input))
                return true
            }else {
                return false
            }
        }
}
