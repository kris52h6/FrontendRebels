import { checkAccess } from "../../utils.js";

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



function createNavBar(isLoggedIn){

    const a = document.createElement("a")
    console.log(isLoggedIn)
    if(isLoggedIn){


      
        document.querySelector("#top-menu-container").appendChild(profileWrapper)

        





       // a.setAttribute("href", "/#/myProfile")
       // a.setAttribute("data-navigo", true)
       // a.textContent = "Min profil"
       // a.setAttribute("class", "nav-link")
    }
    else{
        a.setAttribute("href", "/#/login")
        a.setAttribute("data-navigo", true)
        a.textContent = "Login"
        a.setAttribute("class", "nav-link")
        document.querySelector("#top-menu-container").appendChild(a)
    }
    
}




