import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

import SuggestedProfile from "./suggestedProfile";
import { getSuggestedProfiles } from "../../services/firebase.service";

const Suggestions = ({ userId, currentUserDocId, following }) => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSuggestedUsersForId = async () => {
      setIsLoading(true);
      const suggestedUsers = await getSuggestedProfiles(userId, following);
      setIsLoading(false);
      setProfiles(suggestedUsers);
    };

    if (userId) {
      getSuggestedUsersForId();
    }
  }, [userId, following]);

  return !isLoading ? (
    profiles.length > 0 ? (
      <div className="rounded flex flex-col">
        <div className="text-sm flex items-center justify-between mb-2">
          <p className="font-bold text-gray-base">Suggestions for you</p>
        </div>
        <div className="mt-4 grid gap-5">
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              profileusername={profile.username}
              profileId={profile.userId}
              userId={userId}
              userDocId={currentUserDocId}
            />
          ))}
        </div>
      </div>
    ) : null
  ) : (
    <Skeleton count={1} height={150} className="mt-5" />
  );
};

Suggestions.proptype = {
  usrId: PropTypes.string,
  currentUserDocId: PropTypes.string,
};

export default React.memo(Suggestions);
