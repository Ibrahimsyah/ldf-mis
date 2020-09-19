import React from "react";
import { Col } from "antd";
import "./index.scss";

export default (props) => {
  const { title, subtitle, Icon } = props;
  return (
    <Col lg={8} sm={12} xs={24}>
      <div className="card-container">
        <div>
          <h1>{title}</h1>
          <h5>{subtitle}</h5>
        </div>
        <Icon className="menu-icon" />
      </div>
    </Col>
  );
};
