import React, { useState, useEffect } from "react";
import "./BasicControls.scss";
import useVideoInfo from "../../customHooks/useVideoInfo";
import useSendMessage from "../../customHooks/useSendMessage";

var videoID = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0]["url"];
  if (url.includes("youtube.com")) {
    videoID = url.substring(
      url.indexOf("=") + 1,
      url.indexOf("&") !== -1 ? url.indexOf("&") : url.length
    );
  }
});

const BasicControls = ({ setPage }) => {
  const { basicData, loading, error, getBasicInfo } = useVideoInfo();
  const [sendMessage] = useSendMessage();
  const snippets = basicData?.items[0]?.snippet;
  const thumbnailURL = snippets?.thumbnails?.default?.url;
  const title = snippets?.title;
  console.log(snippets, thumbnailURL);

  useEffect(() => {
    getBasicInfo(videoID);
  }, []);

  const changeVideoRunningStatus = () => {
    const callbackFunction = (response) => {
      console.log(response);
    };
    sendMessage({ type: "CHANGE_VIDEO_RUNNING_STATUS" }, callbackFunction);
  };

  return (
    <div className="basic-controls">
      <div className="content">
        <img src={thumbnailURL} alt="VideoThumbnail" />
        {title}
        <button
          onClick={() => {
            changeVideoRunningStatus();
          }}
        >
          ||
        </button>
        <button>
          <a href="">&gt;</a>|
        </button>
      </div>
    </div>
  );
};

export default BasicControls;
