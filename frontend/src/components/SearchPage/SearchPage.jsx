import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar.jsx";


const SearchPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  // Function to fetch 5 random videos from YouTube API
  const fetchRandomVideos = async () => {
    try {

      const API_KEY = "AIzaSyD_kAiHXu7jpybr9Jy19-Ovfs_j13Htxuo";
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=random&key=${API_KEY}`,
        {
          params: {
            part: "snippet",
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
           `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}`,
           {
             params: {
              // key: API_KEY,
               part: "snippet",
               maxResults: 5,
               type: "video",
              // q: searchTerm, // Use the search term here
             },
           }
         );
       
  
      console.log(response.data.items);
       setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  



  // Function to open video in new tab
  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };
  const handleSearch = () => {
    searchedVideos();
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
      <h1>Random YouTube Videos</h1>
      <SearchBar setSearchTerm={setSearchTerm}  />
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-container">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              onClick={() => openVideo(video.id.videoId)}
            />
            <p className="video-title">{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
