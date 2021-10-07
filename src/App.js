import "./App.scss";
import React from "react";
import useSendMessage from "./customHooks/useSendMessage";

var url = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  console.log(tabs);
});

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
      Hello, This is an react-extension-app made by me, <br></br>Shivansh Verma
      😄.<br></br>{" "}
      <a
        href={`https://github.com/ShivanshVerma-coder/cra-for-extension.git`}
        target="_blank"
        rel="noreferrer"
      >
        Get started
      </a>{" "}
      Happy coding !!! 😉😉
      <button onClick={() => executeFunction()}>Send message</button>
      <button onClick={() => playbackSpeedIncrease()}>Increase Speed</button>
      <button onClick={() => playbackSpeedDecrease()}>Decrease Speed</button>
    </div>
  );
}

export default App;
