import React, { useEffect, useState } from "react";
import "./Stats.scss";
import useVideoInfo from "../../customHooks/usePlaylistInfo";
import moment from "moment";

var videoID = "";
let url = "";
var playlistID = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  url = tabs[0]["url"];
  if (url.includes("youtube.com")) {
    videoID = url.substring(
      url.indexOf("=") + 1,
      url.indexOf("&") !== -1 ? url.indexOf("&") : url.length
    );
    if (url.includes("&list=")) {
      playlistID = url.substring(
        url.indexOf("&list=") + 6,
        url.indexOf("&index=")
      );
    }
  }
});

const Stats = () => {
  const { getPlaylistInfo, playlistTime } = useVideoInfo();

  const getInfo = async () => {
    getPlaylistInfo({ playlistID });
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
          className="playlist-btn"
        >
          Get Overall Playlist Time
        </button>
        <div className="playlist-time">
          {console.log("playlist time", typeof playlistTime, playlistTime)}
          {moment.utc(playlistTime * 1000).format("HH:mm:ss")}
        </div>
      </div>
    </div>
  );
};

export default Stats;
