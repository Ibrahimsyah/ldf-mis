import React from "react";
import { Table, Input, Row, Col, Button } from "antd";
import Content from "../../components/Content";
import config from "./index.config";

export default () => {
  const { table } = config;
  return (
    <Content title="Produk">
      <Row gutter={24} style={{ marginBottom: 16 }}>
        <Col xs={24} md={16}>
          <Input.Search placeholder="Cari berdasarkan nama" />
        </Col>
        <Col xs={24} md={8}>
          <Button type="primary" style={{ width: "100%" }}>
            Tambah Produk
          </Button>
        </Col>
      </Row>
      <Table
        columns={table.columns}
        dataSource={table.data}
        pagination={false}
      />
    </Content>
  );
};
