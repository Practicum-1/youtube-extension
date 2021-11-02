import React, { useEffect, useState } from "react";
import "./Stats.scss";
import useVideoInfo from "../../customHooks/usePlaylistInfo";
import moment from "moment";

let url = "";
var playlistID = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  url = tabs[0]["url"];
  if (url.includes("youtube.com")) {
  }
});
var Query = new URLSearchParams(url.substring(url.indexOf("&") + 1));

const Stats = () => {
  const { getPlaylistInfo, playlistTime } = useVideoInfo();

  const getInfo = async () => {
    getPlaylistInfo({ playlistID });
  };

  useEffect(() => {
    Query = new URLSearchParams(url.substring(url.indexOf("&") + 1));
    playlistID = Query.get("list");
  }, [url]);

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
          {moment.utc(playlistTime * 1000).format("HH:mm:ss")}
        </div>
      </div>
    </div>
  );
};

export default Stats;
