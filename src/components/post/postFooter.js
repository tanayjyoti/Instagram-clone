import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostFooter = ({ caption, username }) => {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">
        <Link to={`/profile/${username}`}>{username}</Link>
      </span>
      <span>{caption}</span>
    </div>
  );
};

PostFooter.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PostFooter;
