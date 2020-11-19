const api_url =
   "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple";
let myQuestions = [];

(function () {

   function buildQuiz() {
      const output = [];
      myQuestions.forEach(
         (currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
               answers.push(
                  `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
               ${letter} :
               ${currentQuestion.answers[letter]}
             </label>`
               );
            }
            output.push(
               `<div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join('')} </div>`
            );
         }
      );
      quizContainer.innerHTML = output.join('');
   }

   function showResults() {


      const answerContainers = quizContainer.querySelectorAll('.answers');

      let numCorrect = 0;

      myQuestions.forEach((currentQuestion, questionNumber) => {
         const answerContainer = answerContainers[questionNumber];
         const selector = `input[name=question${questionNumber}]:checked`;
         const userAnswer = (answerContainer.querySelector(selector) || {}).value;

         if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
         }
         else {
            answerContainers[questionNumber].style.color = 'red';
         }
      });

      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
   }



   const quizContainer = document.getElementById('quiz');
   const resultsContainer = document.getElementById('results');
   const submitButton = document.getElementById('submit');

   async function getapi(url) {
      const response = await fetch(url);
      var data = await response.json();

      myQuestions = data.results;

      console.log(myQuestions)
      buildQuiz();

      submitButton.addEventListener('click', showResults);
   }

   getapi(api_url);

})();