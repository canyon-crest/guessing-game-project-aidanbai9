
let score, answer, level, startT,curT,winNum=0;
let inGame=0;
let username="";
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const timesArr = [];
initT();
homeScreen();
// global variables/constants


// event listeners
playBtn.addEventListener("click", play);
submitName.addEventListener("click", updateName);
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", giveup);

function homeScreen(){
    inGame=0;
    guessBtn.disabled=true;
    giveUp.disabled=true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled=true;
    playBtn.disabled = true;
    for(let i = 0; i<levelArr.length; i++){
        levelArr[i].disabled=true;
    }
}

function updateName(){
    username=inputName.value.charAt(0).toUpperCase()+inputName.value.slice(1).toLowerCase();
    intro.textContent="Hi, "+username; 
    msg.textContent=username+", Please Select a Level";
    inputName.disabled=true;
    submitName.disabled=true;
    playBtn.disabled = false;
    for(let i = 0; i<levelArr.length; i++){
        levelArr[i].disabled=false;
    }
}

function initT(){
    time();
    interval=setInterval(time,1);
}

function time(){
    let d = new Date();
    curT=new Date();
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
    if(inGame==0){
        gameTimer.textContent="Time: 0s";
    }else{
        gameTimer.textContent="Time: "+((curT-startT)/1000).toFixed(2)+"s";
    }
    d = months[d.getMonth()] + " " + d.getDate() + suffix + ", " + d.getFullYear();
    // update here
    date.textContent = d;
    curTime.textContent = "Current Time: "+ currentHour + ":"+currentMinute+":"+currentSecond;
}
function play(){
    inGame=1;
    startT=new Date();
    playBtn.disabled = true;
    giveUp.disabled=false;
    guessBtn.disabled = false;
    guess.disabled = false;
    feedback.textContent="";
    for(let i = 0; i<levelArr.length; i++) {
        levelArr[i].disabled = true;
        if(levelArr[i].checked ){
            level = levelArr[i].value;
        }
    }
    answer = Math.floor(Math.random()*level)+1;
    msg.textContent = username+", Guess a number between 1-" + level;
    //guess.placeholder = answer;
    score = 0;
}

function giveup(){
    score=level;
    feedback.textContent = username+", U GAVE UP YOUR SCORE IS "+score;
    winNum--;
    reset();
    updateScore();
    updateTime();
}

function makeGuess(){
    let userGuess = Number(guess.value);
    guess.value="";
    if(isNaN(userGuess) || userGuess<1 || userGuess > level){
        msg.textContent = username+", INVALID, guess a number!";
        return;
    }
    score++;
    let dif=Math.abs(userGuess-answer);
    // update visual hint classes (JS-induced CSS)
    feedback.classList.remove('hint-hot','hint-warm','hint-cold','hint-success');
    if(dif===0){
        feedback.classList.add('hint-success');
        feedback.textContent = "U GOT IT";
    } else if(dif<=Math.ceil(level/20)){
        feedback.classList.add('hint-hot');
        feedback.textContent = "UR HOT";
    }else if(dif<=Math.ceil(level/6)){
        feedback.classList.add('hint-warm');
        feedback.textContent = "UR WARM";
    }else{
        feedback.classList.add('hint-cold');
        feedback.textContent = "UR COLD";
    }
    feedback.textContent = feedback.textContent + ", "+username+", You've used "+score+" guess(es)";
    if(userGuess>answer){
        msg.textContent = "TOO HIGH, guess lower";
    }else if(userGuess<answer){
        msg.textContent = "TOO LOW, guess higher";
    }else{
        // final success message and celebration
        feedback.textContent = username+", U GOT IT IN "+score+" GUESS(ES)";
        // add a celebration class to the body, then remove it after 2s
        document.body.classList.add('celebrate');
        setTimeout(()=>{
            document.body.classList.remove('celebrate');
        }, 2000);

        reset();
        updateScore();
        updateTime();
    }
}
function reset(){
    winNum++;
    inGame=0;
    guessBtn.disabled=true;
    giveUp.disabled=true;
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
    wins.textContent = "Total games played: "+scoreArr.length;
    numWins.textContent="Total Games won: "+winNum;
    let sum=0;
    scoreArr.sort((a, b) => a - b); // sorts ascending
    //leaderboard?
    const lb = document.getElementsByName("leaderboard");
    for(let i = 0; i<scoreArr.length; i++){
        sum+=Number(scoreArr[i]);
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
        console.log(scoreArr[i]);
    }
    sum/=scoreArr.length;
    avgScore.textContent = "Average Score: "+sum.toFixed(2);
}

function updateTime(){
    timesArr.push(((curT-startT)/1000).toFixed(2));
    let sum=0;
    timesArr.sort((a, b) => a - b); // sorts ascending
    //leaderboard?
    const lb = document.getElementsByName("times");
    for(let i = 0; i<timesArr.length; i++){
        sum+=Number(timesArr[i]);
        if(i<lb.length){
            lb[i].textContent = timesArr[i];
        }
    }
    sum/=timesArr.length;
    avgTime.textContent = "Average Time: "+sum.toFixed(2);
}