import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Sidebar from "./sidebar";
import Header from "./header";
import "./index.scss";

const { Content, Footer } = Layout;

export default () => {
  return (
    <>
      <Router basename="/ldf-mis">
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout className="site-layout">
            <Header />
            <Content style={{ margin: "0 16px" }}>
              <Switch>
                {routes.map((r, idx) => (
                  <Route
                    path={r.path}
                    key={idx}
                    exact
                    component={r.component}
                  />
                ))}
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center", background: "#fff" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </>
  );
};
