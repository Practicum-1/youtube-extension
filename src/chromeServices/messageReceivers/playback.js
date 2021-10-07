export const increasePlaybackSpeed = () => {
  document.getElementsByClassName("html5-main-video")[0].playbackRate += 0.25;
  const currentPlaybackSpeed =
    document.getElementsByClassName("html5-main-video")[0].playbackRate;
  return { msg: "speed increased", currentPlaybackSpeed };
};

export const decreasePlaybackSpeed = () => {
  document.getElementsByClassName("html5-main-video")[0].playbackRate -= 0.25;
  const currentPlaybackSpeed =
    document.getElementsByClassName("html5-main-video")[0].playbackRate;
  return { msg: "speed decreased", currentPlaybackSpeed };
};

export const getPlaybackSpeed = () => {
  let currentPlaybackSpeed =
    document.getElementsByClassName("html5-main-video")[0].playbackRate;
  return { msg: "speed fetched", currentPlaybackSpeed };
};

export const setPlaybackSpeed = (playbackSpeed) => {
  document.getElementsByClassName("html5-main-video")[0].playbackRate =
    playbackSpeed;
  return { msg: "speed set", playbackSpeed };
};
