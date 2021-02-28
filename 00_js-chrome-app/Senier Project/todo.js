// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");

const toDoList = document.querySelector(".js-toDoList");
const toDoListF = document.querySelector(".js-toDoList-finished");

const TODOS_LS = "toDos";
const TODOSF_LS = "toDosF";

let toDos = [];
let toDosF = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteToDoF(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoListF.removeChild(li);
  const cleanToDosF = toDosF.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  console.log(cleanToDosF);
  toDosF = cleanToDosF;

  saveToDosF();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveToDosF() {
  localStorage.setItem(TODOSF_LS, JSON.stringify(toDosF));
}

function penToFin(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const deletedToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  //console.log(deletedToDos[0].text); //지워진 한개

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos; //지워진거 빼고 나머지
  saveToDos();

  paintToDoF(deletedToDos[0].text);
}
function finToPen(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoListF.removeChild(li);
  const deletedToDosF = toDosF.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  //console.log(deletedToDosF[0].text); //지워진 한개

  const cleanToDosF = toDosF.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosF = cleanToDosF; //지워진거 빼고 나머지
  saveToDosF();

  paintToDo(deletedToDosF[0].text);
}

let idNumbers = 1;
function paintToDo(text) {
  const newId = idNumbers++;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);

  const finBtn = document.createElement("a");
  finBtn.innerText = "✅ ";
  finBtn.className="finBtn";
  finBtn.addEventListener("click", penToFin);

//   li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

let finIdNumbers = 1;
function paintToDoF(text) {
  const newId = finIdNumbers++;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  const delBtn = document.createElement("a");
  delBtn.innerText = "❌ ";
  delBtn.className="delBtn";
  delBtn.addEventListener("click", deleteToDoF);

  const reBtn = document.createElement("a");
  reBtn.innerText = "⏪ ";
  reBtn.addEventListener("click", finToPen);

  li.appendChild(delBtn);
// li.appendChild(reBtn);
  li.appendChild(span);
  li.id = newId;
  toDoListF.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDosF.push(toDoObj);
  saveToDosF();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }

  const loadedToDosF = localStorage.getItem(TODOSF_LS);
  if (loadedToDosF !== null) {
    const parsedToDosF = JSON.parse(loadedToDosF);
    parsedToDosF.forEach(function (toDoF) {
      paintToDoF(toDoF.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
