document.addEventListener("DOMContentLoaded", () => {
    let line = document.querySelector(".line")
    let firsttab = document.querySelector(".tab")
    let rect = firsttab.getBoundingClientRect()

    line.style.left = `${(rect.width / 2) + rect.left - 40}px`

    let path = window.location.pathname.split("/").pop()
    if (path) {
        moveLine(document.getElementById(path))
    }
})

function moveLine(el, bool = true) {
    let rect = el.getBoundingClientRect()
    let line = document.querySelector(".line")
    let lineRect = line.getBoundingClientRect()

    line.style.left = `${(rect.width / 2) + rect.left - (lineRect.width / 2)}px`

    let newPage = document.getElementById(el.innerText.toLowerCase())
    let oldPage = document.querySelector(".pageShown")

    if (newPage == oldPage) return

    window.currenttab = el

    newPage.classList.add("pageShown")
    oldPage.classList.remove("pageShown")

    newPage.style.position = "absolute"

    function thing() {
        let oldStyle = oldPage.style
        oldStyle.position = "fixed"
        oldPage.removeEventListener("transitionend", thing)
    }

    oldPage.addEventListener("transitionend", thing)

    if (bool == true && el.innerText.toLowerCase() != "home") {
        window.history.pushState({ elem: el.innerText.toLowerCase() }, '', `/${el.innerText.toLowerCase()}`)
    } else if (bool == true) {
        window.history.pushState({ elem: el.innerText.toLowerCase() }, '', `/`)
    }
}

onresize = e => {
    let el
    if (window.currenttab) {
        el = window.currenttab
    } else {
        el = document.querySelector(".tab")
    }
    let rect = el.getBoundingClientRect()
    let line = document.querySelector(".line")
    let lineRect = line.getBoundingClientRect()

    line.style.left = `${(rect.width / 2) + rect.left - (lineRect.width / 2)}px`
}

window.onpopstate = function (e) {
    let finalElement = document.querySelector(".tab")
    if (e.state) {
        document.querySelectorAll(".tab").forEach((thing) => {
            console.log(thing.innerText.toLowerCase())
            if (thing.innerText.toLowerCase() == e.state.elem) {
                finalElement = thing
            }
        })
    }
    console.log(finalElement)
    moveLine(finalElement, false)
}

function submit() {
    let email = document.querySelector("#email")
    let number = document.querySelector("#number")
    let value = parseInt(number.value)

    if (email.validity.valid === true && email.value != "" && Math.floor(value) == value && value >= 0) {
        let vorname = document.querySelector("#vorname")
        let nachname = document.querySelector("#nachname")
        let plural = ""

        if (value != 1) { plural = "n" }

        if (vorname.value != "" || nachname.value != "") {
            console.log(`Herr/Frau ${vorname.value} ${nachname.value} hat auf die E-Mail ${email.value} eine Kartenanfrage mit ${number.value} karte${plural} gemacht!`)
        }
    }
}

let currentImg = null
let imgNum = -1

setInterval(() => {
    let imageContainer = document.querySelector(".image-container")

    imgNum++
    if (imgNum >= imageContainer.children.length) { imgNum = 0 }

    if (currentImg == null) {
        currentImg = imageContainer.children[imgNum]
    }
    console.log(currentImg, imageContainer)

    let other = currentImg

    currentImg.classList.add("image-right")
    currentImg.addEventListener("transitionend", fun(other))
    currentImg = imageContainer.children[imgNum]
    currentImg.classList.remove("image-left")

    function fun(el) {
        console.log(el)
        el.classList.add("image-left")
        el.classList.remove("image-right")
        el.removeEventListener("transitionend", fun)
    }
}, 5000);