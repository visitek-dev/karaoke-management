import React, { useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./store";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./actions";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import darkTheme from "./store/darkTheme";
import theme from "./store/theme";
import setAuthToken from "./store/setAuthToken";

import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Users from "./views/Users";
import UsersAdd from "./views/UsersAdd";
import UsersEdit from "./views/UsersEdit";
import Schedules from "./views/Schedules";
import Rooms from "./views/Rooms";
import Products from "./views/Products";
import ProductsAdd from "./views/ProductsAdd";
import ProductEdit from "./views/ProductsEdit";
import Receipts from "./views/Receipts";
import ReceiptsAdd from "./views/ReceiptsAdd";
import ReceiptsEdit from "./views/ReceiptsEdit";
import ReceiptsDetail from "./views/ReceiptsDetail";

import Page404 from "./views/404";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  const [checked, setChecked] = React.useState(true);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  const user = useSelector((state) => state.users);

  return (
    <ThemeProvider theme={checked ? theme : darkTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <React.Fragment>
          <Router history={history}>
            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <AdminRoute
                exact
                path="/"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={Dashboard}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/users"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={Users}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/users-add"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={UsersAdd}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/users-edit/:id"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={UsersEdit}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/schedules"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={Schedules}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/rooms"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={Rooms}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/products"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={Products}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/products-add"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={ProductsAdd}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/products-edit/:id"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={ProductEdit}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={Receipts}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts-add"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={ReceiptsAdd}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts-edit/:id"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={ReceiptsEdit}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts-detail/:id"
                user={user}
                light={checked}
                toggleTheme={toggleChecked}
                component={ReceiptsDetail}
              ></AdminRoute>
              <AdminRoute user={user} component={Page404} />
            </Switch>
          </Router>
        </React.Fragment>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
