import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  updateFollowersArray,
  updateFollowingArray,
} from "../../services/firebase.service";

const SuggestedProfile = ({
  profileDocId,
  profileusername,
  profileId,
  userId,
  userDocId,
}) => {
  const [followed, setFollowed] = useState(false); // to update the following status in UI before we make a request to the firebase.
  //console.log(userDocId);
  const followedHandler = async () => {
    setFollowed(true);

    await updateFollowingArray(profileId, userDocId, false);
    // this will add the profileid of the user that the currently loggedIn user is going to follow to the following array
    // of the currently loggedin user.
    await updateFollowersArray(userId, profileDocId, false);
    // this will add the currently logged in user's id to the follwers array of the profile who the user wants to follow.
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${profileusername}.jpg`}
          alt={`${profileusername}'s profile`}
          onError={({ target }) => {
            target.src = "/images/avatars/default.png";
          }}
        />
        <Link to={`/profile/${profileusername}`}>
          <p className="font-bold text-sm">{profileusername}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={followedHandler}
      >
        follow
      </button>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  profileusername: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userDocId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
