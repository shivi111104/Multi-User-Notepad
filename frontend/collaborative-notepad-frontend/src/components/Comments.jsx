import React, { useState } from 'react';
import './components.css';

const Comments = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="comments-container">
      <h2 className="comments-title">Comments</h2>
      <div className="comments-list">
        {comments.map((comment, idx) => (
          <div key={idx} className="comment-item">
            <strong>{comment.author}</strong>
            <p>{comment.text}</p>
            <small>{new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="comment-form">
        <label htmlFor="comment">Add Comment</label>
        <textarea
          id="comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment..."
        />
        <button onClick={handleAddComment}>Add</button>
      </div>
    </div>
  );
};

export default Comments;
