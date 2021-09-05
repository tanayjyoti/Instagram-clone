// alternate--> https://github.com/karlhadwen/instagram/blob/master/src/services/firebase.js

import { firebase, FieldValue } from "../lib/firebase";

// check if the newly created username already exists or not.
export const doesUserNameExists = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username) // conditional statement checking for the user with the passed username
    .get();

  return result.docs.length > 0;
  // if the username already exists then the length of result.docs will be greater then 0, and then we return true
  // otherwise we return false.
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username) // conditional statement checking for the user with the passed username
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

// get user from the firestore where userId === userId (passed from the auth)
export const getUserByUID = async (userId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

// get the suggested users to follow
export const getSuggestedProfiles = async (userId, following) => {
  let query = await firebase.firestore().collection("users");

  if (following.length > 0) {
    query = query.where("userId", "not-in", [...following, userId]); // get the users where the userId field doesn't match with
    // any items of the following array and also userId itself. 
  } else {
    query = query.where("userId", "!=", userId); // get all the users except the currently logged in user. 
  }

  const result = await query.limit(10).get();

  const suggestedProfiles = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return suggestedProfiles;
};

// checking if the currently loggedIn user is following the profileUserId or not
export const isUserFollowingProfile = async (
  loggedInUsername,
  profileUserId
) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  return result.docs.length > 0;
};

// get the followingId that is the userid which currently logged in user is going to follow and the docId of the currently logged in user.
export const updateFollowingArray = async (
  followingId,
  followerDocId,
  isFollowing
) => {
  // adds the the profile that currently loggedIn user will follow to the following array of the currently loggedIn user.
  const followingRef = await firebase
    .firestore()
    .collection("users")
    .doc(followerDocId);

  return followingRef.update({
    following: isFollowing
      ? FieldValue.arrayRemove(followingId) // is already following? then remove the profle from the array
      : FieldValue.arrayUnion(followingId), // if not already following then add the profile to the array.
  });
};

// get the followerId which is the current userId and the docId of the user which the current user will follow.
export const updateFollowersArray = async (
  followerId,
  followingDocId,
  isFollower
) => {
  // adds the currently logged in user to the followers array of the profile that he/she going to follow.
  const followingRef = await firebase
    .firestore()
    .collection("users")
    .doc(followingDocId);

  return followingRef.update({
    followers: isFollower
      ? FieldValue.arrayRemove(followerId) // is already a follower ? then remove the userId from the follower array
      : FieldValue.arrayUnion(followerId), // if not already a follower then add userId to the folowers array.
  });
};

// get the photos of users that the currently logged in user follows
export const getPhotosOfFollowing = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following) // this will return the photos whose userId fileds matches the userIds of following array
    .get();

  const userFollowingPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  // we now will retrive the associated user details with the photos
  const photosWithUserDetails = await Promise.all(
    userFollowingPhotos.map(async (photo) => {
      let userLikedPhoto = false; // helps to check if the current logged in user already liked this photo or not
      if (photo.likes.includes(userId)) {
        // if the current userId is already in the likes array of the photo, then we will set the userLiked photo to true
        userLikedPhoto = true;
      }

      const user = await getUserByUID(photo.userId); // we get the user to which the current photo belongs
      const { username } = user[0]; // since we get the user in an array with getUserByUID

      return { username, ...photo, userLikedPhoto };
    })
  ); // Promise that all returns a promise which gets resolved when all the promises we
  // pass to it gets resolved.

  return photosWithUserDetails;
};

// get all the photos of a user for the profile--->
export const getUserPhotosByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return photos;
};
