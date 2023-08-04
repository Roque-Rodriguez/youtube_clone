import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
   

  // Function to fetch 5 random videos from YouTube API
  const fetchRandomVideos = async () => {
    try {
      const API_KEY = "AIzaSyD_kAiHXu7jpybr9Jy19-Ovfs_j13Htxuo";
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            part: "snippet",
            q: "cars", // Change "random" to your desired query
            maxResults: 5,
            type: "video",
          },
        }
      );
      console.log(response.data.items);
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const searchedVideos = async () => {
    try {
      const API_KEY = "AIzaSyD_kAiHXu7jpybr9Jy19-Ovfs_j13Htxuo";
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            part: "snippet",
            q: searchTerm,
            maxResults: 5,
            type: "video",
          },
        }
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // // Function to open video in new tab
  // const openVideo = (videoId) => {
  //   window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  // };

  const handleVideoClick = (videoID) => {
    navigate(`/videoPage/${videoID}`); // Assuming you have a route defined for VideoPage
  };

  // Fetch random videos when the component mounts
  useEffect(() => {
    fetchRandomVideos();
  }, []);

  // Update videos when the searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      searchedVideos();
    }
  }, [searchTerm]);

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        videos.map((video) => (
          <div
            key={video.id.videoId}
            onClick={() => handleVideoClick(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url} // Change to the desired thumbnail size (default, medium, high, etc.)
              alt={video.snippet.title}
            />
            {/* Display video information here */}
            <h3>{video.snippet.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchPage;
