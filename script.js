var quizQ = [
  {
    q: "Who is the author the Broadway show, Hamilton?",
    ans: [
      "C.S. Lewis",
      "Winnie Holzman",
      "J.R.R. Tolkien",
      "Lin-Manuel Miranda",
    ],
    rightAns: 3,
  },
  {
    q: "Who is Alexander Hamilton's wife?",
    ans: [
      "Angelica Church",
      "Maria Reynolds",
      "Eliza Schuyler",
      "Peggy Schuyler",
    ],
    rightAns: 2,
  },
  {
    q: "How did Alexander Hamilton die?",
    ans: [
      "Died during the Revolutionary War",
      "Shot in a duel with Aaron Burr",
      "Killed during a hurricane",
      "Died due to smallpox",
    ],
    rightAns: 1,
  },
  {
    q: "What is Alexander Hamilton known for?",
    ans: [
      "First Secretary of Treasury",
      "Ambassador to France",
      "First Secretary of State",
      "First Vice President",
    ],
    rightAns: 0,
  },
];

// DOM elements
var hamiltonEl = document.querySelector("#hamilton");
var quizEl = document.querySelector("#quiz");
var startEL = document.getElementById("start");
var addEl = document.getElementById("add");
var qEL = document.getElementById("main");
var countdownEl = document.querySelector("#countdown");
var correctEl = document.getElementById("correct");
var ansEl = document.getElementById("ans");
var initialsEl = document.getElementById("initials");
var finalScore = document.getElementById("finalScore");
var rightEl = document.getElementById("right");
var resultsEl = document.getElementById("results");
var highScoresEl = document.getElementById("highScores");
var score = 0;
var secondsLeft = 30;
var qList = 0;
var lastQ = quizQ[qList];

// start button
function start() {
  resultsEl.innerHTML = " ";
  startEL = document.getElementById("start");
  getAns();
  countdown();
}
// user ans
function getAns() {
  var lastQ = quizQ[qList];
  var titleEL = document.getElementById("main");
  titleEL.textContent = lastQ.q;
  ansEl.innerHTML = "";
  lastQ.ans.forEach(function (choice, i) {
    var userAns = document.createElement("button");
    userAns.setAttribute("id", "quizAns");
    userAns.setAttribute("value", i);
    userAns.textContent = i++ + ". " + choice;
    userAns.onclick = userSelect;
    ansEl.appendChild(userAns);
  });
}
function userSelect(event) {
  event.preventDefault();
  if (this.value != quizQ[qList].rightAns) {
    secondsLeft -= 10;
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
    countdownEl.textContent = time;
    correctEl.textContent = "Wrong!";
  } else {
    correctEl.textContent = "You got it!";
    score++;
  }
  qList++;
  if (qList === 4) {
    results();
    return;
  }
  getAns();
}
// countdown element
function countdown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    countdownEl.textContent = `Seconds left = ${secondsLeft}`;

    if (secondsLeft === 0 || qList === 4) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
// provide final score
function results() {
  qEL.innerHTML = " ";
  ansEl.innerHTML = " ";
  finalScore.textContent = `Final Score = ${secondsLeft}`;
}
// add to top score
function resultsMem() {
  localStorage.setItem(initialsEl.value, score);
  var topScores = document.createElement("div");
  topScores.innerText = "Added to Top Scores!";
  rightEl.prepend(topScores);
}
// user=score from mem
function userRes() {
  if (localStorage.length == 0) {
    resultsEl.innerHTML = " ";
    var showResult = document.createElement("p");
    resultsEl.appendChild(showResult);
  } else {
    resultsEl.innerHTML = " ";
    for (i = 0; i < localStorage.length; i++) {
      var userInit = localStorage.key(i);
      var showResult = document.createElement("p");
      showResult.innerText = `${userInit} = ${secondsLeft}`;
      resultsEl.appendChild(showResult);
    }
  }
}
startEL.addEventListener("click", start);
addEl.addEventListener("click", resultsMem);
highScoresEl.addEventListener("click", userRes);
