import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "../constants/routes";

const ProtectedRoutes = ({ user, children, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (user) {
          return children;
        }
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
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

ProtectedRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

export default ProtectedRoutes;
