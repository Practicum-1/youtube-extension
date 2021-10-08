import "./App.scss";
import React, { useState } from "react";
import useSendMessage from "./customHooks/useSendMessage";
import BasicControls from "./components/BasicControls/BasicControls";
import Unavailable from "./components/Unavailable/Unavailable";

chrome.tabs &&
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        // Current tab ID
        tabs[0].id || 0,

        // Message type
        { type: "CONNECTION SUCCESSFULL" },

        // Callback executed when the content script sends a response
        (response) => {
          console.log(response.msg);
        }
      );
    }
  );

function App() {
  const [sendMessage] = useSendMessage();
  const [page, setPage] = useState(0);

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

  const executeFunction = () => {
    const callbackFunction = (response) => {
      console.log(response);
    };
    sendMessage({ type: "SHIVANSH" }, callbackFunction);
  };

  return (
    <div className="App">
      {page === 0 && <BasicControls setPage={setPage} />}
      {page === -1 && <Unavailable />}
      <button onClick={() => executeFunction()}>Send message</button>
      <button onClick={() => playbackSpeedIncrease()}>Increase Speed</button>
      <button onClick={() => playbackSpeedDecrease()}>Decrease Speed</button>
    </div>
  );
}

export default App;
