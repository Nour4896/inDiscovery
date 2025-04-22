const excitingGenres = ["Role-Playing", "Shooter", "Platformer", "Hack and Slash"]
const strategicGenres = ["Tactical", "Turn-Based", "Strategy", "RTS"]
const thoughtfulGenres = ["Puzzle", "Quiz", "Point and Click", "Visual Novel"]
const competitiveGenres = ["Fighting", "Racing", "Sport", "MOBA"]

const quizQuestions = [
  {
    question: "What system are you playing on?",
    options: ["Nintendo Switch", "PC", "PlayStation 5", "Xbox Series X"],
    name: "question1",
  },
  {
    question: "What vibe of game are you in the mood for?",
    options: ["Exciting", "Strategic", "Thoughtful", "Competitive"],
    name: "question2",
  },
  {
    question: "What genre would you like?",
    options: [],
    name: "question3",
  },
  {
    question: "Who are you playing with?",
    options: ["Single Player", "Online Co-Op", "Couch Co-Op", "Multiplayer"],
    name: "question4",
  },
];

const quizQuestion = document.querySelector("#quiz-question");
const quizForm = document.querySelector("#quiz-form");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let quizAnswers = {}

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  quizQuestion.textContent = currentQuestion.question;
  
  // retrieve the selected answer for current question from saved quiz answers
  const selectedAnswer = quizAnswers[currentQuestion.name];

  // dynamically updates question 3 options based on question 2's answer
  if (currentQuestionIndex === 2) {
    const selectedVibe = quizAnswers["question2"]; 

    if (selectedVibe === "Exciting") {
        quizQuestions[2].options = excitingGenres;
    } else if (selectedVibe === "Strategic") {
        quizQuestions[2].options = strategicGenres;
    } else if (selectedVibe === "Thoughtful") {
        quizQuestions[2].options = thoughtfulGenres;
    } else {
        quizQuestions[2].options = competitiveGenres;
    } 
  }

  quizForm.innerHTML = `
    ${currentQuestion.options
      .map(
        (option) => `
      <input type="radio" id="${option}" name="${currentQuestion.name}" value="${option}" ${selectedAnswer === option ? "checked" : ""} />
      <label for="${option}">${option}</label>`
      )
      .join("")}
    `;

  // disables the "Previous" button when on the first question
  prevBtn.disabled = currentQuestionIndex === 0;
  
  //disables the "Next" button if an answer is not selected
  nextBtn.disabled = !selectedAnswer;

  document.querySelectorAll(`input[name="${currentQuestion.name}"]`).forEach(input => {
    input.addEventListener("change", e => {
        quizAnswers[currentQuestion.name] = e.target.value;
        
        if (currentQuestion.name === "question2") {
            delete quizAnswers["question3"];
        }

        saveQuizAnswer(); 
        nextBtn.disabled = false;
    });
  });
}

function saveQuizAnswer() {
    localStorage.setItem("quizAnswers", JSON.stringify(quizAnswers));
}

function loadQuizAnswers() {
    const savedAnswers = localStorage.getItem("quizAnswers");
  
    if (savedAnswers) {
        quizAnswers = JSON.parse(savedAnswers);
    }
}

nextBtn.addEventListener("click", () => {
  // checks if the current question is not the last in the quiz
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  // checks that the current question is not the first in the quiz
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
});

document.addEventListener("DOMContentLoaded", () => {
    loadQuizAnswers()
    displayQuestion()
});
