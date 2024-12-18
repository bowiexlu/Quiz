let currentQuestionNumber = 0;
let points = 0;
let playerName = "";

// Set up the questions 
const questions = [
    // Question 1
    {
        question: "Vad är det allmänna namnet för diväteoxid?", 
        answers: ["Vatten", "Koldioxid", "Syre"], 
        correct: 0
    },
    // Question 2
    {
        question: "Vilket är det största landet i världen?", 
        answers: ["USA", "Ryssland", "Kanada"], 
        correct: 1 
    },
    // Question 3
    {
        question: "Vilket årtionde uppfanns Internet?",
        answers: ["1960-talet", "1970-talet", "1980-talet"],
        correct: 1 
    },
    // Question 4
    {
        question: "Vilket är det minsta primtalet?",
        answers: ["1", "2", "3"],
        correct: 1
    },
    // Question 5
    {
        question: "Vad heter Sveriges huvudstad?",
        answers: ["Göteborg", "Malmö", "Stockholm"],
        correct: 2
    },
    // Question 6
    {
        question: "Vilket grundämne har kemiska symbolen O?",
        answers: ["Syre", "Väte", "Kväve"],
        correct: 0
    },
    // Question 7
    {
        question: "Vem skrev 'Romeo och Julia'?",
        answers: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
        correct: 1
    },
    // Question 8
    {
        question: "Vad är världens högsta berg?",
        answers: ["K2", "Mount Everest", "Mont Blanc"],
        correct: 1
    },
    // Question 9
    {
        question: "Vad är det allmänna namnet för H2O?", 
        answers: ["Vatten", "Koldioxid", "Syre"], 
        correct: 0
    },
    // Question 10
    {
        question: "Vilket land använder valutan Yen?",
        answers: ["Kina", "Japan", "Sydkorea"],
        correct: 1
    }

];

// Reference to index
const playerNameSpan = document.getElementById("player-name");
const playerPointsSpan = document.getElementById("player-points");
const questionNumberSpan = document.getElementById("question-number");

const questionField = document.getElementById("question-field");
const answer1Field = document.getElementById("answer-1-field");
const answer2Field = document.getElementById("answer-2-field");
const answer3Field = document.getElementById("answer-3-field");
const feedbackPlayer = document.getElementById("feedback-player");

// Start quiz function 
function startQuiz() {
    playerName = document.getElementById("name-input").value;

    // Hide and show the game interface
    document.getElementById("game-start").style.display = "none";
    document.getElementById("game-in-progress").style.display = "block";

    // Display the points
    playerPointsSpan.textContent = points; 

    // Initialize the question 
    populateQuestionFields();
}

// Populate question fields function 
function populateQuestionFields() {
    const currentQuestion = questions[currentQuestionNumber];
    
    // Update the number of question
    const totalQuestions = questions.length;
    document.getElementById("question-number").textContent = `${currentQuestionNumber + 1}/${totalQuestions}`;
    document.getElementById("question-title").textContent = `Fråga ${currentQuestionNumber + 1}`;

    document.getElementById("question-field").textContent = currentQuestion.question;

    document.getElementById("answer-1-field").textContent = currentQuestion.answers[0];
    document.getElementById("answer-2-field").textContent = currentQuestion.answers[1];
    document.getElementById("answer-3-field").textContent = currentQuestion.answers[2];

}

// Validate user answer function
function validateUserAnswer() {
    const selectedAnswer = document.querySelector('input[name="answers"]:checked');

    if (!selectedAnswer) {
        alert("Please choose an answer!");
        return;
    }

    
    const userChoice = parseInt(selectedAnswer.value);

    // Check if the answer is correct
    if (userChoice == questions[currentQuestionNumber].correct) {
        points++;
    }

    playerPointsSpan.textContent = points;

    // Delete the choice
    selectedAnswer.checked = false;

    // If this is not the last question
    if (currentQuestionNumber < questions.length - 1) {
        currentQuestionNumber++;
        populateQuestionFields();
      } else {
        endQuiz(); 
      }
}

// End quiz function 
function endQuiz() {
    document.getElementById("game-in-progress").style.display = "none";
    document.getElementById("game-feedback").style.display = "block";
  
    // Display the score
    document.getElementById("total-player-points").textContent = `${points}/${questions.length}`;

  
    // Display the feedback
    const feedback = validateUserScore(points, playerName);
    document.querySelector("#game-feedback h3").textContent = feedback;
  
    // If the score is perfect
    if (points === 10) {
        startConfetti();

        // The victory sound will be played
        feedbackPlayer.src = "assets/success.mp3";
    } else {
        // The failure sound will be played
        feedbackPlayer.src = "assets/failure.mp3"; 
    }

    feedbackPlayer.play();
  }
  
  // Validate user score function 
  function validateUserScore(score) {
    if (score <= 3) return "Inte bra, du behöver studera mer!";
    if (score <= 6) return "Ganska bra, men du kan bättre!";
    if (score <= 9) return "Bra jobbat!";
    if (score == 10) return `Grattis ${playerName}, du är slutför frågesporten!`;
  }
  
  // Restart quiz function 
  function restartQuiz() {
    currentQuestionNumber = 0;
    points = 0;
    
    document.getElementById("game-feedback").style.display = "none";
    document.getElementById("game-start").style.display = "block";
  }
  
  // Ribbon effect by confetti.js
  function startConfetti() {
    confetti({
        particleCount: 75,       
        startVelocity: 25,       
        spread: 360,             
        origin: { x: 0.5, y: 0.5 }, 
        scalar: 1,               
        colors: ['#bb0000', '#ffffff'], 
        disableForReducedMotion: true  
    });
}
  
  // Event listener
  document.getElementById("start-game-btn").addEventListener("click", startQuiz);
  document.getElementById("user-answer-btn").addEventListener("click", validateUserAnswer);
  document.getElementById("restart-game-btn").addEventListener("click", restartQuiz);