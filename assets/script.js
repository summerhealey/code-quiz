//Assignment Code

//Variables
let index = 0;
const timer = document.querySelector("#time");
let secondsLeft = 75;
let timerReturn = " ";
let checkAnswerDisplay = document.createElement("p");
let userName = " ";
let user = [];
let highscore = [];
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
function startTimer() {

    let timerInterval = setInterval(time, 1000);
    return timerInterval;

    };

//STOP TIMER FUNCTION
function stopTimer() {

    clearInterval(timerReturn);
    timer.textContent = 0; 
}    

//START QUIZ  
/*Description: Upon user clicking Start Button,  the instructions and start button will disappear, 
the timer will begin to countdown, and the first question will display*/

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    //Start Timer
    timerReturn = startTimer();
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
    let ul = document.getElementById("qa");
    const currentQ = questions[index];
    let li = document.createElement("li");
    const questionh1 = document.createElement("h1");
    questionh1.textContent = currentQ.question;
    console.log(currentQ);//Test
    li.className = "my-2";
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    li.appendChild(questionh1);
    ul.appendChild(li);
    for (let i = 0; i < currentQ.answers.length; i++) {
      var answerChoices = currentQ.answers[i];
      var answersli = document.createElement("li");
      var button = document.createElement("button");
      button.setAttribute("value", answerChoices);
      button.textContent = answerChoices;
      button.className += "btn btn-primary my-2";
      ul.appendChild(answersli);
      answersli.appendChild(button);
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
      timer.textContent = secondsLeft;
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

      //HIGHSCORE LOCAL VARIABLES
      /*Description: Variables needed in order to collect and store highscores. Creates Initial Input Display.*/
      const highscoreInputHeader = document.createElement("h1");
      const highscoreInputHeaderText = document.createTextNode("Highscores");
      let score = secondsLeft; //Score calculated by determining the amount of time left when the quiz ends.
      const scoreDisplay = document.createElement("p");
      scoreDisplay.textContent = "Your final score is " + score +".";
      const initialsInputLabel = document.createElement("LABEL");
      initialsInputLabel.textContent = "Enter initials: ";
      const initialsInput = document.createElement("INPUT");
      initialsInput.setAttribute("type", "text");
      initialsInput.setAttribute("value", "SLH");
      const submitButton = document.createElement("button");
      submitButton.innerHTML = "Submit";
      submitButton.className += "btn btn-primary";
      
      //SUBMIT HIGHSCORE
      /*Description: Upon clicking the submit button, the username and score is saved 
      to the localStorage and displayed under Highscores (which can also be accessed by pressing the
      'View Highscores' button shown below). */ 
      submitButton.onclick = function (event) {
        event.preventDefault;
        //Prompt for initials to collect username for localStorage
        let userName = initialsInput.value;
        console.log(userName);
        //STORE SCORE
        function storeHighscore() {
          localStorage.setItem("highscore", JSON.stringify(score));
        }
        //STORE USER
        function storeUser() {
          localStorage.setItem("user", JSON.stringify(userName));
        }
        //LOGGED FUNCTION 
        /*Description: The username and score are stored IF the current score 
        is higher than the previously stored highscore*/
        if (score > JSON.parse(localStorage.getItem("highscore"))) {
          storeHighscore();
          storeUser();
        }
        //Function creates input area
        highscoresDisplay();
        //Function stops timer once time is logged as the score.
        stopTimer();   
      };

      //Displays Highscore Input Area in HTML
      highscoreInputHeader.appendChild(highscoreInputHeaderText);
      highscoreContent.appendChild(highscoreInputHeader);
      highscoreContent.appendChild(scoreDisplay);
      highscoreContent.appendChild(initialsInputLabel);
      highscoreContent.appendChild(initialsInput);
      highscoreContent.appendChild(submitButton);
      
    }

    //VIEW HIGHSCORE BUTTON
    const highscoreButton = document.getElementById("highscorebtn");
    highscoreButton.onclick = function (event) {
      event.preventDefault;
      highscoresDisplay();
    };

    //HIGHSCORE DISPLAY FUNCTION
    /*Inputs are displayed after inputs are collected. Intials and highscore displayed. Score displayed is equivalent to 
    the seconds left on the timer when the quiz ends. */
    function highscoresDisplay() {
      /* Hide quiz instructions and start button as well as the questions and answers 
     and the Highscore input diplay page*/
      quizHeader.style.display = "none"; 
      startDisplay.style.display = "none";
      qa.style.display = "none";
      highscoreContent.style.display = "none";
      //Creates "Highscore" Header and collects data for localStorage
      const highscoreHeader = document.createElement("h1");
      const highscoreHeaderText = document.createTextNode("Highscores");
      let highscoreLatest = document.createElement("p");
      let highscoreLatestText = document.createTextNode(
        JSON.parse(localStorage.getItem("user")) +
          " - " +
          JSON.parse(localStorage.getItem("highscore"))
      );

      //GO BACK BUTTON
      const goBackButton = document.createElement("button");
      goBackButton.innerHTML = "Go Back";
      goBackButton.className += "btn btn-primary";
      goBackButton.onclick = function (event) {
        event.preventDefault;
        window.location.reload();
      };

      //CLEAR BUTTON
      const clearButton = document.createElement("button");
      clearButton.innerHTML = "Clear Highscore";
      clearButton.className += "btn btn-primary";
      clearButton.onclick = function (event) {
        event.preventDefault;
        window.localStorage.clear();
        highscoreLatest.textContent = ' ';

      };

      //Displays highscore information
      highscoreHeader.appendChild(highscoreHeaderText);
      highscoreDisplay.appendChild(highscoreHeader);
      highscoreLatest.appendChild(highscoreLatestText);
      highscoreDisplay.appendChild(highscoreLatest);
      highscoreDisplay.appendChild(goBackButton);
      highscoreDisplay.appendChild(clearButton);

      //Disable View Highscore Button
      highscoreButton.disabled = true;
    }
    
    
  
  
  
