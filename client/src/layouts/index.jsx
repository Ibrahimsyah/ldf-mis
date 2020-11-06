import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {message} from 'antd'
import { connect } from "react-redux";
import MainLayout from "./layout";

//Page
import LoginPage from "../views/pages/login";


message.config({
  top:60
})
const ProtectedRoute = ({ user }) => {
  return (
    <Route
      render={(props) =>
        user ? <MainLayout {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = (props) => {
  const { auth } = props;
  return (
    <Router>
      <Switch>
        <Route path="/login" name="login" component={LoginPage} />
        <ProtectedRoute path="/" user={auth} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
