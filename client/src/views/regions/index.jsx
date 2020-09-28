import React, { useState } from "react";
import { Table, Input, Row, Col, Button } from "antd";
import Content from "../../components/Content";
import config from "./index.config";

export default ({ history }) => {
  const { table, initState } = config;
  const [state] = useState(initState);

  const onDelete = (row) => {
    console.log(row);
  };

  const onEdit = (row) => {
    console.log(row);
  };
  return (
    <Content title="Region">
      <Row gutter={24} style={{ marginBottom: 16 }}>
        <Col xs={24} md={16}>
          <Input.Search placeholder="Cari berdasarkan nama" />
        </Col>
        <Col xs={24} md={8}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => history.push("/region/add")}
          >
            Tambah Region
          </Button>
        </Col>
      </Row>
      <Table {...table(onDelete, onEdit)} dataSource={state.data} />
    </Content>
  );
};
