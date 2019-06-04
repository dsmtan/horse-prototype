//call openFullscreen after user has turned to landscape mode

function openFullscreen() {
  if (document.body.requestFullscreen) {
    document.body.requestFullscreen({ navigationUI: "hide" });
  } else if (document.body.mozRequestFullScreen) {
    /* Firefox */
    document.body.mozRequestFullScreen({ navigationUI: "hide" });
  } else if (document.body.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    document.body.webkitRequestFullscreen({ navigationUI: "hide" });
  } else if (document.body.msRequestFullscreen) {
    /* IE/Edge */
    document.body.msRequestFullscreen({ navigationUI: "hide" });
  }
}
