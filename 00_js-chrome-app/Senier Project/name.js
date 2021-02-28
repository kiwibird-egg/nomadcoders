const showName = document.querySelector(".name");
const nameSetter = document.querySelector(".nameSetter");

const Name_LS = "name";

function setName(){
    let inputName = prompt("Input your Name here.");
    if(inputName === ""){
        alert("you can't input empty Value");
        setName();
    }
    if(inputName !== null && inputName!== ""){
        localStorage.setItem(Name_LS, JSON.stringify(inputName));
    }
    paintName();
};

function paintName(){
    const loadedName = localStorage.getItem(Name_LS);
    if (loadedName !== null) {
      const parsedName = JSON.parse(loadedName);
      showName.innerHTML = "Hello " + parsedName + "!"
    }
    else if (loadedName === null){
        setName();
    }
};

function init(){
    paintName();
}


nameSetter.addEventListener("click", setName);
init();