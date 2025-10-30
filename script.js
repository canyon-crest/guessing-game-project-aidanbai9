date.textContent = time();

// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

// event listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function time(){
    let d = new Date();
    // concatenate the date and time
    d = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear();
    // update here
    return d;
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