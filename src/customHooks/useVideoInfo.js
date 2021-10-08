import React, { useState } from "react";
import axios from "axios";

const useVideoInfo = () => {
  const [basicData, setBasicData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const getBasicInfo = async (videoID) => {
    if (videoID !== "") {
      setLoading(true);
      try {
        let url = `https://youtube.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=${videoID}&key=AIzaSyCDUUJgpm46YDrMMM6xx7shjbwWQajzmHM`;
        console.log("customHook", url, videoID);
        const response = await axios.get(url);
        setBasicData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    } else {
      setError("No VideoID");
    }
  };
  return { basicData, loading, setLoading, getBasicInfo, error };
};

export default useVideoInfo;
