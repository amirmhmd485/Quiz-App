// customize offcanvas
let offCanvas = document.querySelector(".offcanvas");
let settingIcon = document.querySelector(".offcanvas .icon")
let closeBtn = document.querySelector(".close")
let startQuizBtn = document.querySelector(".start-quiz");
let timer = document.querySelector(".timer .time")
let isclose = true;

settingIcon.addEventListener('click', function (e) {
    if (isclose) {
        offCanvas.classList.add("open");
        isclose = false;
    }
    else {
        offCanvas.classList.remove("open");
        isclose = true;
    }
})
closeBtn.addEventListener("click", function (e) {
    offCanvas.classList.remove("open");
    isclose = true;
})

let selectInput = document.querySelector(".offcanvas select");
let question = document.querySelector(".question");
let submitBtn = document.querySelector(".sub")
let allLis = Array.from(document.querySelectorAll(".bullets ul li"));
let topic = document.querySelector(".top");
let count = document.querySelector(".count");
let allLisOffCanvas = document.querySelectorAll(".offcanvas ul li");
let allp = document.querySelectorAll(".info p");
let grade = 0;

function afterFetching() {
    grade = 0;
    async function fethcingApi() {
        let response = await fetch(`json/${selectInput.value.toLowerCase()}.json`);
        let data = await response.json();
        return data;
    }
    fethcingApi().then((data) => {
        topic.innerHTML = selectInput.value;
        let arr = [];
        for (let i = 0; i < 10; i++) {
            let randomNumber = Math.floor(Math.random() * data.length);
            arr.push(data[randomNumber]);
            data.splice(randomNumber, 1);
        }
        return arr;
    }).then((data) => {
        getquestion(data);
        return data;
    }).then((data) => {
        submitBtn.addEventListener("click", function (e) {
            clearInterval(counter);
            if (data.length == 1) {
                getResult();
                count.innerHTML = 0;
                timer.innerHTML = "0";
            }
            else {
                data.splice(0, 1);
                getquestion(data);
                timer.innerHTML = "5";
                allLis.forEach((li, i) => {
                    activeLi(data, li);
                })
                startTimer();
            }
        })
    })
}
function startTimer(){
    counter = setInterval(() => {
        if(timer.innerHTML == 0){
            clearInterval(counter);
            submitBtn.click();
        }
        timer.innerHTML--;
    } , 1000)
}
function getquestion(data) {
    count.innerHTML = data.length;
    question.innerHTML = `
        <h2>${data[0].Question}</h2>
        <div class="radios">
            <div class="radio">
                <input type="radio" name="radio" id="ch1" value="${data[0]["right-answer"]}">
                <label for="ch1">${data[0].answer_1}</label>
            </div>
            <div class="radio">
                <input type="radio" name="radio" id="ch2" value="${data[0]["right-answer"]}">
                <label for="ch2">${data[0].answer_2}</label>
            </div>
            <div class="radio">
                <input type="radio" name="radio" id="ch3" value="${data[0]["right-answer"]}">
                <label for="ch3">${data[0].answer_3}</label>
            </div>
            <div class="radio">
                <input type="radio" name="radio" id="ch4" value="${data[0]["right-answer"]}">
                <label for="ch4">${data[0].answer_4}</label>
            </div>
        </div>
    `;
    Array.from(document.querySelectorAll("label")).forEach((label) => {
        label.style.color = localStorage.getItem("color");
    })
    allLisOffCanvas.forEach((li) => {
        li.addEventListener("click", function (e) {
            Array.from(document.querySelectorAll("label")).forEach((label) => {
                label.style.color = localStorage.getItem("color");
            })
        })
    })
    submitBtn.addEventListener("click", function () {
        checkAnswer(document.querySelectorAll("input"), document.querySelectorAll("label"));
    });
}
function getDataFromLocalStorage() {
    selectInput.value = localStorage.getItem("quiz");
}
function saveToLocalStorage() {
    localStorage.setItem("quiz", selectInput.value);
}
function getResult() {
    question.innerHTML = `
        <h2> Congratz You Finish Quiz </h2>
        <p>Grade <span class="grade">${grade} / 100</span></p>
        <button class = "start-quiz" >Start Quiz</button>
    `;
    allLisOffCanvas.forEach((li) => {
        li.addEventListener("click", function (e) {
            document.querySelector(".grade").style.color = localStorage.getItem("color");
            document.querySelector(".start-quiz").style.color = localStorage.getItem("color");
            document.querySelector(".start-quiz").style.borderColor = localStorage.getItem("color");
        });
    });
    document.querySelector(".grade").style.color = localStorage.getItem("color");
    document.querySelector(".start-quiz").style.color = localStorage.getItem("color");
    document.querySelector(".start-quiz").style.borderColor = localStorage.getItem("color");
    document.querySelector(".start-quiz").addEventListener("click" , function(e){
        timer.innerHTML = "5";
        startTimer();
    })
}


