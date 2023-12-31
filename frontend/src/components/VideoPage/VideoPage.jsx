import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RelatedVideo from "../RelatedVideo/RelatedVideo";
import Comment from "../Comment/Comment";
import useAuth from "../../hooks/useAuth";
import "./VideoPage.css";

const VideoPage = () => {
  const { videoId } = useParams(); // Get the videoId from the URL
  const [videoData, setVideoData] = useState(null);
  const [user, token] = useAuth();
  //  console.log(user, token)
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
      <div className="video-page">
        <div>
          <div className="video">
            <iframe
              className="video-embed"
              title={videoTitle}
              width="640"
              height="360"
              src={videoEmbedUrl}
              allowFullScreen
            ></iframe>
            <h2 className="video-title">{videoTitle}</h2>
          </div>
          <p className="video-description">{videoDescription}</p>
          <div className="comment-section">
            <Comment videoId={videoId} jwtToken={token} />
          </div>
        </div>
        <div className="related-videos">
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
      <div className="video-detail">
        <h2>VideoPage</h2>
      </div>
      {renderPlayer()}
    </div>
  );
};

export default VideoPage;
