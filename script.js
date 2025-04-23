const excitingGenres = [
  "Role-Playing",
  "Shooter",
  "Platform",
  "Hack and Slash",
];
const strategicGenres = [
  "Tactical",
  "Strategy",
  "Turn-based strategy",
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

    options: [], // Will be populated based on vibe selection
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
let quizAnswers = {}

function displayQuestion() {
  const quizQuestion = document.querySelector("#quiz-question");
  const quizForm = document.querySelector("#quiz-form");
  const prevBtn = document.querySelector("#prev-btn");
  const nextBtn = document.querySelector("#next-btn");

  if (!quizQuestion || !quizForm || !prevBtn || !nextBtn) return;

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

function setupQuizEventListeners() {
  const prevBtn = document.querySelector("#prev-btn");
  const nextBtn = document.querySelector("#next-btn");

  if (!prevBtn || !nextBtn) return;

  // Next button handler
  nextBtn.addEventListener("click", () => {
    const quizForm = document.querySelector("#quiz-form");
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
    } else {
      // Submit the quiz when on the last question
      submitQuiz();
    }
  });

  // Previous button handler
  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
    }
  });
}

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

function submitQuiz() {
  // Store the answers in session storage
  sessionStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
  window.location.href = "quizResults.html";
}

async function loadQuizResults() {
  const answers = JSON.parse(sessionStorage.getItem("quizAnswers"));
  if (!answers) {
    alert("No quiz answers found. Please take the quiz first.");
    window.location.href = "quiz.html";
    return;
  }

  try {
    const response = await fetch("/api/quiz-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });

    const games = await response.json();
    displayResults(games);
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    alert("Failed to get game recomendations. Please try again.");
  }
}

function displayResults(games) {
  // Get results
  const gameResults = document.querySelectorAll(".result");

  // Display upto 9 games or however many games populate
  games.slice(0, gameResults.length).forEach((game, index) => {
    const games = gameResults[index];

    games.innerHTML = `
      <div class="game-card">
        <h3 class="game-title">${game.name}</h3>
        ${
          game.cover
            ? `<img src="${game.cover}" class="game-cover" alt="${game.name} cover">`
            : ""
        }
        <p class="game-rating">Rating: ${Math.round(game.total_rating)}/100</p>
        <p class="game-summary">${game.summary}</p>
      </div>
    `;
  });
}
// Function to display random game
function displayRandomGame(game) {
  const randomizerTitle = document.querySelector(".random_title");
  const randomizerCover = document.querySelector(".game_cover");
  const randomizerDescription = document.querySelector(".description");

  if (randomizerTitle) {
    randomizerTitle.textContent = game.name;
  }

  if (randomizerCover && game.cover) {
    randomizerCover.src = game.cover;
  }

  if (randomizerDescription) {
    randomizerDescription.textContent = game.summary;
  }
}

// Function to fetch and display random game
async function fetchRandomGame() {
  try {
    const response = await fetch("/api/random-game");
    const game = await response.json();
    displayRandomGame(game);
  } catch (error) {
    console.error("Error fetching random game:", error);
    alert("Failed to get a random game. Please try again.");
  }
}

// Function to set up randomizer event listener
function setupRandomizerEventListener() {
  const randomizerButton = document.querySelector(".randomizer");

  if (randomizerButton) {
    randomizerButton.addEventListener("click", fetchRandomGame);
  }
}

// Start quiz or load results when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the quiz page
  const quizQuestion = document.querySelector("#quiz-question");
  const quizForm = document.querySelector("#quiz-form");

  if (quizQuestion && quizForm) {
    displayQuestion();
    setupQuizEventListeners();
  }

  // Check if we're on the results page
  const finalResults = document.querySelector(".results_row");
  if (finalResults) {
    loadQuizResults();
  }
  // Check if we're on the randomizer page
  const randomizerButton = document.querySelector(".randomizer");
  if (randomizerButton) {
    setupRandomizerEventListener();
    // Load an initial random game when the page loads
    fetchRandomGame();
  }
});
