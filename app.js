// customize offcanvas
let offCanvas = document.querySelector(".offcanvas");
let settingIcon = document.querySelector(".offcanvas .icon")
let closeBtn = document.querySelector(".close")
let isclose = true;

settingIcon.addEventListener('click' , function(e){
    if(isclose){
        offCanvas.classList.add("open");
        isclose = false;
    }
    else{
        offCanvas.classList.remove("open");
        isclose = true;
    }
})
closeBtn.addEventListener("click" , function(e){
    offCanvas.classList.remove("open");
    isclose = true;
})


