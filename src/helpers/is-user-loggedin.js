import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const IsUserLoggedIn = ({ user, loggedInPath, children, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
};

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
  loggedInPath: PropTypes.string.isRequired,
};

export default IsUserLoggedIn;