// function for cleaning all inputs and notifications
function cleanup() {
    registerNameInput.value = ""
    registerEmailInput.value = ""
    registerPasswordInput.value = ""
    registerNotification.value = ""
    registerNotification.style.opacity = "0"

    loginEmailInput.value = ""
    loginPasswordInput.value = ""
    loginNotification.value = ""
    loginNotification.style.opacity = "0"
}

// switching from register/login to admin
const switchBtn = document.querySelector(".switch")
const adminContainer = document.querySelector(".admin .container")
const adminPanel = document.querySelector(".admin")
const registerPanel = document.querySelector(".register")
const loginPanel = document.querySelector(".login")
const userPanel = document.querySelector(".userPanel")
const userPanelContainer = document.querySelector(".userPanel .container")

switchBtn.addEventListener("click", () => {
    if (adminPanel.style.display == "none") {
        cleanup()
        
        if(registerPanel.style.display == "flex") {
            registerPanel.style.display = "none"
            adminPanel.style.display = "flex"
        }

        if(loginPanel.style.display == "flex") {
            loginPanel.style.display = "none"
            adminPanel.style.display = "flex"
        }

        if(userPanel.style.display == "flex") {
            userPanel.style.display = "none"
            userPanelContainer.innerHTML = ""
            adminPanel.style.display = "flex"
        }
        
        switchBtn.style.backgroundImage = "url('img/close.png')"

    } else {
        cleanup()
        adminPanel.style.display = "none"
        registerPanel.style.display = "flex"
        switchBtn.style.backgroundImage = "url('img/star.png')"
    }
})

// switching between register and login
const linkLogin = document.querySelector("#linkLogin")
const linkRegister = document.querySelector("#linkRegister")

linkLogin.addEventListener("click", () => {
    cleanup()
    registerPanel.style.display = "none"
    loginPanel.style.display = "flex"
})

linkRegister.addEventListener("click", () => {
    cleanup()
    registerPanel.style.display = "flex"
    loginPanel.style.display = "none"
})

// on load getting data from the local storage if there is any
let usersCount
const LSuserCount = window.localStorage.getItem("usersCount")
if (LSuserCount == null) usersCount = 0
else usersCount = parseInt(LSuserCount)

let usersArray = []
const LSusersArray = window.localStorage.getItem("usersArray")
if (LSusersArray == null) usersArray = []
else usersArray = JSON.parse(LSusersArray)

// creating user tiles in the admin panel
usersArray.forEach(element => {
    const userTile = document.createElement("div")
    userTile.className = "userTile"
    userTile.innerHTML = "<p>" + element.name +"</p><p>" + element.email +"</p><p>" + element.password + "</p>"
    adminContainer.prepend(userTile)
})



// register panel
const registerNameInput = document.querySelector("#registerNameInput")
const registerEmailInput = document.querySelector("#registerEmailInput")
const registerPasswordInput = document.querySelector("#registerPasswordInput")
const registerNotification = document.querySelector("#registerNotification")
const registerSubmitBtn = document.querySelector("#registerSubmitBtn")

// register submit button
registerSubmitBtn.addEventListener("click", () => {
    // validating if the inputs are empty
    if (registerNameInput.value == "" || registerEmailInput.value == "" || registerPasswordInput.value == "") {
        registerNotification.innerText = "please fill in every input"
        registerNotification.style.opacity = "100"
        return
    }

    // validating if inputted email is already in use in the database
    let emailInUse = false;
    usersArray.forEach((element) => {
        if (registerEmailInput.value == element.email) {
            emailInUse = true
            return
        }
    })

    if (emailInUse == true) {
        registerNotification.innerText = "there is already an accout using this email"
        registerNotification.style.opacity = "100"
        return
    }

    // creating user object and adding it into the array
    const user = {
        name : registerNameInput.value,
        email : registerEmailInput.value,
        password : registerPasswordInput.value
    }
    usersArray[usersCount] = user
    usersCount++

    // updating admin panel by adding new user
    const userTile = document.createElement("div")
    userTile.className = "userTile"
    userTile.innerHTML = "<p>" + user.name +"</p><p>" + user.email +"</p><p>" + user.password + "</p>"
    adminContainer.prepend(userTile)

    // saving data into local storage
    window.localStorage.setItem("usersCount", usersCount)
    window.localStorage.setItem("usersArray", JSON.stringify(usersArray))

    cleanup()
    registerPanel.style.display = "none"
    loginPanel.style.display = "flex"
})




// login panel
const loginEmailInput = document.querySelector("#loginEmailInput")
const loginPasswordInput = document.querySelector("#loginPasswordInput")
const loginSubmitBtn = document.querySelector("#loginSubmitBtn")
const loginNotification = document.querySelector("#loginNotification")

// login submit button
loginSubmitBtn.addEventListener("click", () => {
    if (loginEmailInput.value == "" || loginPasswordInput.value == "") {
        loginNotification.innerText = "please fill in every input"
        loginNotification.style.opacity = "100"
        return
    }

    let isEmailFound = false
    usersArray.forEach((element) => {
        if (loginEmailInput.value == element.email) {
            isEmailFound = true
            if (loginPasswordInput.value == element.password) {
                // email and password ok
                const firuriru = document.createElement("div")
                firuriru.innerHTML = "<h2>" + element.name + "</h2><p id='logout'>log out</p>"
                userPanelContainer.append(firuriru)

                const logout = document.querySelector("#logout")
                logout.addEventListener("click", () => {
                    cleanup()
                    userPanelContainer.innerHTML = ""
                    userPanel.style.display = "none"
                    loginPanel.style.display = "flex"
                })

                userPanel.style.display = "flex"
                loginPanel.style.display = "none"
                return
            }  else {
                console.log("password bad!")
                loginNotification.innerHTML = "incorrect password!"
                loginNotification.style.opacity = "100"
                return
            }
        }
    })

    if (isEmailFound == false) {
        loginNotification.innerHTML = "there is no account with that email"
        loginNotification.style.opacity = "100"
    }
})