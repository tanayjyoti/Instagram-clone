import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/user-context";
import {
  getUserByUID,
  getPhotosOfFollowing,
} from "../services/firebase.service";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserByUID(userId);
      let followedUserPhotos = [];

      // does the user actually follow people -->
      if (following.length > 0) {
        // then fetch the photos of the people user follows
        followedUserPhotos = await getPhotosOfFollowing(userId, following);
      }

      // now we have to sort the fetched photos according to their dates--->
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // this will add the newest photos at the top of the feed.
      setPhotos(followedUserPhotos);
    };

    if (userId) {
      getTimelinePhotos();
    }
  }, [userId]);

  return { photos };
};

export default usePhotos;
