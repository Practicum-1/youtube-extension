import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const usePlaylistInfo = () => {
  const [playlistTime, setPlaylistTime] = useState(0);
  const [playlistItems, setPlaylistItems] = useState([]); //Array containing VDO ids of playlist
  const [playlistItemsLength, setPlaylistItemsLength] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getVideosDuration = async () => {
    setLoading(true);
    var n = 0;
    do {
      var subArr = playlistItems.slice(n, n + 46);
      n = n + 46;
      if (subArr.length !== 0) {
        try {
          let url = `https://youtube.googleapis.com/youtube/v3/videos?part=id%2CcontentDetails&id=${subArr.join(
            ","
          )}&key=AIzaSyCDUUJgpm46YDrMMM6xx7shjbwWQajzmHM`;
          const response = await axios.get(url);
          response.data.items.map((item) => {
            console.log(item.contentDetails.duration);
            const duration = item.contentDetails.duration.substring(2);
            const formatted = duration.replace("H", ":").replace("M", ":");
            // const seconds = formatted.includes("S")
            //   ? formatted.substring(formatted.lastIndexOf(":") + 1)
            //   : 0;
            // console.log(seconds);
            // const minutes = formatted
            //   .substring(0, formatted.lastIndexOf(":"))
            //   .substring(
            //     formatted
            //       .substring(0, formatted.lastIndexOf(":"))
            //       .lastIndexOf(":") + 1
            //   );

            // const hours = formatted
            //   .substring(0, formatted.lastIndexOf(":"))
            //   .substring(
            //     0,
            //     formatted
            //       .substring(0, formatted.lastIndexOf(":"))
            //       .lastIndexOf(":")
            //   );
            const seconds = duration.includes("S")
              ? duration.substring(
                  duration.includes("M") ? duration.indexOf("M") + 1 : 0,
                  duration.indexOf("S")
                )
              : 0;
            console.log(duration.indexOf("M"), duration.indexOf("S"));
            const minutes = duration.includes("M")
              ? duration.substring(
                  duration.includes("H") ? duration.indexOf("H") + 1 : 0,
                  duration.indexOf("M")
                )
              : 0;
            const hours = duration.includes("H")
              ? duration.substring(0, duration.indexOf("H"))
              : 0;
            console.log("S", seconds, "M", minutes, "H", hours);
            setPlaylistTime((prevState) => {
              return (
                prevState +
                (seconds !== "" ? parseInt(seconds) : 0) +
                (minutes !== "" ? parseInt(minutes) * 60 : 0) +
                (hours !== "" ? parseInt(hours) * 360 : 0)
              );
            });
          });
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError(err);
          setLoading(false);
        }
      }
    } while (subArr.length !== 0);
  };

  useEffect(() => {
    if (playlistItemsLength === playlistItems.length) {
      getVideosDuration();
    }
  }, [playlistItems, playlistItemsLength]);

  const getPlaylistInfo = async ({ playlistID, pageToken = "" }) => {
    console.log("playlistID in hook", playlistID);
    if (
      playlistID === localStorage.getItem("playlistID") &&
      playlistID !== ""
    ) {
      setPlaylistTime(JSON.parse(localStorage.getItem("playlistTime")));
      return 1;
    } else if (playlistID !== "") {
      setLoading(true);
      try {
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistID}&key=AIzaSyCDUUJgpm46YDrMMM6xx7shjbwWQajzmHM&maxResults=50&pageToken=${pageToken}`;
        const response = await axios.get(url);
        setPlaylistItems((prevState) => {
          return [
            ...prevState,
            ...response.data.items.map((item) => {
              return item.contentDetails.videoId;
            }),
          ];
        });
        setPlaylistItemsLength(response.data.pageInfo.totalResults);
        if (response.data.nextPageToken) {
          getPlaylistInfo({
            playlistID,
            pageToken: response.data.nextPageToken,
          });
        } else {
          console.log("finished");
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    } else {
      setError("No VideoID");
    }
  };
  return { playlistTime, loading, setLoading, getPlaylistInfo, error };
};

export default usePlaylistInfo;
