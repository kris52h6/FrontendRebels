const userUrl = "http://localhost:8080/api/users";
import { handleHttpErrors } from "../../utils.js";

export function initCreateUser(){
    window.addEventListener("load", createUser())
}

async function createUser(){
    document.querySelector("#btn-user-add").onclick = makeNewUser;

    async function makeNewUser(){
        const newUser = {}
        newUser.username = document.querySelector("#input-user-username").value
        newUser.email = document.querySelector("#input-user-email").value
        newUser.password = document.querySelector("#input-user-password").value
        newUser.firstname = document.querySelector("#input-user-firstname").value
        newUser.lastname = document.querySelector("#input-user-lastname").value

        console.log(newUser);
        const options = {}
        options.method = "POST"
        options.headers = {"Content-type": "application/json"}
        options.body = JSON.stringify(newUser)
        const addUser = await fetch(userUrl, options).then(handleHttpErrors)
    }
}
