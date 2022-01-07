import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  // destructing the auth and component and remaining props
  return (
    <Route
      {...rest}
      render={(props) => {
        // validating the user authenticating based on condition
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            // if user not logged in returning to login page
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;
