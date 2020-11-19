const API_URL = "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple";
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');

// load and set up the app
async function getapi(url) {
   const response = await fetch(url);
   let data = await response.json();

   let res = renderQuestionData(data.results);

   // show the result from api
   console.log(res);
   buildQuiz(res);

   // check the answer when submit answers
   submitButton.addEventListener('click', () => showResults(res));
}
getapi(API_URL);


// FUNCTION
// show quizz
function buildQuiz(questionData) {
   questionData.map((question, index) => {
      // console.log(question, index)
      createQuestion({ index, question })
   })
}
function createQuestion({ index, question }) {
   const quizzWrapper = document.createElement("div")
   quizzWrapper.classList.add('quiz-container');
   quizzWrapper.innerHTML = `
      <h3>${index + 1}. ${question.question}</h3>
      <div class="answers answers_${index + 1}">
         ${createAnswer(index + 1, question.answers)}
      </div>
      <label id="quiz_result_${index + 1}"></label>`;
   document.querySelector('#quiz').appendChild(quizzWrapper);
}
function createAnswer(index, answers) {
   let answerLabel = '';
   answers.map((answer) => (
      answerLabel += `<label>
         <input type="radio" name="question_${index}" value="${answer}"/> ${answer}
      </label>`
   ));
   return answerLabel;
}

function showResults(questionData) {
   let numCorrect = 0;
   const answerContainers = quizContainer.querySelectorAll('.answers');
   // console.log(answerContainers);
   questionData.forEach((thisQuestion, index) => {
      // user answer
      const answerContainer = answerContainers[index];
      const selector = `input[name=question_${index + 1}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // check the answer and show the correct ones
      if (userAnswer === thisQuestion.correct_answer) {
         numCorrect++;
         answerContainers[index].style.color = 'lightgreen';
      } else {
         answerContainers[index].style.color = 'red';
         const quizResult = document.getElementById(`quiz_result_${index + 1}`);
         quizResult.innerText = '==>Đáp án: ' + thisQuestion.correct_answer;
      }
   });
   let announce = `Bạn đã trả lời đúng:  ${numCorrect}/${questionData.length}\n ===> Số điểm: ${numCorrect * 10}/${questionData.length * 10}`;
   alert(announce);
}

// utils
renderQuestionData = (data) => {
   return data.map((question) => {
      return ({
         ...question,
         answers: randomAnswers([
            ...question.incorrect_answers,
            question.correct_answer
         ])
      })
   });
}
// small function to randomize the answers to the question
randomAnswers = (array) => {
   return [...array].sort(() => Math.random() - 0.5);
}
