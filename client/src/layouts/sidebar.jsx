import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import { getMenu } from "../routes/menu";
import "./index.scss";

const { Sider } = Layout;

export default () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const menu = getMenu();
    setMenu(menu);
  }, []);
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
