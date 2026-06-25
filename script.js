const quizData = [
  {
    question: "Who is often called the King of Bollywood?",
    options: ["Aamir Khan", "Shah Rukh Khan", "Ranbir Kapoor", "Hrithik Roshan"],
    answer: "Shah Rukh Khan"
  },
  {
    question: "Which movie features the characters Raj and Simran?",
    options: ["Kuch Kuch Hota Hai", "Kal Ho Naa Ho", "Dilwale Dulhania Le Jayenge", "Veer-Zaara"],
    answer: "Dilwale Dulhania Le Jayenge"
  },
  {
    question: "Which actress starred in 'Gangubai Kathiawadi'?",
    options: ["Alia Bhatt", "Deepika Padukone", "Kareena Kapoor", "Kiara Advani"],
    answer: "Alia Bhatt"
  },
  {
    question: "Which film is famous for the dialogue 'All is well'?",
    options: ["3 Idiots", "Taare Zameen Par", "Chhichhore", "PK"],
    answer: "3 Idiots"
  },
  {
    question: "Who played Kabir in 'Kabhi Khushi Kabhie Gham'?",
    options: ["Salman Khan", "Shahid Kapoor", "Shah Rukh Khan", "Saif Ali Khan"],
    answer: "Shah Rukh Khan"
  },
  {
    question: "Which actor is known as Mr. Perfectionist?",
    options: ["Ranveer Singh", "Aamir Khan", "Akshay Kumar", "Ajay Devgn"],
    answer: "Aamir Khan"
  },
  {
    question: "Which movie features the song 'Kesariya'?",
    options: ["Pathaan", "Brahmastra", "Rocky Aur Rani Kii Prem Kahaani", "Jawan"],
    answer: "Brahmastra"
  },
  {
    question: "Which actress starred opposite Shah Rukh Khan in 'Chennai Express'?",
    options: ["Priyanka Chopra", "Anushka Sharma", "Deepika Padukone", "Katrina Kaif"],
    answer: "Deepika Padukone"
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
const progressEl = document.querySelector("#progress");
const messageEl = document.querySelector("#message");
const restartBtn = document.querySelector("#restartBtn");

function startTimer() {
  clearInterval(timerId);
  timeLeft = 10;
  timerEl.textContent = `${timeLeft}s`;

  timerId = setInterval(function () {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerId);
      checkAnswer("");
    }
  }, 1000);
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

function updateProgress() {
  progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
}

function loadQuestion() {
  restartBtn.style.display = "none";
  messageEl.textContent = "";
  updateProgress();

  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.options.forEach(function (option) {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.addEventListener("click", function () {
      clearInterval(timerId);

      if (option === quizData[currentQuestion].answer) {
        messageEl.textContent = "Correct answer!";
      } else {
        messageEl.textContent = `Oops! Correct answer: ${quizData[currentQuestion].answer}`;
      }

      setTimeout(function () {
        checkAnswer(option);
      }, 700);
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
  timerEl.textContent = "Done";
  progressEl.textContent = `Completed ${quizData.length} questions`;
  restartBtn.style.display = "block";

  if (score === quizData.length) {
    messageEl.textContent = `Perfect score! You got ${score}/${quizData.length}.`;
  } else if (score >= 6) {
    messageEl.textContent = `Amazing! You scored ${score}/${quizData.length}.`;
  } else if (score >= 4) {
    messageEl.textContent = `Nice! You scored ${score}/${quizData.length}.`;
  } else {
    messageEl.textContent = `Fun start! You scored ${score}/${quizData.length}. Try again.`;
  }
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
