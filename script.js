const quizData = [
  {
    question: "Which language runs in the browser?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "Which method selects an element?",
    options: ["querySelector()", "print()", "push()", "sort()"],
    answer: "querySelector()"
  },
  {
    question: "Which event happens on a button click?",
    options: ["hover", "click", "scroll", "load"],
    answer: "click"
  },
  {
    question: "Which keyword is used to declare a variable?",
    options: ["let", "style", "query", "click"],
    answer: "let"
  },
  {
    question: "Which property changes text inside an element?",
    options: ["innerHTML", "src", "href", "classNameOnly"],
    answer: "innerHTML"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerId;

const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const scoreEl = document.querySelector("#score");
const timerEl = document.querySelector("#timer");
const restartBtn = document.querySelector("#restartBtn");

function startTimer() {
  clearInterval(timerId);
  timeLeft = 10;
  timerEl.textContent = "Time left: " + timeLeft;

  timerId = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerId);
      checkAnswer("");
    }
  }, 1000);
}

function updateScore() {
  scoreEl.textContent = "Score: " + score;
}

function loadQuestion() {
  restartBtn.style.display = "none";

  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.options.forEach(function (option) {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.addEventListener("click", function () {
      clearInterval(timerId);
      checkAnswer(option);
    });

    answersEl.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selected) {
  if (selected === quizData[currentQuestion].answer) {
    score++;
    updateScore();
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  clearInterval(timerId);
  questionEl.textContent = "Quiz finished!";
  answersEl.innerHTML = "";
  timerEl.textContent = "Final Score";
  scoreEl.textContent = "You scored " + score + " out of " + quizData.length;
  restartBtn.style.display = "block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  updateScore();
  loadQuestion();
}

restartBtn.addEventListener("click", restartQuiz);

updateScore();
loadQuestion();
