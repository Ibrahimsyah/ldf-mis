import React from "react";
import { Layout } from "antd";
import menu from "../routes/menu";
import { NavLink } from "react-router-dom";
import "./index.scss";

const { Sider } = Layout;

export default () => {
  return (
    <Sider className="menu-container">
      <h1 className="title">LDF</h1>
      {menu.map((m, idx) => (
        <NavLink to={m.path} className="menu-item" key={idx}>
          <span role="img" className="menu-logo">
            <m.icon />
          </span>
          {m.name}
        </NavLink>
      ))}
    </Sider>
  );
};
