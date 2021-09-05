import React, { useRef } from "react";
import PropTypes from "prop-types";

import PostHeader from "./postHeader";
import Image from "./image";
import Actions from "./actions";
import PostFooter from "./postFooter";
import Comments from "./comments";

const Post = ({ content }) => {
  // we need header, image, actions(like, comment), footer, comments--> all will be components
  const commentInput = useRef();
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <PostHeader username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        isPhotoLiked={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <PostFooter username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};

export default Post;
