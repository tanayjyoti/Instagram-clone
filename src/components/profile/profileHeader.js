import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, updateFollowersArray, updateFollowingArray } from "../../services/firebase.service";

const ProfileHeader = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username,
    fullName,
    followers = [],
    following = [],
  },
  followerCount,
  followingCount,
  setFollowFollowing,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeFollowBtn = username && user.username !== username;

  const toggleFollowHandler = async () => {
    setFollowFollowing({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await updateFollowersArray(user.userId, profileDocId, isFollowingProfile);
    await updateFollowingArray(profileUserId, user.docId, isFollowingProfile);
    setIsFollowingProfile((prevState) => !prevState);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {username && (
          <img
            className="rounded-full h-40 w-40 flex"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {activeFollowBtn && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={toggleFollowHandler}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  toggleFollowHandler();
                }
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <React.Fragment>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}
                {photosCount === 1 ? "post" : "posts"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followingCount}</span>
                {` `}
                following
              </p>
            </React.Fragment>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  setFollowFollowing: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    fullName: PropTypes.string,
    followers: PropTypes.array,
    folowing: PropTypes.array,
  }).isRequired,
};

export default ProfileHeader;
