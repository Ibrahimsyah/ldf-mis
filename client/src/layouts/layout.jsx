import React from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Header from "./header";
import "./index.scss";

const { Content } = Layout;

export default (props) => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header {...props}/>
          <Content style={{ margin: "16px" }}>
            <Switch>
              {routes.map((r, idx) => (
                <Route
                  path={r.path}
                  key={idx}
                  exact={r.exact || false}
                  render={(props) => <r.component {...props} />}
                />
              ))}
              <Redirect exact from="/" to="/dashboard" />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};
