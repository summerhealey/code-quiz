//Assignment Code

//Variables
let index = 0;
const timer = document.querySelector("#time");
let secondsLeft = 75;

const questions = [
    {
      question: `Where in our code do we keep the styling?`,
      answers: [
        `in a style.css file`,
        `between two style tags`,
        `inside our html with style attribute`,
        `all of the above`,
      ],
      correctAnswer: `all of the above`,
    },
    {
      question: `Why so JavaScript and Java have similar name?`,
      answers: [
        `JavaScript is a stripped-down version of Java`,
        `JavaScript's syntax is loosely based on Java's`,
        `They both originated on the island of Java`,
        `None of the above`,
      ],
      correctAnswer: `JavaScript's syntax is loosely based on Java's`,
    },
    {
      question: `When a user views a page containing a JavaScript program, which machine actually executes the script?`,
      answers: [
        `The User's machine running a Web browser`,
        `The Web server`,
        `A central machine deep within Netscape's corporate offices`,
        `None of the above`,
      ],
      correctAnswer: `The User's machine running a Web browser`,
    },
    {
      question: `______ JavaScript is also called client-side JavaScript.`,
      answers: [`Microsoft`, `Navigator`, `LiveWire`, `Native`],
      correctAnswer: `Navigator`,
    },
    {
      question: `__________ JavaScript is also called server-side JavaScript.`,
      answers: [`Microsoft`, `Navigator`, `LiveWire`, `Native`],
      correctAnswer: `LiveWire`,
    },
    {
      question: `What are variables used for in JavaScript Programs?`,
      answers: [
        `Storing numbers, dates, or other values`,
        `Varying randomly`,
        `Causing high-school algebra flashbacks`,
        `None of the above`,
      ],
      correctAnswer: `Storing numbers, dates, or other values`,
    },
  ];

//TIMER  
  
//TIMER FUNCTION
function time() {
    
    secondsLeft--;
    
    if(secondsLeft <= 0) {
      secondsLeft = 0;
    }

    timer.textContent = secondsLeft;

  };

//START TIMER FUNCTION
function startTimer(){
    let timerInterval = setInterval(time, 1000);
}

//STOP TIMER FUNCTION
function stopTimer(){

    if(secondsLeft === 0 || endQuiz()) {
    clearInterval(timerInterval);
    }
}

//START QUIZ  
/*Description: Upon user clicking Start Button,  the instructions and start button will disappear, 
the timer will begin to countdown, and the first question will display*/

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    //Start Timer
    startTimer();
    //Hide Quiz Header and Start Display
    quizHeader.style.display = "none";
    startDisplay.style.display = "none";
    //Start Questions
    createQuestionDisplay();
  });

//Q&A FUNCTION
/*Function Description: Creates Question and Answer Area. The questions are displayed from the questions array, 
then the answers that correlate to that question are displayed as a list of buttons,so the user can choose an answer.
Once the answer is choosen the checkAnswer function determines if an answer is correct or incorrect.*/

function createQuestionDisplay() {
    const ul = document.getElementById("qa");
    const currentQ = questions[index];
    ul.textContent = currentQ.question;
    console.log(currentQ);//Test
    for (let i = 0; i < currentQ.answers.length; i++) {
      var answerChoices = currentQ.answers[i];
      const li = document.createElement("li");
      var button = document.createElement("button");
      button.setAttribute("value", answerChoices);
      button.textContent = answerChoices;
      button.className += "btn btn-primary";
      ul.appendChild(li);
      li.appendChild(button);
      button.onclick = checkAnswer;
    }
  }

//CHECK ANSWER FUNCTION
/*Function Description: Determines if the answer the user provides matches the given correct answer 
and returns "incorrect" or "correct". If incorrect,  in addition to display of "incorrect, 10 seconds are deducted 
from the timer, if correct the answer is provided, the user is displayed "correct" and the quiz continues until the timer 
displays 0 or all the questions are answered (correctly or incorrectly)*/

function checkAnswer() {
    if (this.value !== questions[index].correctAnswer) {
      console.log(this.value);
      checkAnswerDisplay.textContent = "Incorrect";
      checkAnswerDisplay.style.textAlign ="left";
      answerCheck.appendChild(checkAnswerDisplay);
      secondsLeft = secondsLeft - 10; //Time deduction
      console.log(secondsLeft); //Test
      timerEl.textContent = seconds;
      if (secondsLeft <= 0) {
        secondsLeft = 0;
        endQuiz();
      }
    } else {
      checkAnswerDisplay.textContent = "Correct";
      checkAnswerDisplay.style.textAlign ="left";
      answerCheck.appendChild(checkAnswerDisplay);
    }
    index++;
    if (index === questions.length) {
      endQuiz();
    }
    createQuestionDisplay();
  }
  

//END QUIZ FUNCTION
/*Function Description: */ 

function endQuiz() {
    /* Hide quiz instructions and start button as well as the questions and answers 
    - including the incorrect or correct display at the buttom of the page*/
      quizHeader.style.display = "none";
      startDisplay.style.display = "none";
      qa.style.display = "none";
      answerCheck.style.display = "none";
      alert("Game Over");
    }
    
  
  
  
