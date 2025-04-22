const excitingGenres = [
  "Role-Playing (RPG)",
  "Shooter",
  "Platform",
  "Hack and Slash",
];
const strategicGenres = [
  "Tactical",
  "Strategy",
  "Turn-based strategy (TBS)",
  "Real Time Strategy",
];
const thoughtfulGenres = [
  "Puzzle",
  "Quiz/Trivia",
  "Point-and-Click",
  "Visual Novel",
];
const competitiveGenres = ["Fighting", "Racing", "Sport", "MOBA"];

const quizQuestions = [
  {
    question: "What system are you playing on?",
    options: [
      "Nintendo Switch",
      "PC",
      "PlayStation 5",
      "Xbox Series X",
      "Mobile",
    ],
    name: "platform",
  },
  {
    question: "What vibe of game are you in the mood for?",
    options: ["Exciting", "Strategic", "Thoughtful", "Competitive"],
    name: "vibe",
  },
  {
    question: "What genre would you like?",
    options: [],
    name: "genre",
  },
  {
    question: "Are you looking for a solo or multiplayer experience?",
    options: ["Solo", "Multiplayer"],
    name: "multiplayerMode",
  },
];

const quizQuestion = document.querySelector("#quiz-question");
const quizForm = document.querySelector("#quiz-form");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
const userAnswers = {};

function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  quizQuestion.textContent = currentQuestion.question;

  // Update genre options if needed
  if (currentQuestion.name === "genre" && userAnswers.vibe) {
    currentQuestion.options =
      {
        Exciting: excitingGenres,
        Strategic: strategicGenres,
        Thoughtful: thoughtfulGenres,
        Competitive: competitiveGenres,
      }[userAnswers.vibe] || [];
  }

  // Generate radio buttons
  quizForm.innerHTML = currentQuestion.options
    .map(
      (option, index) => `
    <div class="option">
      <input type="radio" id="option-${index}" 
             name="${currentQuestion.name}" 
             value="${option}"
             ${userAnswers[currentQuestion.name] === option ? "checked" : ""}>
      <label for="option-${index}">${option}</label>
    </div>
  `
    )
    .join("");

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent =
    currentQuestionIndex === quizQuestions.length - 1 ? "Submit" : "Next";
}

// Prev and Next button handlers
nextBtn.addEventListener("click", () => {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selected = quizForm.querySelector(
    `input[name="${currentQuestion.name}"]:checked`
  );

  if (!selected) {
    alert("Please select an option before proceeding.");
    return;
  }

  userAnswers[currentQuestion.name] = selected.value;

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
});

function updateGenreOptions(vibe) {
  // Update the genre options based on the selected vibe
  const genreQuestion = quizQuestions.find((q) => q.name === "genre");
  if (genreQuestion) {
    switch (vibe) {
      case "Exciting":
        genreQuestion.options = excitingGenres;
        break;
      case "Strategic":
        genreQuestion.options = strategicGenres;
        break;
      case "Thoughtful":
        genreQuestion.options = thoughtfulGenres;
        break;
      case "Competitive":
        genreQuestion.options = competitiveGenres;
        break;
      default:
        genreQuestion.options = [];
    }
  }
}

// Start quiz
document.addEventListener("DOMContentLoaded", () => {
  if (quizQuestion && quizForm) displayQuestion();
});
