import {
  getPlaybackSpeed,
  decreasePlaybackSpeed,
  increasePlaybackSpeed,
  setPlaybackSpeed,
} from "./messageReceivers/playbackControls";

import { changeVideoRunningStatus } from "./messageReceivers/basicControls";

import { sendCurrentVideoInfo } from "./messageReceivers/sendCurrentVideoInfo";

export const FUNCTION_MAP = {
  GET_PLAYBACK_SPEED: getPlaybackSpeed,
  DECREASE_PLAYBACK_SPEED: decreasePlaybackSpeed,
  INCREASE_PLAYBACK_SPEED: increasePlaybackSpeed,
  SET_PLAYBACK_SPEED: setPlaybackSpeed,
  CHANGE_VIDEO_RUNNING_STATUS: changeVideoRunningStatus,
  GET_CURRENT_VIDEO_INFO: sendCurrentVideoInfo,
};

// Snippet which maps the function names to the functions themselves in the FUNCTION_MAP object.
