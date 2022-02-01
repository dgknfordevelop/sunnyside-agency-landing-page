let navSwitch = document.querySelector(".header-switch")
let headerNav = document.querySelector(".header-nav")

navSwitch.addEventListener("click", () => {
    let navClassList = headerNav.classList;
    navClassList.toggle("header-nav-hidden")
})