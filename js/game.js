"use strict";

const startBtn = document.querySelector(".button--start");
const finish = document.querySelector(".finish");
let XvalueFinish;
//get all horses in an array
let horseList = document.querySelectorAll(".horse");
let rankingList = [];

window.onload = function() {
  XvalueFinish = finish.getBoundingClientRect().left;

  startBtn.addEventListener("click", startRace);
};

function startRace() {
  startBtn.classList.add("hide");

  horseList.forEach(singleHorse => {
    if (singleHorse.id == "horse--6") {
      singleHorse.addEventListener("click", function() {
        moveUserHorse(singleHorse);
      });
    } else {
      horseMoveRandom(singleHorse);
    }
  });
}

// loop for 5 other horses to move at random speed
function horseMoveRandom(singleHorse) {
  // current X position of horse
  let horseX = singleHorse.getBoundingClientRect().left;
  // speed/distance travelled this loop
  let speed = Math.random() * (50 - 25) + 25;
  // new X position = current X + loop distance
  singleHorse.style.transform = `translateX(${horseX + speed}px)`;

  registerFinish(singleHorse);
}

function registerFinish(singleHorse) {
  let horseNose = singleHorse.getBoundingClientRect().right - 20;

  if (horseNose > XvalueFinish) {
    // finished horse pushed to array
    rankingList.push(singleHorse.id);
    console.log(rankingList);
    gameFinished();
  } else if (singleHorse.id !== "horse--6") {
    // each horse loops until finish is reached
    setTimeout(horseMoveRandom, Math.random() * 900, singleHorse);
  }
}

// make user horse move on click
function moveUserHorse(userHorse) {
  let userX = userHorse.getBoundingClientRect().left;
  let userSpeed = Math.random() * (90 - 50) + 50;

  userHorse.style.transform = `translateX(${userX + userSpeed}px)`;

  registerFinish(userHorse);
}

function gameFinished() {
  let winner = rankingList[0];
  let winnerElement = document.querySelector(`#${winner}`);
  winnerElement.parentNode.style.backgroundColor = "gold";

  if (rankingList.length === 6) {
    //show results when all horses finish
    showResults();
  }
}

const rankingDiv = document.querySelector(".overlay--ranking");

function showResults() {
  rankingDiv.classList.add("shown");

  rankingList.forEach(ranking => {
    let place = rankingList.indexOf(ranking) + 1;
    let rank = document.createElement("p");
    rank.textContent = `# ${place} : ${ranking}`;

    rankingDiv.appendChild(rank);
  });
}
