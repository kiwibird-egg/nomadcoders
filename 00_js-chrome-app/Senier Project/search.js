const searchBox = document.querySelector('.searchBox'); 
const searchInput = document.querySelector('.searchInput'); 

function submitForm(event){
    if(searchInput.value.length !== 0){ 
        const keyword=searchInput.value;
        const URL = `http://www.google.com/search?client=safari&rls=en-us&q=${keyword}&ie=UTF-8&oe=UTF-8`;
        window.open(URL);
        event.preventDefault();
    } 
    else{
        alert('필드의 값이 누락 되었습니다'); 
        event.preventDefault();
    }
}


    searchBox.addEventListener('submit',submitForm);

