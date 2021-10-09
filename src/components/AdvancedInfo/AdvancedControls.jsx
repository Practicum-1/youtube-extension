import React from "react";
import "./AdvancedControls.scss";
import useSendMessage from "../../customHooks/useSendMessage";

const AdvancedControls = () => {
  const [sendMessage] = useSendMessage();
  const playbackSpeedIncrease = () => {
    const callbackFunction = (response) => {
      console.log(response);
    };
    sendMessage({ type: "INCREASE_PLAYBACK_SPEED" }, callbackFunction);
  };

  const playbackSpeedDecrease = () => {
    const callbackFunction = (response) => {
      console.log(response);
    };
    sendMessage({ type: "DECREASE_PLAYBACK_SPEED" }, callbackFunction);
  };

  return (
    <div className="advanced-controls">
      <div className="content">
        {" "}
        <button onClick={() => playbackSpeedIncrease()}>Increase Speed</button>
        <button onClick={() => playbackSpeedDecrease()}>Decrease Speed</button>
      </div>
    </div>
  );
};

export default AdvancedControls;
