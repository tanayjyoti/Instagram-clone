import React from "react";
import Skeleton from "react-loading-skeleton";

import usePhotos from "../hooks/use-photos";
import { Post } from "../components";

// we need to get the photoes of the users that the logged in users follows
// also the photoes of the logged in user
// on loading the photos we need to use the React skeleton
// if we have photos render them--> create a post components
// if the user has no photos, tell them to create some photos.

const Timeline = () => {
  const { photos } = usePhotos(); // getting the required photos.

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              className="mb-5"
              count={1}
              width={640}
              height={500}
            />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => {
          return <Post key={content.docId} content={content} />;
        })
      ) : (
        <p className="text-center text-2xl">
          Follow people to see their photos
        </p>
      )}
    </div>
  );
};

export default React.memo(Timeline);
