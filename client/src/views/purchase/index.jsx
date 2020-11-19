import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Radio, message } from "antd";
import Content from "../../components/Content";
import api from "../../providers/api";
import config, { parsePrice } from "./index.config";
import "./index.scss";

const PurchaseStatus = (props) => {
  const { todayOutcome = 0, last7Outcome = 0, last30Outcome = 0 } = props;

  return (
    <Row gutter={24} style={{ marginBottom: 16 }}>
      <Col lg={8} sm={24} xs={24}>
        <div className="stat-card">
          <h1>{parsePrice(last30Outcome)}</h1>
          <h3>30 Hari Terakhir</h3>
        </div>
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <div className="stat-card">
          <h1>{parsePrice(last7Outcome)}</h1>
          <h3>7 Hari Terakhir</h3>
        </div>
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <div className="stat-card">
          <h1>{parsePrice(todayOutcome)}</h1>
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

  const fetchPurchaseData = async (range) => {
    const res = await api.get(`purchase?range=${range}`);
    return res;
  };

  const fetchSummarizedPurchaseData = async () => {
    const res = await api.get("purchase/summary");
    return res;
  };
  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    fetchPurchaseData(state.range)
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
    fetchSummarizedPurchaseData().then((res) => {
      setState((state) => ({ ...state, summary: res }));
    });
  }, []);
  return (
    <Content title="Pembelian">
      <PurchaseStatus {...state.summary} />
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
            onClick={() => history.push("/purchase/add")}
          >
            Tambah Pembelian
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
