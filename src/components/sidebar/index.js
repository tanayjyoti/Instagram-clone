import React from "react";

import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

const Sidebar = () => {
  const {
    user: { fullName, username, userId, docId, following }, // need the docId to update the following array.
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        currentUserDocId={docId}
      />
    </div>
  );
};

export default React.memo(Sidebar);
