import React, { useEffect, useState } from "react";
import "./Stats.scss";
import useVideoInfo from "../../customHooks/usePlaylistInfo";

var videoID = "";
let url = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  url = tabs[0]["url"];
  if (url.includes("youtube.com")) {
    videoID = url.substring(
      url.indexOf("=") + 1,
      url.indexOf("&") !== -1 ? url.indexOf("&") : url.length
    );
  }
});

const Stats = () => {
  const { getPlaylistInfo } = useVideoInfo();

  const getInfo = async () => {
    getPlaylistInfo({ playlistID: "PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3" });
  };

  // useEffect(() => {
  //   if (url.includes("&list=")) {
  //     //   getData();
  //   }
  // }, []);

  return (
    <div className="stats">
      <div className="content">
        <button
          onClick={() => {
            getInfo();
          }}
        >
          Get Info
        </button>
      </div>
    </div>
  );
};

export default Stats;
