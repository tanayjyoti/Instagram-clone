import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import ProfileHeader from "./profileHeader";
import Photos from "./photos";
import { getUserPhotosByUserId } from "../../services/firebase.service";

const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
  followingCount: 0,
};

const profileReducer = (state, action) => {
  return { ...state, ...action };
};

const UserProfile = ({ user }) => {
  const [
    { profile, photosCollection, followerCount, followingCount },
    dispatch,
  ] = useReducer(profileReducer, initialState);

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
        followingCount: user.following.length,
      });
    };
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <React.Fragment>
      <ProfileHeader
        photosCount={photosCollection.length}
        profile={profile}
        followerCount={followerCount}
        followingCount={followingCount}
        setFollowFollowing = {dispatch}
      />
      <Photos photos={photosCollection} />
    </React.Fragment>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
