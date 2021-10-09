const videoElement = document.getElementsByClassName("html5-main-video")[0];

export const changeVideoRunningStatus = () => {
  !videoElement.paused ? videoElement.pause() : videoElement.play();
  return { msg: "status changed", running: !videoElement.paused }; //running:1 means running
};
