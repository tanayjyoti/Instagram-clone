import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments);
  const [showAllComments, setShowAllComments] = useState(false);

  return (
    <React.Fragment>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={() => setShowAllComments((prevState) => !prevState)}
          >
            {!showAllComments && `View all ${comments.length} comments`}
          </p>
        )}
        {!showAllComments && comments.slice(0, 3).map((item) => {
          return (
            <p key={`${item.comment}-${item.displayName}`} className="mb-1">
              <Link to={`/profile/${item.displayName}`}>
                <span className="mr-1 font-bold ">{item.displayName}</span>
              </Link>
              <span>{item.comment}</span>
            </p>
          );
        })}
        {showAllComments && comments.map((item) => {
          return (
            <p key={`${item.comment}-${item.displayName}`} className="mb-1">
              <Link to={`/profile/${item.displayName}`}>
                <span className="mr-1 font-bold ">{item.displayName}</span>
              </Link>
              <span>{item.comment}</span>
            </p>
          );
        })}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
        {/* {formatDistance(posted, new Date())} will compare the date at which the photo is uploaded with the 
         current date and return how much time ago the picture was posted*/}
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </React.Fragment>
  );
};

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};

export default Comments;
