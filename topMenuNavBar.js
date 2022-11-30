import {checkAccess, handleHttpErrors} from "../../utils.js";

const userUrl = "http://localhost:8080/api/login/user-fromtoken";


window.addEventListener("load",checkLoginStatusAndCreateNavBar())


async function checkLoginStatusAndCreateNavBar(){

    const accessOptions = ["admin","user","referee" ]

    var alreadyRan = 0;

    for(let i = 0; i < accessOptions.length; i++){
        checkAccess(accessOptions[i]).then(result =>{
            if(result){
                if(accessOptions[i] == "admin"){
                    createAdminNavBar()
                }
              console.log("Sucess")
                if (alreadyRan === 0) {
                    createNavBar(true)
                    i = accessOptions.length;
                    alreadyRan = 1;
                }
            }
        else if(i === accessOptions.length-1 && alreadyRan === 0){
            createNavBar(false)
        }})
    }
}


function createAdminNavBar(){
    const li = document.createElement("li")
    li.setAttribute("class", "nav-item nav-admin")

    const a = document.createElement("a")
    a.className = "nav-link"
    a.setAttribute("href", "/getReferees")
    a.setAttribute("data-navigo", true)
    a.textContent = "Alle dommere"

    li.append(a)
    document.querySelector("#menu").append(li)
}

async function getUserFromUrl(){
    const token = "Bearer " + localStorage.getItem("token")
    const options = {}
    options.method = "GET"
    options.headers = {"Authorization": token}

    return await fetch(userUrl, options).then(handleHttpErrors)
}

export function createNavBar(isLoggedIn){
    if(isLoggedIn){

        const div = document.createElement("div")
        div.className = "dropdown"
        div.id = "dropdown-logged-in"

        const button = document.createElement("button")
        button.className = "btn btn-primary dropdown-toggle"
        button.type = "button"
        button.setAttribute("data-bs-toggle","dropdown")
        button.setAttribute("aria-expanded","false")

        getUserFromUrl().then(user => {
            button.textContent = user.username
        })

        div.append(button)

        const ul = document.createElement("ul")
        ul.className = "dropdown-menu"

        const li = document.createElement("li")
        const a = document.createElement("a")
        a.setAttribute("href", "/#/myProfile")
        a.className = "dropdown-item"

        a.textContent = "Se profil"
        li.append(a)
        ul.append(li)

        const li2 = document.createElement("li")
        const a2 = document.createElement("a")
        a2.setAttribute("href", "/#/logout")
        a2.className = "dropdown-item"
        a2.textContent = "Log ud"
        li2.append(a2)
        ul.append(li2)

        div.append(ul)

        document.querySelector("#top-menu-container").appendChild(div)
    }
    else{
        if(document.querySelector("#dropdown-logged-in")){
            document.querySelector("#dropdown-logged-in").remove()
        }
        if(document.querySelector(".nav-admin")){
            document.querySelector(".nav-admin").remove()
        }
        const a = document.createElement("a")
        a.setAttribute("href", "/login")
        a.setAttribute("data-navigo", true)
        a.textContent = "Login"
        a.setAttribute("class", "nav-link")
        document.querySelector("#top-menu-container").appendChild(a)
    }
}




