import React from "react";
import { Col } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./index.scss";

export default (props) => {
  const { title, children, style = {} } = props;
  const history = useHistory();
  return (
    <Col span={24}>
      <div className="fadeIn content" style={{ ...style }}>
        <div className="header">
          <LeftCircleOutlined
            style={{ fontSize: "1.5em" }}
            onClick={() => history.goBack()}
          />
          <h1>{title}</h1>
        </div>
        <div>{children}</div>
      </div>
    </Col>
  );
};
