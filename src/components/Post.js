import React from 'react'

const Post = ({ text, image, timestamp }) => {
  return (
    <div>
      <div>{text}</div>

      {image && (
        <div>
          <img src={image} />
        </div>
      )}
      {!image && <h1>画像ない</h1>}
      <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>
    </div>
  );
};

export default Post;
