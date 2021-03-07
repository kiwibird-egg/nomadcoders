const bgImage = document.querySelector(".bgImage");



function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function editSrc(){
    let randomNum = getRandomInt(1,8);
    console.log(randomNum);
    bgImage.src = `./img/${randomNum}.jpg`;
}

function init(){
    editSrc();
}

init();