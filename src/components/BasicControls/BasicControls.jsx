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

const BasicControls = ({ setPage, videoInfo }) => {
  const [isPlaying, setIsPlaying] = useState(1);
  const { basicData, loading, error, getBasicInfo } = useVideoInfo();
  const [sendMessage] = useSendMessage();
  const snippets = basicData?.items[0]?.snippet;
  const thumbnailURL = snippets?.thumbnails?.medium?.url;
  const title = snippets?.title;
  const channelTitle = snippets?.channelTitle;

  useEffect(() => {
    getBasicInfo(videoID);
  }, []);

  useEffect(() => {
    if (error === "No VideoID") {
      setPage(-1);
    }
  }, [error]);

  useEffect(() => {
    setIsPlaying(!videoInfo.paused);
  }, [videoInfo]);

  const changeVideoRunningStatus = () => {
    const callbackFunction = (response) => {
      setIsPlaying(response.running);
      console.log(response);
    };
    sendMessage({ type: "CHANGE_VIDEO_RUNNING_STATUS" }, callbackFunction);
  };

  return (
    <div className="basic-controls">
      <div className="content">
        <div className="thumbnail">
          <img src={thumbnailURL} alt="VideoThumbnail" />
        </div>
        <div className="video-info">
          <marquee>
            <h4 className="title">{title}</h4>
          </marquee>
          <h5 className="channnel-title">{channelTitle} </h5>
          <a
            target="_blank"
            href={`https://www.youtubepp.com/watch?v=${videoID}`}
            rel="noreferrer"
          >
            &nbsp;&nbsp;&nbsp;download
          </a>
        </div>

        <div className="controls">
          <button
            className="custom-btn "
            onClick={() => {
              changeVideoRunningStatus();
            }}
          >
            {!isPlaying ? (
              <i class="fas fa-play"></i>
            ) : (
              <i class="fas fa-pause"></i>
            )}
          </button>
          <button className="custom-btn">
            <a href="">&gt;|</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicControls;
