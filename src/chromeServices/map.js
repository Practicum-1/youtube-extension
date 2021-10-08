import {
  getPlaybackSpeed,
  decreasePlaybackSpeed,
  increasePlaybackSpeed,
  setPlaybackSpeed,
} from "./messageReceivers/playback";

import { changeVideoRunningStatus } from "./messageReceivers/normalControls";

export const FUNCTION_MAP = {
  GET_PLAYBACK_SPEED: getPlaybackSpeed,
  DECREASE_PLAYBACK_SPEED: decreasePlaybackSpeed,
  INCREASE_PLAYBACK_SPEED: increasePlaybackSpeed,
  SET_PLAYBACK_SPEED: setPlaybackSpeed,
  CHANGE_VIDEO_RUNNING_STATUS: changeVideoRunningStatus,
};
