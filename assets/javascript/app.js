//jquery stuff
var questionText = $("#question");
var scoreText = $("#score");
var clock = $("#display");

//questi9on stuff
var questions = [{q: "Blue is black.", a: "f"}, {q: "Australia is real.", a: "f"}, {q: "The U.S. government did 9/11.", a: "t"},
                {q: "Birds are real animals and not government spy drones.", a: "f"}, {q: "Chemicals in the water give frogs THE BIG GAY.", a: "t"},
                {q: "Aliens had nothing to do with the pyramids.", a: "f"}, {q: "One day the amount of energy left in the universe will be too insubstantial to support any form of life.", a: "t"},
                {q: "Machine learning can accurately predict changes in the stock market.", a: "f"}, {q: "The Earth is flat.", a: "t"}, {q: "Jeffrey Epstein killed himself.", a: "f"}];
var score = 0;
var numCorrect = 0;
var answer;
var currentQuestion;
var questionCount = 0;

//clock stuff
var intervalId;
var clockRunning = false;
var time = 0;
var timeLeft = 10;


/* 
question stuff
================================================================
================================================================
*/
function askQuestion(question){
    questionText.text(question.q);
    currentQuestion = question;
    questionCount++;
    start();
}

function answerTrue(){
    answer = "t";
    checkAnswer();
}

function answerFalse(){
    answer = "f";
    checkAnswer();
}

function checkAnswer(){
    if(answer == currentQuestion.a){
        numCorrect += 1;
        score += (1 + timeLeft);
        scoreText.text("Score: " + score);
        answer = "";
        currentQuestion = "";
        if(questionCount < questions.length){
            askQuestion(questions[questionCount]);
        } else{
            scoreboard();
        }
    } else{
        scoreText.text("Score: " + score);
        answer = "";
        currentQuestion = "";
        if(questionCount < questions.length){
            askQuestion(questions[questionCount]);
        } else{
            scoreboard();
        }
    }
}

function scoreboard(){
    alert("you got " + numCorrect + " out of " + questions.length);
    alert("your score was " + score);
    score = 0;
    scoreText.text(score);
    answer - "";
    currentQuestion = "";
    questionCount = 0;
    clearInterval(intervalId);
    clockRunning = false;
    time = 0;
    timeLeft = 10;
    clock.text(timeLeft);
    alert("click to restart");
    askQuestion(questions[questionCount]);
}
/* 
end question stuff
================================================================
================================================================
*/

/* 
timer stuff
================================================================
================================================================
*/

function start() {
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
      clock.text(timeLeft);
    }  
}

function count() {
    time++;
    timeLeft--;
    clock.text(timeLeft);
    if(time >= 10){
        timesUp();
    }
}

function timesUp(){
    clearInterval(intervalId);
    clockRunning = false;
    time = 0;
    timeLeft = 10;
    if(currentQuestion.a == "f"){
        answerTrue();
    } else if(currentQuestion.a == "t"){
        answerFalse();
    } else{
        askQuestion(questions[questionCount]);
    }
}

/* 
end timer stuff
================================================================
================================================================
*/

alert("click to start");
askQuestion(questions[questionCount]);