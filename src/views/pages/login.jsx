import React from "react";
import { Row, Col, Input, Button, Form } from "antd";
import "./login.scss";

export default ({ history }) => {
  const onLogin = (values) => {
    history.replace("/");
  };
  return (
    <>
      <Row className="container fadeIn">
        <Col span={12} className="left-section">
          <h1>Landoh Digital Farm</h1>
          <h2>Information System</h2>
        </Col>
        <Col span={12} className="right-section">
          <h1>Login</h1>
          <Form onFinish={onLogin}>
            <Form.Item name="id">
              <Input placeholder="Username atau Email" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password type="Password" placeholder="Password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" className="btn-login">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