function saveColorToLocalStorage(li) {
    localStorage.setItem("color", li.getAttribute("data-color"));
    let chosenColor = localStorage.getItem("color");
    topic.style.color = chosenColor;
    count.style.color = chosenColor;
    submitBtn.style.color = chosenColor;
    submitBtn.style.borderColor = chosenColor;
    startQuizBtn.style.color = chosenColor;
    startQuizBtn.style.borderColor = chosenColor;
    timer.style.color = chosenColor;
    allLis.forEach((l) => {
        l.style.backgroundColor = chosenColor;
    })
    allp.forEach((p) => {
        p.style.color = chosenColor;
    })
}

function getColorFromLocalStorage(li) {
    let chosenColor = localStorage.getItem("color");
    topic.style.color = chosenColor;
    count.style.color = chosenColor;
    submitBtn.style.color = chosenColor;
    submitBtn.style.borderColor = chosenColor;
    startQuizBtn.style.color = chosenColor;
    startQuizBtn.style.borderColor = chosenColor;
    timer.style.color = chosenColor;
    allLis.forEach((l) => {
        l.style.backgroundColor = chosenColor;
    })
    allp.forEach((p) => {
        p.style.color = chosenColor;
    })
}


allLisOffCanvas.forEach((li, i) => {
    li.addEventListener("click", function (e) {
        allLisOffCanvas.forEach((li) => {
            li.classList.remove("active");
        })
        li.classList.add("active");
        saveColorToLocalStorage(li);
    })
})
window.addEventListener("load", getColorFromLocalStorage);

function checkAnswer(radios, labels) {
    radios.forEach((radio, i) => {
        if (radio.checked) {
            if (radio.value == labels[i].innerHTML) {
                grade += 10;
            }
        }
    })
}
function activeLi(data, li) {
    if (li.getAttribute("data-index") == (11 - data.length)) {
        allLis.forEach((li, i) => {
            li.classList.remove("active");
        })
        li.classList.add("active");
    }
}
function resetBullets(){
    allLis.forEach((li) => {
        if(li.getAttribute("data-index") == 1){
            allLis.forEach((li) => {
                li.classList.remove("active");
            })
            li.classList.add("active");
        }
    })
}


selectInput.addEventListener("blur", saveToLocalStorage);
window.addEventListener("load", getDataFromLocalStorage);

window.addEventListener("load", function (e) {
    selectInput.children[0].selected = true;
});

// start quiz here
function startAgian(e){
    if(e.target.classList.contains("start-quiz")){
        afterFetching();
        resetBullets();
    }
}
function deleteBtn(e){
    e.target.remove();
}
startQuizBtn.addEventListener("click" , afterFetching);
startQuizBtn.addEventListener("click" , resetBullets);
startQuizBtn.addEventListener("click" , deleteBtn);
startQuizBtn.addEventListener("click" , startTimer);
question.addEventListener("click" , startAgian);
// end quiz here