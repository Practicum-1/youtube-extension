import React, { useState, useEffect } from "react";
import "./BasicControls.scss";
import useVideoInfo from "../../customHooks/useVideoInfo";

var videoID = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  if (tabs[0]["url"].includes("youtube.com")) {
    videoID = tabs[0]["url"].substring(
      tabs[0]["url"].indexOf("=") + 1,
      tabs[0]["url"].indexOf("&") !== -1
        ? tabs[0]["url"].indexOf("&")
        : tabs[0]["url"].length
    );
  }
});

const BasicControls = ({ setPage }) => {
  const { basicData, loading, error, getBasicInfo } = useVideoInfo();
  const snippets = basicData?.items[0]?.snippet;
  const thumbnailURL = snippets?.thumbnails?.medium?.url;
  const title = snippets?.title;
  console.log(snippets, thumbnailURL);
  useEffect(() => {
    console.log("videoID", videoID);
    getBasicInfo(videoID);
  }, []);

  return (
    <div className="BasicControls">
      <div className="content">
        <img src={thumbnailURL} alt="VideoThumbnail" />
        <br />
        <br />
        {title}
      </div>
    </div>
  );
};

export default BasicControls;
