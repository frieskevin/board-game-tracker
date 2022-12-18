import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div className="comment card mb-3">
      <div className="card-header">
        <span className="comment-header">Comments</span>
      </div>
      <div className="card-body">
        {comments &&
          comments.map(comment => (
            <p className="pill mb-3" key={comment._id}>
              {comment.commentBody} //{' '}
              <Link to={`/profile/${comment.username}`} style={{ fontWeight: 700 }}>
                {comment.username} on {comment.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
