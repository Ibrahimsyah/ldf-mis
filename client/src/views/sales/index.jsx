import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Radio, message } from "antd";
import Content from "../../components/Content";
import api from "../../providers/api";
import config, { parsePrice } from "./index.config";
import "./index.scss";

const SalesStats = (props) => {
  const { todayIncome, last7Income, last30Income } = props;

  return (
    <Row gutter={24} style={{ marginBottom: 16 }}>
      <Col lg={8} sm={24} xs={24}>
        <div className="stat-card">
          <h1>{parsePrice(last30Income)}</h1>
          <h3>30 Hari Terakhir</h3>
        </div>
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <div className="stat-card">
          <h1>{parsePrice(last7Income)}</h1>
          <h3>7 Hari Terakhir</h3>
        </div>
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <div className="stat-card">
          <h1>{parsePrice(todayIncome)}</h1>
          <h3>Hari Ini</h3>
        </div>
      </Col>
    </Row>
  );
};

export default (props) => {
  const { history } = props;
  const { table, initState } = config;
  const [state, setState] = useState(initState);

  const onDelete = (row) => {
    console.log(row);
  };

  const onEdit = (row) => {
    console.log(row);
  };

  const onRangeChange = (e) => {
    const value = e.target.value;
    setState((state) => ({ ...state, range: value }));
  };

  const fetchSalesData = async (range) => {
    const res = await api.get(`sales?range=${range}`);
    return res;
  };

  const fetchSummarizedSalesData = async () => {
    const res = await api.get("sales/summary");
    return res;
  };
  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    fetchSalesData(state.range)
      .then((res) => {
        setState((state) => ({ ...state, salesData: res }));
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        setState((state) => ({ ...state, loading: false }));
      });
  }, [state.range]);

  useEffect(() => {
    fetchSummarizedSalesData().then((res) => {
      setState((state) => ({ ...state, summary: res }));
    });
  }, []);
  return (
    <Content title="Penjualan" backToDashboard>
      <SalesStats {...state.summary} />
      <Row gutter={[24, 24]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={16}>
          <Radio.Group defaultValue={state.range} onChange={onRangeChange}>
            <Radio.Button value="30">30 Hari Terakhir</Radio.Button>
            <Radio.Button value="7">7 Hari Terakhir</Radio.Button>
            <Radio.Button value="1">Hari Ini</Radio.Button>
          </Radio.Group>
        </Col>
        <Col xs={24} md={8}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => history.push("/sales/add")}
          >
            Tambah Penjualan
          </Button>
        </Col>
      </Row>
      <Table
        {...table(onDelete, onEdit)}
        dataSource={state.salesData}
        loading={state.loading}
        pagination={false}
      />
    </Content>
  );
};
