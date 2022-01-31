let navSwitch = document.querySelector(".header-switch");
let headerNav = document.querySelector(".header-nav");

navSwitch.addEventListener("click", ()=>{
    let navClassList = headerNav.classList;
   
    if(Object.values(navClassList).includes("header-nav-hidden")){

        navClassList.remove("header-nav-hidden")

    }else if(Object.values(navClassList).includes("header-nav-hidden") === false){
        navClassList.add("header-nav-hidden")
    }

})