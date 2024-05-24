const btnAgain=document.querySelector(".again");
const input=document.querySelector('.input-number');
const score=document.querySelector('.score');
const h_score=document.querySelector(".h_score");
const displayNumber=document.querySelector('.number');
const status=document.querySelector('.status')
const initialScore=parseInt(score.textContent);
const form=document.querySelector('.input-block');

let scoreNumber=parseInt(score.textContent);
let secretNumber;
let currentNumber;
let highRecord=0;

//Данная функция генерирует рандомное число в интервале от min до max
const generateNumber=(min,max)=>{
    secretNumber = Math.floor(Math.random() * max) + min;
}
//Данная функция сопоставляет введеный номер с secretNumber
const checkNumber=()=>{
    //Данная условия проверят пустой ли мы input отправили или нет
    if(currentNumber===undefined||isNaN(currentNumber)){
        currentNumber='?';
        status.textContent='Number not entered!'
    }
    else{
        //Условия победы
        if(currentNumber===secretNumber){
            document.querySelector('body').style.backgroundColor='#5FB346'
            status.textContent='Correct number!';
            highRecord=scoreNumber>highRecord?scoreNumber:highRecord;//Проверяем больше ли наш рекорд макс рекорда
            h_score.textContent=`${highRecord}`;
            form.disabled=true;
            input.value='';
            input.disabled=true;
        }
        else {
            status.textContent = currentNumber > secretNumber ? 'Number is less' : 'Number is larger';
            scoreNumber--;
            score.textContent = `${scoreNumber}`;
        }
    }
    displayNumber.textContent=`${currentNumber}`;
    input.value='';
    currentNumber=undefined;
}
//Данная функция сбрасывает все параметры до изначальных,тем самыс перезапуская игру
const again=()=>{
    generateNumber(1,20);
    scoreNumber=initialScore;
    status.textContent="Enter number";
    score.textContent=`${initialScore}`;
    document.querySelector('body').style.backgroundColor='#4A3333';
    displayNumber.textContent='?';
    input.value='';
    currentNumber='?';
    form.disabled=false;
    input.disabled=false;
    setTimeout(() => {
        input.focus();
    }, 100);
}

//Данная функция настраивает изначальные параметры и слушатели событий,тем самым начниная игру
const start=()=>{
    generateNumber(1,20);
    input.focus();
    h_score.textContent=highRecord;
    input.addEventListener('input',function (e){
        currentNumber = parseInt(e.target.value);
    });
    btnAgain.addEventListener('click',again);
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(scoreNumber-1===0){
            score.textContent=`${scoreNumber-1}`;
            document.querySelector('body').style.backgroundColor='#BF1F2C';
            status.textContent='You are lose';
            form.disabled=true;
            input.value='';
            input.disabled=true;
            displayNumber.textContent="#";
        }
        else checkNumber();
    });
}
start();
