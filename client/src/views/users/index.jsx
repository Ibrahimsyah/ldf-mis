import React, { useState } from "react";
import { Table, Input, Row, Col, Button } from "antd";
import Content from "../../components/Content";
import config from "./index.config";

export default ({ history }) => {
  const { table, initState } = config;
  const [state] = useState(initState);

  return (
    <Content title="User">
      <Row gutter={24} style={{ marginBottom: 16 }}>
        <Col xs={24} md={16}>
          <Input.Search placeholder="Cari berdasarkan nama" />
        </Col>
        <Col xs={24} md={8}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => history.push("/user/add")}
          >
            Tambah User
          </Button>
        </Col>
      </Row>
      <Table {...table()} dataSource={state.data} />
    </Content>
  );
};
