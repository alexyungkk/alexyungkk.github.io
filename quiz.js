const questions = [
    {
        question: "What is my name?",
        answers: [
            {text: "Alex", correct: true},
            {text: "Jack", correct: false},
            {text: "Sam", correct: false},
            {text: "Alexander", correct: false},
        ]
    },
    {
        question: "Which program am I studying?",
        answers: [
            {text: "IT Data Analytics", correct: false},
            {text: "IT Generalist", correct: false},
            {text: "IT Programming", correct: true},
            {text: "IT Web Programming", correct: false},
        ]
    },
    {
        question: "How many son(s) do I have?",
        answers: [
            {text: "One", correct: false},
            {text: "Two", correct: true},
            {text: "Three", correct: false},
            {text: "Four", correct: false},
        ]
    },
    {
        question: "What is the one more thing?",
        answers: [
            {text: "French", correct: false},
            {text: "German", correct: false},
            {text: "Spanish", correct: false},
            {text: "Japanese", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let questionIndex;
let score;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuest();
}

function showQuest(){
    resetState();
    let quest = questions[questionIndex];
    let questNo = questionIndex + 1;
    questionElement.innerHTML =  questNo + ". " + quest.question;
    
    quest.answers.forEach(ans => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = ans.text;
        answerButtons.appendChild(button);
        if (ans.correct){
            //creating <button class="btn" data-correct="true">Option Text</button>
           button.dataset.correct = ans.correct;            
        }       
        // selectAnswer function only occur when click. automatically injects the event object as the first agrument.
        button.addEventListener("click", selectAnswer);
    })

}

function resetState(){
    // hide the next button
    nextButton.style.display = "none";
    // if there is any content in answerButtons (id="answer-buttons"), delete it
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    // e.target grabs the exact HTML button element that the user clicked on
    const selectedAns = e.target;
    /* it checks if the button's dataset.correct attribute equals the string "true"
     (not the general button value), 
    and then assigns that boolean (true or false) into isCorrect..*/
    const isCorrect = selectedAns.dataset.correct === "true";
    /*check if isCorrect is true. If it is, line 60 adds the "correct" class to the clicked button (so CSS can turn it green)
     and line 96 increases the score. If it is false, 
    line 98 adds the "incorrect" class instead (so CSS can turn it red).*/
    if(isCorrect){
        selectedAns.classList.add("correct");
        score++;
    }else{
        selectedAns.classList.add("incorrect");
    }
    nextButton.style.display = "block"
}

function nextQuest(){
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuest();
    }else{
        resetState();
        const message = score === 4 ? "You know me so well, thank you!!!" : "I hope you get to know me better next time!";
        questionElement.innerHTML = `You got ${score} out of ${questions.length}. ${message}`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
}

nextButton.addEventListener("click", ()=>{
    if (questionIndex < questions.length){
        nextQuest();
    }else{
        startQuiz();
    }    
})

startQuiz();
