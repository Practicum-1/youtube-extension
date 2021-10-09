import "./App.scss";
import React, { useState, useEffect } from "react";
import BasicControls from "./components/BasicControls/BasicControls";
import Unavailable from "./components/Unavailable/Unavailable";
import AdvancedControls from "./components/AdvancedInfo/AdvancedControls";
import useSendMessage from "./customHooks/useSendMessage";

function App() {
  const [page, setPage] = useState(0);
  const [videoInfo, setVideoInfo] = useState({ paused: 0, playbackSpeed: 1 });
  const [sendMessage] = useSendMessage();

  const getVideoInfo = () => {
    const callbackFunction = (response) => {
      console.log(response);
      setVideoInfo(response.info);
    };
    sendMessage({ type: "GET_CURRENT_VIDEO_INFO" }, callbackFunction);
  };

  useEffect(() => {
    getVideoInfo();
  }, []);

  return (
    <div className="app">
      {page === -1 && <Unavailable />}
      {page === 0 && (
        <>
          <BasicControls setPage={setPage} videoInfo={videoInfo} />
          <AdvancedControls videoInfo={videoInfo} />
        </>
      )}
    </div>
  );
}

export default App;
