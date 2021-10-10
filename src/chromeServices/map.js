import {
  getPlaybackSpeed,
  decreasePlaybackSpeed,
  increasePlaybackSpeed,
  setPlaybackSpeed,
} from "./messageReceivers/playbackControls";

import { changeVideoRunningStatus } from "./messageReceivers/basicControls";

import { sendCurrentVideoInfo } from "./messageReceivers/sendCurrentVideoInfo";

import { overallPlaylistTime } from "./messageReceivers/sendPlaylistInfo";

export const FUNCTION_MAP = {
  GET_PLAYBACK_SPEED: getPlaybackSpeed,
  DECREASE_PLAYBACK_SPEED: decreasePlaybackSpeed,
  INCREASE_PLAYBACK_SPEED: increasePlaybackSpeed,
  SET_PLAYBACK_SPEED: setPlaybackSpeed,
  CHANGE_VIDEO_RUNNING_STATUS: changeVideoRunningStatus,
  GET_CURRENT_VIDEO_INFO: sendCurrentVideoInfo,
};
