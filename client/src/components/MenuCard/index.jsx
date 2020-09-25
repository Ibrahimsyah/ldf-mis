import React from "react";
import { Col } from "antd";
import { NavLink } from "react-router-dom";
import "./index.scss";

export default (props) => {
  const { title, subtitle, Icon, path } = props;
  return (
    <Col lg={8} sm={12} xs={24}>
      <NavLink to={path}>
        <div className="card-container">
          <div>
            <h1>{title}</h1>
            <h5>{subtitle}</h5>
          </div>
          <Icon className="menu-icon" />
        </div>
      </NavLink>
    </Col>
  );
};
