// switching pages
const switchBtn = document.querySelector(".switch")
const adminPanel = document.querySelector(".admin")
const adminContainer = document.querySelector(".admin .container")
const loginPanel = document.querySelector(".login")

switchBtn.addEventListener("click", () => {
    if (adminPanel.style.display == "none") {
        adminPanel.style.display = "flex"
        loginPanel.style.display = "none"
        switchBtn.style.backgroundImage = "url('img/close.png')"
    } else {
        adminPanel.style.display = "none"
        notification.style.opacity = "0"
        loginPanel.style.display = "flex"
        switchBtn.style.backgroundImage = "url('img/star.png')"
    }
})

// on load getting data from local storage if there is any
let usersCount
const LSuserCount = window.localStorage.getItem("usersCount")
if (LSuserCount == null) usersCount = 0
else usersCount = parseInt(LSuserCount)

let usersArray = []
const LSusersArray = window.localStorage.getItem("usersArray")
if (LSusersArray == null) usersArray = []
else usersArray = JSON.parse(LSusersArray)

// creating user tiles in admin panel
usersArray.forEach(element => {
    const userTile = document.createElement("div")
    userTile.className = "userTile"
    userTile.innerHTML = "<p>" + element.name +"</p><p>" + element.email +"</p><p>" + element.password + "</p>"
    adminContainer.append(userTile)
})

// submit button
const submitBtn = document.querySelector("#submitBtn")
const emailInput = document.querySelector("#emailInput")
const passwordInput = document.querySelector("#passwordInput")
const nameInput = document.querySelector("#nameInput")
const notification = document.querySelector("#notification")

submitBtn.addEventListener("click", () => {
    // validating if the inputs are empty
    if (nameInput.value == "" || emailInput.value == "" || passwordInput.value == "") {
        notification.innerText = "please fill in every input"
        notification.style.opacity = "100"
        return
    }

    // validating if inputted email is already in use in the database
    let emailInUse = 0;
    usersArray.forEach((element) => {
        if( emailInput.value == element.email) {
            emailInUse = 1
            return
        }
    })

    if (emailInUse == 1) {
        notification.innerText = "there is already an accout using this email"
        notification.style.opacity = "100"
        return
    }

    const user = {
        name : nameInput.value,
        email : emailInput.value,
        password : passwordInput.value
    }

    usersArray[usersCount] = user
    usersCount++

    // updating admin panel by adding new user
    const userTile = document.createElement("div")
    userTile.className = "userTile"
    userTile.innerHTML = "<p>" + user.name +"</p><p>" + user.email +"</p><p>" + user.password + "</p>"
    adminContainer.append(userTile)

    // saving data into local storage
    window.localStorage.setItem("usersCount", usersCount)
    window.localStorage.setItem("usersArray", JSON.stringify(usersArray))

    emailInput.value = ""
    passwordInput.value = ""
    nameInput.value = ""
    notification.innerText = "thank you for creating account :)"
    notification.style.opacity = "100"
})