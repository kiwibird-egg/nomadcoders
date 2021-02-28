// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const display_num = document.querySelector(".display_num");
const btns = document.querySelectorAll(".btn_grey, .btn_li_grey, .btn_orange");


function init(){
    for (const btn of btns){
        btn.addEventListener("mousedown", event=> level_1(btn.innerHTML) );
    }
};
function level_1(param){
    if(param>=0 && param<=9){ // 숫자
        lv1 = param;
        display_num.innerHTML = param;
        for (const btn of btns){
            btn.addEventListener("mousedown", event=> level_2(btn.innerHTML) );
        }
    }
    else if(param=="c"){ // C 
        display_num.innerHTML ="0";
        lv1=null; lv2=null; lv3=null;
        init();
    }
    else if(param=="+" || param=="-" || param=="*" || param=="/"){ // 연산자
        lv1="0";
        level_2(param);
    }
};
function level_2(param){
    if(parseInt(param)>=0 && parseInt(param)<=9 ){
        lv1+=param;
        display_num.innerHTML = lv1;
        // for (const btn of btns){
        //     btn.addEventListener("mousedown", event=> level_2(btn.innerHTML) );
        // }
    }
    else if(param=="c"){
        display_num.innerHTML ="0";
        lv1=null; lv2=null; lv3=null;
        init();
    }
    else if(param=="+" || param=="-" || param=="*" || param=="/"){
        lv2 = param;
        display_num.innerHTML = param;
        for (const btn of btns){
            btn.addEventListener("mousedown", event=> level_3(btn.innerHTML) );
        }
    }
};
function level_3(){
    
};

let lv1=null;
let lv2=null;
let lv3=null;

init();
