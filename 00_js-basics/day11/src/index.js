// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const display_num = document.querySelector(".display_num");
const btns = document.querySelectorAll(".btn_grey, .btn_li_grey, .btn_orange");

for (const btn of btns){
    btn.addEventListener("mousedown", event=> calc(btn.innerHTML) );
}

function calc(param){
    if(level == 1){
        if(param>=0 && param<=9){ // 숫자
            lv1 = param;
            display_num.innerHTML = lv1;
            level = 2;
        }
        else if(param=="c"){ // C 
            display_num.innerHTML ="0";
            lv1=0; lv2=null; lv3=null;
            level = 1;
        }
        else if(param=="+" || param=="-" || param=="*" || param=="/"){ // 연산자
            lv2=param;
            level = 3;
        }
    }
    else if (level == 2){
        if(parseInt(param)>=0 && parseInt(param)<=9 ){
            lv1 += param;
            display_num.innerHTML = lv1;
            level = 2;
        }
        else if(param=="c"){
            display_num.innerHTML ="0";
            lv1=0; lv2=null; lv3=null;
            level = 1;
        }
        else if(param=="+" || param=="-" || param=="*" || param=="/"){
            lv2 = param;
            level = 3;
        }
    }
    else if (level == 3){
        if(param>=0 && param<=9){ // 숫자
            lv3 = param;
            display_num.innerHTML = lv3;
            level = 4;
        }
        else if(param=="c"){ // C 
            display_num.innerHTML ="0";
            lv1=0; lv2=null; lv3=null;
            level = 1;
        }
        else if(param=="+" || param=="-" || param=="*" || param=="/"){ // 연산자
            lv2 = param;
            level = 3;
        }
    }
    else if (level ==4){
        if(param>=0 && param<=9){ // 숫자
            lv3 += param;
            display_num.innerHTML = lv3;
            level = 4;
        }
        else if(param=="c"){ // C 
            display_num.innerHTML ="0";
            lv1=0; lv2=null; lv3=null;
            level = 1;
        }
        else if(param=="+" || param=="-" || param=="*" || param=="/" ||param=="="){ // 연산자
            if(lv2=="+"){
                lv1 = Number(lv1) + Number(lv3);
            }
            else if(lv2=="-"){
                lv1 = Number(lv1) - Number(lv3);
            }
            else if(lv2=="*"){
                lv1 = Number(lv1) * Number(lv3);
            }
            else if(lv2=="/"){
                lv1 = Number(lv1) / Number(lv3);
            }

            lv2 = null;
            lv3 = null;

            if( param=="="){
                display_num.innerHTML=lv1;
                level = 1;
            }
            else{
                lv2 = param;
                display_num.innerHTML=lv1;
                level = 3;
            }
            
            
        }
    }
    console.log(level);
}

let level=1;

let lv1=0;
let lv2=null;
let lv3=null;




