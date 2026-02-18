import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "helper/isAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? <Component {...props} /> : <Redirect to="/auth/login" />
    }
  />
);

export default ProtectedRoute;
