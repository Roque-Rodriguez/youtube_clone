import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RelatedVideo from "../RelatedVideo/RelatedVideo";



const VideoPage = () => {
  const { videoId } = useParams(); // Get the videoId from the URL
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Function to fetch video details by videoId using YouTube Data API
    const fetchVideoDetails = async () => {
      try {
        const API_KEY = "AIzaSyD_kAiHXu7jpybr9Jy19-Ovfs_j13Htxuo";
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: API_KEY,
              part: "snippet",
              id: videoId,
            },
          }
        );
        setVideoData(response.data.items[0]);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  // Render the embedded YouTube player
  const renderPlayer = () => {
    if (!videoData) {
      return <div>Loading...</div>;
    }

    const videoTitle = videoData.snippet.title;
    const videoDescription = videoData.snippet.description;
    const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2>{videoTitle}</h2>
          <p>{videoDescription}</p>
          <iframe
            title={videoTitle}
            width="640"
            height="360"
            src={videoEmbedUrl}
            // frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Related Videos</h2>
          <RelatedVideo
            videoId={videoId}
            apiKey="AIzaSyD_kAiHXu7jpybr9Jy19-Ovfs_j13Htxuo"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>VideoPage</h2>
      {renderPlayer()}
    </div>
  );
};

export default VideoPage;
