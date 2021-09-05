import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { NOT_FOUND } from "../constants/routes";
import { getUserByUsername } from "../services/firebase.service";
import { Header, UserProfile } from "../components";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkUserExists = async () => {
      const existingUser = await getUserByUsername(username);
      if (existingUser.length > 0) {
        setUser(existingUser[0]);
      } else {
        history.push(NOT_FOUND);
      }
    };
    checkUserExists();
  }, [username, history]);

  return user ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
