"use strict";

//call openFullscreen after user has turned to landscape mode

// function openFullscreen() {
//   if (document.body.requestFullscreen) {
//     document.body.requestFullscreen({ navigationUI: "hide" });
//   } else if (document.body.mozRequestFullScreen) {
//     /* Firefox */
//     document.body.mozRequestFullScreen({ navigationUI: "hide" });
//   } else if (document.body.webkitRequestFullscreen) {
//     /* Chrome, Safari and Opera */
//     document.body.webkitRequestFullscreen({ navigationUI: "hide" });
//   } else if (document.body.msRequestFullscreen) {
//     /* IE/Edge */
//     document.body.msRequestFullscreen({ navigationUI: "hide" });
//   }
// }

//svg for portrait to landscape animation
// window.addEventListener("DOMContentLoaded", SVGloading);
// function SVGloading() {
//   fetch("/images/loading.svg")
//     .then(response => response.text())
//     .then(svgdata => {
//       document
//         .querySelector("#loading")
//         .insertAdjacentHTML("afterbegin", svgdata);
//     });
// }

window.addEventListener("DOMContentLoaded", loadIntroSVG);

const introLayer = document.querySelector(".layer--intro");
const firstPage = document.querySelector("#svg_firstpage");

//load introsvg for animations
function loadIntroSVG() {
  fetch("/images/firstpage.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#svg_firstpage")
        .insertAdjacentHTML("afterbegin", svgdata);
      console.log("I should work");
    });
}

//when play button in intro is clicked layer disappears
const playBtn = document.querySelector("#playBtn");
playBtn.addEventListener("click", nextPage);

function nextPage() {
  introLayer.classList.add("disappear");
  secondSVG();
}

//load point finger svg
function secondSVG() {
  fetch("/images/pointer.svg")
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector("#pointer")
        .insertAdjacentHTML("afterbegin", svgdata);
    });
}
