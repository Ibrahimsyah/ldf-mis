import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Form, message } from "antd";
import {LoadingOutlined} from '@ant-design/icons'
import { useDispatch, connect } from "react-redux";
import { setAuth } from "../../stores/actions/auth";
import api from "../../providers/api";
import config from "./login.config";
import "./login.scss";

const App = (props) => {
  const { auth, history } = props;
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const onLogin = async (values) => {
    setLoading(true)
    try {
      const res = await api.post("auth/login", values);
      dispatch(setAuth(res));
    } catch (err) {
      message.error(err);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (auth) {
      history.replace("/");
    }
  }, [auth, history]);
  return (
    <>
      <Row className="container fadeIn">
        <Col md={12} sm={24} className="left-section">
          <h1>Landoh Digital Farm</h1>
          <h2>Information System</h2>
        </Col>
        <Col md={12} sm={24} className="right-section">
          <h1>Masuk</h1>
          <Form onFinish={onLogin} style={{ width: "100%" }}>
            <Form.Item name="id" {...config.form.id}>
              <Input placeholder="Username atau Email" />
            </Form.Item>
            <Form.Item name="password" {...config.form.password}>
              <Input.Password type="Password" placeholder="Password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" className="btn-login">
              {loading && <LoadingOutlined/>}{" "} Masuk
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App)