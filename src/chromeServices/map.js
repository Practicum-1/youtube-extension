import {
  getPlaybackSpeed,
  decreasePlaybackSpeed,
  increasePlaybackSpeed,
  setPlaybackSpeed,
} from "./messageReceivers/playback";

export const FUNCTION_MAP = {
  GET_PLAYBACK_SPEED: getPlaybackSpeed,
  DECREASE_PLAYBACK_SPEED: decreasePlaybackSpeed,
  INCREASE_PLAYBACK_SPEED: increasePlaybackSpeed,
  SET_PLAYBACK_SPEED: setPlaybackSpeed,
};
