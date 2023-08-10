import React, { useState, useEffect } from "react";
import axios from "axios";


const Comment = ({ videoId, apiKey, jwtToken, isAdmin }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     // Fetch comments for the specific videoId using the apiKey
//     // You'll need to implement this API call using fetch or axios
//     fetchComments();
//   }, [videoId, apiKey]);

 useEffect(() => {
   
   fetchComments();
  }, [videoId, jwtToken]);
  
  
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/Comments/${videoId}/`,
       // 
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
      `http://localhost:8000/api/Comments/`,
      {
        video_id: videoId,
        text: newComment,
      },
      {
        headers: {
          
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    setNewComment('');
    fetchComments();
  } catch (error) {
    console.error('Error submitting comment:', error.response.data);
  }
};

// const handleCommentDelete = async (commentId) => {
//   try {
//     await axios.delete(`YOUR_DELETE_COMMENT_API_URL/${commentId}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });

//     fetchComments();
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//   }
// };

  return (
    <div>
      
      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      {jwtToken && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
          <button type="submit">Submit Comment</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
