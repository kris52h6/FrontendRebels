import {checkAccess, handleHttpErrors} from "../../utils.js";

const userUrl = "http://localhost:8080/api/login/user-fromtoken";


window.addEventListener("load",checkLoginStatusAndCreateNavBar())


async function checkLoginStatusAndCreateNavBar(){

    const accessOptions = ["admin","user","referee" ]

    var success = false;

    for(let i = 0; i < accessOptions.length; i++){
        checkAccess(accessOptions[i]).then(result =>{
            if(result){
              console.log("Sucess")
              createNavBar(true)
              i = accessOptions.length;
              success = true

            
            }
        else if(i === accessOptions.length-1 && !success){
            createNavBar(false)
        }})


    }


}

async function getUserFromUrl(){
    const token = "Bearer " + localStorage.getItem("token")
    const options = {}
    options.method = "GET"
    options.headers = {"Authorization": token}

    return await fetch(userUrl, options).then(handleHttpErrors)
}


/*
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
 */


export function createNavBar(isLoggedIn){
    console.log(isLoggedIn)
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

       // a.setAttribute("href", "/#/myProfile")
       // a.setAttribute("data-navigo", true)
       // a.textContent = "Min profil"
       // a.setAttribute("class", "nav-link")
    }
    else{
        if(document.querySelector("#dropdown-logged-in")){
            document.querySelector("#dropdown-logged-in").remove()
        }
        const a = document.createElement("a")
        a.setAttribute("href", "/#/login")
        a.setAttribute("data-navigo", true)
        a.textContent = "Login"
        a.setAttribute("class", "nav-link")
        document.querySelector("#top-menu-container").appendChild(a)
    }
    
}




