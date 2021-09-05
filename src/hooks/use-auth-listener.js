import { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../context/firebase-context";

const useAuthListener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we will listen to firebase with this listener and if we have a user that is if the user
      // signs in then we will store that user into the localStorage.
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // if there are no user,that is when the user logs out, then we will remove the authUser
        // from the localStorage.
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    
    // when we use listeners in react, which are basically just connections that we setup to somewhere
    // we have to close them. And we close those listeners in the cleanup function like following -->
    return () => listener(); // cleanup
  }, [firebase]);

  return { user };
};

export default useAuthListener;
