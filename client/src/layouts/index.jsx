import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import MainLayout from "./layout";

//Page
import LoginPage from "../views/pages/login";

const ProtectedRoute = ({ user }) => {
  return (
    <Route
      render={(props) =>
        true ? <MainLayout {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/login" name="login" component={LoginPage} />
        <ProtectedRoute path="/" />
      </Switch>
    </Router>
  );
};
