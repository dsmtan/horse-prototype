"use strict";

const gameLayer = document.querySelector(".layer--game");
const startBtn = document.querySelector(".button--start");
const finish = document.querySelector(".div--finish");

let XvalueFinish;
//get all horses in an array
let horseList = document.querySelectorAll(".div--horse");
let horseNames = ["green", "orange", "black", "red"];
let rankingList = [];

const firstHorse = document.querySelector(".track--1 > .div--horse");
const secondHorse = document.querySelector(".track--2 > .div--horse");
const thirdHorse = document.querySelector(".track--3 > .div--horse");
const userHorse = document.querySelector("#horse--user");

//testing user selection of background and horse
let userChoices = {
  location: "location--4",
  horse: "green"
};

window.onload = function() {
  XvalueFinish = finish.getBoundingClientRect().left;

  //set chosen location as backgroundimg
  setLocationBg();

  //place all horses in tracks with user's horse at bottom
  placeHorses();

  startBtn.addEventListener("click", startRace);
};

function setLocationBg() {
  gameLayer.style.backgroundImage = `url(../images/${
    userChoices.location
  }.svg)`;
}

function placeHorses() {
  //place chosen horse in bottom track
  userHorse.style.backgroundImage = `url(../images/horse--${
    userChoices.horse
  }.png)`;

  //give all other horses a track
  horseNames.splice(horseNames.indexOf(userChoices.horse), 1);

  firstHorse.style.backgroundImage = `url(../images/horse--${
    horseNames[0]
  }.png)`;
  firstHorse.id = horseNames[0];

  secondHorse.style.backgroundImage = `url(../images/horse--${
    horseNames[1]
  }.png)`;
  secondHorse.id = horseNames[1];

  thirdHorse.style.backgroundImage = `url(../images/horse--${
    horseNames[2]
  }.png)`;
  thirdHorse.id = horseNames[2];
}

function startRace() {
  startBtn.classList.add("hide");

  horseList.forEach(singleHorse => {
    //add galloping animation
    singleHorse.classList.add("galloping");

    if (singleHorse.id == "horse--user") {
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
  let horseNose = singleHorse.getBoundingClientRect().right - 15;

  if (horseNose > XvalueFinish) {
    // finished horse pushed to array
    rankingList.push(singleHorse.id);

    //remove galloping animation
    singleHorse.classList.remove("galloping");
    gameFinished();
  } else if (singleHorse.id !== "horse--user") {
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

  if (rankingList.length === 4) {
    //show results when all horses finish
    showResults();
  }
}

const rankingDiv = document.querySelector(".layer--ranking");

function showResults() {
  rankingDiv.classList.add("shown");

  rankingList.forEach(rankedHorse => {
    let place = rankingList.indexOf(rankedHorse) + 1;
    let rank = document.createElement("p");

    if (rankedHorse === "horse--user") {
      rank.textContent = `# ${place} : YOU!!!`;
    } else {
      rank.textContent = `# ${place} : ${rankedHorse}`;
    }

    rankingDiv.appendChild(rank);
  });
}
