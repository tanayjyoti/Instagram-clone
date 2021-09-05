// This hook gives us the details of currently loggedIn user.
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/user-context";
import { getUserByUID } from "../services/firebase.service";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // we need a function that we can call(firebase service) that gets the user data based on the userId.
      const [response] = await getUserByUID(user?.uid); // this function will return an array and will get destructured here.
      setActiveUser(response);
    }

    if (user?.uid) {
      // first we want to check if there is a user available or not. If its available, only then we want
      // to call the getUserObjByUserId() function.
      getUserObjByUserId();
    }
  }, [user?.uid]);

  return activeUser
    ? { user: activeUser }
    : {
        user: {
          userId:'',
          username: "",
          fullName: "",
          emailAddress: "",
          following: [],
          followers: [""],
          dateCreated: 0,
        },
      };
};

export default useUser;
