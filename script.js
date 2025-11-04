initT();
// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

// event listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function initT(){
    time();
    interval=setInterval(time,1000);
}

function time(){
    let d = new Date();
    let currentHour = d.getHours();
    let currentMinute = d.getMinutes();
    let currentSecond = d.getSeconds();
    if(currentMinute<10){
        currentMinute="0"+currentMinute;
    }
    if(currentSecond<10){
        currentSecond="0"+currentSecond;
    }
    if(currentHour<10){
        currentHour="0"+currentHour;
    }
    console.log(`Current time: ${currentHour}:${currentMinute}:${currentSecond}`);
    // concatenate the date and time
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let suffix="th";
    if(d.getDate()%10==1){
        suffix="st";
    }else if(d.getDate()%10==2){
        suffix="nd";
    }else if(d.getDate()%10==3){
        suffix="rd";
    }
    d = months[d.getMonth()] + " " + d.getDate() + suffix + ", " + d.getFullYear();
    // update here
    date.textContent = d;
    curTime.textContent = "Current Time: "+ currentHour + ":"+currentMinute+":"+currentSecond;
}
function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i = 0; i<levelArr.length; i++) {
        levelArr[i].disabled = true;
        if(levelArr[i].checked ){
            level = levelArr[i].value;
        }
    }
    answer = Math.floor(Math.random()*level)+1;
    msg.textContent = "Guess a number between 1-" + level;
    guess.placeholder = answer;
    score = 0;
}
function makeGuess(){
    let userGuess = Number(guess.value);
    if(isNaN(userGuess) || userGuess<1 || userGuess > level){
        msg.textContent = "INVALID, guess a number!";
        return;
    }
    score++;
    if(userGuess>answer){
        msg.textContent = "TOO HIGH";
    }else if(userGuess<answer){
        msg.textContent = "TOO LOW";
    }else{
        msg.textContent = "U GOT IT IN "+score+" TRIES";
        reset();
        updateScore();
    }
}
function reset(){
    guessBtn.disabled=true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled=true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length; i++){
        levelArr[i].disabled=false;
    }
}

function updateScore(){
    console.log(level);
    if(level==3){
        if(score<=2){
            msg.textContent="good score";
        }else if(score<=4){
            msg.textContent="mid score";
        }else{
            msg.textContent="bad score";
        }
    }else if(level==10){
        if(score<=4){
            msg.textContent="good score";
        }else if(score<=7){
            msg.textContent="mid score";
        }else{
            msg.textContent="bad score";
        }
    }else{
        if(score<=7){
            msg.textContent="good score";
        }else if(score<=11){
            msg.textContent="mid score";
        }else{
            msg.textContent="bad score";
        }
    }
    scoreArr.push(score);
    wins.textContent = "Total wins: "+scoreArr.length;
    let sum=0;
    scoreArr.sort((a, b) => a - b); // sorts ascending
    //leaderboard?
    const lb = document.getElementsByName("leaderboard");
    for(let i = 0; i<scoreArr.length; i++){
        sum+=scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    sum/=scoreArr.length;
    avgScore.textContent = "Average Score: "+sum.toFixed(2);
}