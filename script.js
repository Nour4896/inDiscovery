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
    options: ["RPG", "Platformer", "Puzzle", "Shooter"],
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

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  quizQuestion.textContent = currentQuestion.question;

  quizForm.innerHTML = `
    ${currentQuestion.options
      .map(
        (option) => `
      <input type="radio" id="" name="${currentQuestion.name}" value="${option}" />
      <label for="">${option}</label>`
      )
      .join("")}
    `;

  // disables the "Previous" button when on the first question
  prevBtn.disabled = currentQuestionIndex === 0;
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

document.addEventListener("DOMContentLoaded", displayQuestion);
