const loginUrl = "http://localhost:8080/api/auth/login";



document.querySelector("#btn-user-login").onclick = checkLogin

async function checkLogin(){

    const userDetails = {}
    userDetails.username = document.querySelector("#input-user-username").value
    userDetails.password = document.querySelector("#input-user-password").value

    const options = {}
    options.method = "POST"
    options.headers = {"Content-type": "application/json"}
    options.body = JSON.stringify(userDetails)
    const updateScreening = await fetch(loginUrl, options).then(handleHttpErrors)

        const username = userDetails.username;
        const user = await getUserFromUsername(username);

        localStorage.setItem("role", user.role);
        localStorage.setItem("username",userDetails.username)
        localStorage.setItem("token", userDetails.token)
        location.replace("/")
}
