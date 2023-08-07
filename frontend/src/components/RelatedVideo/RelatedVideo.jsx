import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RelatedVideo = ({ videoId, apiKey }) => {
  const navigate = useNavigate();
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const API_KEY = "AIzaSyD_kAiHXu7jpybr9Jy19-Ovfs_j13Htxuo";
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: apiKey,
              part: "snippet",
              maxResults: 5,
              relatedToVideoId: videoId,
              type: "video",
            },
          }
        );
        console.log(apiKey);
        console.log(videoId);

        setRelatedVideos(response.data.items[0]);
        console.log(setRelatedVideos);
      } catch (error) {
        try {
          //axios call
        } catch (error) {
          console.log(error.response.data);
        }
      }
    };

    fetchRelatedVideos();
  }, [videoId, apiKey]);

  const handleVideoClick = (videoId) => {
    navigate(`/RelatedVideo/${videoId}`); // Assuming you have a route defined for RelatedVideo
  };

  const RelatedVideo = ({ relatedVideos, handleVideoClick }) => {
  if (!relatedVideos || !Array.isArray(relatedVideos) || relatedVideos.length === 0) {
    // Handle the case where relatedVideos is not an array or is empty
    return <div>No related videos found.</div>;
  }

  return (
    <div>
      {relatedVideos.map((video) => (
        <div
          key={video.id?.videoId} // Use optional chaining (?.) to access properties safely
          onClick={() => handleVideoClick(video.id?.videoId)}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {video.snippet?.thumbnails?.medium?.url && (
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              style={{ marginRight: "10px" }}
            />
          )}
          {video.snippet?.title && <h3>{video.snippet.title}</h3>}
        </div>
      ))}
    </div>
  );
};

export default RelatedVideo;    