import React, { useState } from "react";
import { Layout, Menu } from "antd";
import menu from "../routes/menu";
import { NavLink, useLocation } from "react-router-dom";
import "./index.scss";

const { Sider } = Layout;

export default (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => setCollapsed(!collapsed);
  let location = useLocation();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="menu-container"
    >
      <Menu
        className="menu"
        selectedKeys={[location.pathname]}
        mode="inline"
      >
        {menu.map((m, idx) => (
          <Menu.Item key={m.path} icon={<m.icon/>} className="menu-item">
            <NavLink to={m.path}>{m.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
