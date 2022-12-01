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
        refreeUpdates.passwordVerify = document.querySelector("#input-user-password-verify").value
        const token = "Bearer " + localStorage.getItem("token")

        var passwordCheckVar = passwordCheck(refreeUpdates.password ,refreeUpdates.passwordVerify)

        if( !passwordCheckVar ){
            const errorDiv = document.querySelector("#error")
            errorDiv.innerHTML = "Password matcher ikke"
            errorDiv.removeAttribute("hidden")}
        
         else{

        const options = {}

        const myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/json');
        myHeaders.append('Authorization', token);


        options.method = "PATCH"
        options.headers = myHeaders
        options.body = JSON.stringify(refreeUpdates)
        const addUser = await fetch(refreeUrlChangePassword, options)
        location.replace("/#/myProfile")
        }
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
    
    function passwordCheck(password, passwordCheck){
        if(password == passwordCheck && !password== "" ){
            return true
        }
        else{
            return false
        }
    }
    
}

