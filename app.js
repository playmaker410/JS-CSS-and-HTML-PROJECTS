//DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "What is the capital of france?",
        answers:[
            {text: "London", correct:false},
            {text: "Berlin", correct:false},
            {text: "Paris", correct:true},
            {text: "Madrid", correct:false},
        ],
    },
{
    question: "Which planet is know as the Red Planet?",
    answers:[
        {text: "venus",correct: false},
         {text: "Mars",correct: true},
          {text: "Jupiter",correct: false},
           {text: "Saturn",correct: false},
        
    ],
},
{
    question: "What is the largest ocean on Earth?",
    answers: [
         {text: "Atlantic Ocean",correct: false},
         {text: "indian Ocean", correct: false},
         {text: "Arctic Ocean", correct: false},
         {text: "Pacific Ocean", correct: true}
    ],
},
{
    question: "Which of this is not a programming language?",
    answers: [
        {text: "Java", correct: false},
        {text: "Python", correct: false},
        {text: "Banana", correct: true},
        {text: "Javascript", correct: false},
    ],
},
{
    question: "What is the chemical symbol of gold?",
    answers:[
        {text: "Go", correct: false},
        {text: "Gd", correct: false},
        {text: "Au", correct: true},
        {text: "Ag", correct: false}
    ],
    
},
];

//QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// Add event listeners

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)


function startQuiz() {
    //reset vars

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    ShowQuestion()
   
}
function ShowQuestion(){
    //reset state
   
    answersDisabled = false
    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex/quizQuestions.length) *100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    //todo: explain this in seconds
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
//what is a datataset. proper of button that allows to store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);

    });
}


function selectAnswer(event){
    //optimization check
    if (answersDisabled) return
    answersDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"


    //todo : explain in a second

    Array.from(answersContainer.children).forEach((button) =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        //check if any more question or quiz is over
        if (currentQuestionIndex < quizQuestions.length){
            ShowQuestion()
        } else{
            showResults()
        }
    },1000)

}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;
     const percentage = (score / quizQuestions.length)*100

    if(percentage === 100){
    resultMessage.textContent = "Perfect you are a genuis";
    }else if (percentage >= 80){
        resultMessage.textContent = "HEY you did a great job";
    }else if (percentage >= 60) {
        resultMessage.textContent = "Good effort keep learning!";
    } else if (percentage >= 40){
        resultMessage.textContent = "Not bad try to improve";
    } else{
        resultMessage.textContent = "keep studying you will do better";
    }
}
function restartQuiz() {
    resultScreen.classList.remove("active")
     
    startQuiz()
}                                       