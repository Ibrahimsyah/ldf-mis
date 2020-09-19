import React from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Header from "./header";
import "./index.scss";

const { Content } = Layout;

export default () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: "16px" }}>
            <Switch>
              {routes.map((r, idx) => (
                <Route path={r.path} key={idx} exact component={r.component} />
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
