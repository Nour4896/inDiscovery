const quizQuestions = [
    {
      question: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      name: 'question1',
    },
    {
      question: 'Question 2',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      name: 'question2',
    },
    {
      question: 'Question 3',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      name: 'question3',
    },
  ];
  
  const quizQuestion = document.querySelector('#quiz-question');
  const quizForm = document.querySelector('#quiz-form');

  let currentQuestionIndex = 0;
  
  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
  
    quizForm.innerHTML = `
    ${currentQuestion.options
      .map(
        option => `
      <input type="radio" id="" name="${currentQuestion.name}" value="" />
      <label for="">${option}</label>`
      )
      .join('')}
    `;
  }
  
  document.addEventListener('DOMContentLoaded', displayQuestion);
  
  