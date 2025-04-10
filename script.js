const quizQuestions = [
  {
    question: "Question 1",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    name: "question1",
  },
  {
    question: "Question 2",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    name: "question2",
  },
  {
    question: "Question 3",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    name: "question3",
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
