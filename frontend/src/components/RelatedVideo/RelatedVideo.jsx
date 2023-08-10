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
              key: API_KEY,
              part: "snippet",
              maxResults: 5,
              relatedToVideoId: videoId,
              type: "video",
            },
          }
        );

        setRelatedVideos(response.data.items);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchRelatedVideos();
  }, [videoId, apiKey]);

  const handleVideoClick = (videoId) => {
    navigate(`/RelatedVideo/${videoId}`);
  };

  if (
    !relatedVideos ||
    !Array.isArray(relatedVideos) ||
    relatedVideos.length === 0
  ) {
    return <div>No related videos found.</div>;
  }

  return (
    <div>
      {(() => {
        const videoItems = [];
        for (let i = 0; i < relatedVideos.length; i++) {
          const video = relatedVideos[i];
          const videoId = video.id?.videoId;
          const thumbnailUrl = video.snippet?.thumbnails?.medium?.url;
          const title = video.snippet?.title;

          if (videoId && thumbnailUrl && title) {
            videoItems.push(
              <div
                key={videoId}
                onClick={() => handleVideoClick(videoId)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={thumbnailUrl}
                  alt={title}
                  style={{ marginRight: "10px" }}
                />
                <h3>{title}</h3>
              </div>
            );
          }
        }
        return videoItems;
      })()}
    </div>
  );
};

export default RelatedVideo;
