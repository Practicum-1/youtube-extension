import React, { useEffect, useState } from "react";
import "./Stats.scss";

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
  useEffect(() => {
    if (url.includes("&list=")) {
      //   getData();
    }
  }, []);

  return (
    <div className="stats">
      <div className="content"> HLLO</div>
    </div>
  );
};

export default Stats;
