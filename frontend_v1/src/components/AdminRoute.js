import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, user, ...rest }) => {
  const users = useSelector((state) => state.users);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!users.isAuthenticated && !users.loading) {
          return <Redirect to="/login"></Redirect>;
        } else if (!users) {
          return <Redirect to="/login"></Redirect>;
        } else return <Component {...rest} {...props}></Component>;
      }}
    ></Route>
  );
};

export default AdminRoute;
