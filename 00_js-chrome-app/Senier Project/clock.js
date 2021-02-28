const clock_hour = document.querySelector(".clock_hour");
const clock_min = document.querySelector(".clock_min");
const clock_sec = document.querySelector(".clock_sec");
const clock_ampm = document.querySelector(".clock_ampm");

function getTime(){
    const date = new Date();
    let hours = date.getHours();
    let ampm="AM";
    if(hours>12 && hours<25){
        ampm="PM"
        hours = hours-12;
    }
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock_hour.innerText = `${hours < 10 ? `0${hours}` : hours}`;
    clock_min.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
    clock_sec.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
    clock_ampm.innerText = `${ampm}`;
    //${seconds < 10 ? `0${seconds}` : seconds }
}


function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();

// const clockContainer = document.querySelector(".js-clock"),
//       clockTitle = clockContainer.querySelector("h1");

// function getTime(){
//     const date = new Date();
//     const minutes = date.getMinutes();
//     const hours = date.getHours();
//     const seconds = date.getSeconds();
//     clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds }`;
// }

// function init(){
//     getTime();
//     setInterval(getTime, 1000);
// }

// init();