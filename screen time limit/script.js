const ask = document.querySelector("#ask")
const askText = document.querySelector("#ask p")
const prompts = document.querySelector(".prompts")
const sendRequest = document.querySelector("#sendRequest")
const enterpassBtn = document.querySelector("#enterpassBtn")
const currentDomain = window.location.hostname
const info = document.querySelector("#info")
const viewportHeight = window.innerHeight
const viewportWidth = window.innerWidth
const body = document.querySelector("body")
const title = document.querySelector("title")
const passwordbox = document.querySelector(".passwordbox")
const pwdPage = document.querySelector(".pwdPage")
const failedAttempt = document.querySelector("#failedAttempt")
const pwdProgress = document.querySelector("#pwdProgress")
const screentimeImg = document.querySelector("body img")
const cancelBtn = document.querySelector(".pwdDisplay p")


let openPrompt = ``
info.innerHTML = `You've reached your limit on ${currentDomain}`
body.style.height = `${viewportHeight}px`
title.innerHTML = currentDomain.split('.')[0]
pwdPage.style.height = `${viewportHeight}px`

function promptClose(){
    prompts.classList.remove('show');
    askText.style.color = `#4795ff`
    prompts.classList.add('hide');
    openPrompt = ``
}
function pwdPageClose(){
    passwordbox.classList.add('hide')
    setTimeout(() => {
        pwdPage.style.opacity = `0`
        pwdPage.style.height = `0`
        pwdPage.style.width = `0`
        passwordbox.classList.remove('hide')
        pwdPage.classList.remove('show')
    },1000)
}
ask.addEventListener("click", () => {
    event.stopPropagation()
    if (openPrompt != `true`){
        openPrompt = `true`
        askText.style.color = `#81afec`
        prompts.classList.remove('hide')
        prompts.classList.add('show')
    }
    else {
        promptClose()
    }
    
})
sendRequest.addEventListener("click", () => {
    alert("Error : Request unable to send.")
    promptClose()
})
enterpassBtn.addEventListener("click", () => {
    pwdPage.style.opacity = `1`
    pwdPage.style.height = `100%`
    pwdPage.style.width = `100vw`
    pwdProgress.innerHTML = `
    <ion-icon name="ellipse-outline"></ion-icon>
    <ion-icon name="ellipse-outline"></ion-icon>
    <ion-icon name="ellipse-outline"></ion-icon>
    <ion-icon name="ellipse-outline"></ion-icon>
    `
    passEntered = ``
    promptClose()
})
prompts.addEventListener("click", () => {
    event.stopPropagation();
})
cancelBtn.addEventListener("click", () => {
    pwdPageClose()
})
let passAttempt = 0
let passEntered = ``

for (let i = 1; i < 10; i++){
    const pwdButton = document.querySelector(`.pwdInput div:nth-child(${i})`)
    const pwdButtonH3 = document.querySelector(`.pwdInput div:nth-child(${i}) h3`)
    pwdButton.addEventListener("click", () => {
        if (passEntered.length != 4){
            passEntered = passEntered + pwdButtonH3.innerHTML
            const progressDot = document.querySelector(`#pwdProgress ion-icon:nth-child(${passEntered.length})`)
            progressDot.setAttribute('name', 'ellipse');
            if (passEntered.length == 4){
                passAttempt++
                failedAttempt.classList.add('show')
                pwdProgress.innerHTML = `
                <ion-icon name="ellipse-outline"></ion-icon>
                <ion-icon name="ellipse-outline"></ion-icon>
                <ion-icon name="ellipse-outline"></ion-icon>
                <ion-icon name="ellipse-outline"></ion-icon>
                `
                if (passAttempt != 2){
                    passEntered = ``
                }
            }
            if (passAttempt == 2){
                localStorage.setItem("screentimeKey", `${passEntered}`)
                pwdPageClose()
            }
        }
    })
}
passwordbox.addEventListener("transitionend", () => {
    pwdPageClose()
    if (passAttempt == 2){
        screentimeImg.classList.add('open')
    }
})
screentimeImg.addEventListener("transitionend", () => {
    window.location = "./home"
})
document.addEventListener("click", () => {
    if (openPrompt === `true`) {
        promptClose()

    }
});