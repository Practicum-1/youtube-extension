import React, { useState, useEffect } from "react";
import axios from "axios";

const usePlaylistInfo = () => {
  const [playlistTime, setPlaylistTime] = useState();
  const [playlistItems, setPlaylistItems] = useState([]); //Array containing VDO ids of playlist
  const [playlistItemsLength, setPlaylistItemsLength] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getVideosDuration = async () => {
    console.log(playlistItems, "final");
    setLoading(true);
    try {
      let url = `https://youtube.googleapis.com/youtube/v3/videos?part=id%2CcontentDetails&id=${playlistItems.join(
        ","
      )}&key=AIzaSyCDUUJgpm46YDrMMM6xx7shjbwWQajzmHM`;
      const response = await axios.get(url);
      console.log(response.data, "res");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(playlistItemsLength, playlistItems.length);
    if (playlistItemsLength === playlistItems.length) {
      getVideosDuration();
    }
  }, [playlistItems, playlistItemsLength]);

  const getPlaylistInfo = async ({ playlistID, pageToken = "" }) => {
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
