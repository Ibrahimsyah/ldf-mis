import React, { useState, useEffect } from "react";
import { Table, Form } from "antd";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";
export default (props) => {
  const { match } = props;
  const AGEN_ID = match.params.agen_id;
  const { initState, tableResellerReport } = config;
  const [state, setState] = useState(initState);
  const getAgenDetailData = async (agen_id) => {
    const data = api.get(`summary/agendetailreport?agen_id=${agen_id}`);
    return data;
  };

  useEffect(() => {
    getAgenDetailData(AGEN_ID).then((res) => {
      setState((state) => ({
        ...state,
        dataSource: res.data,
        agen_info: res.agen_info,
      }));
    });
  }, [AGEN_ID]);
  return (
    <Content title="Detail Laporan Agen">
      <h3>Informasi Agen</h3>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} >
        <Form.Item label="Nama Agen">{state.agen_info.nama}</Form.Item>
        <Form.Item label="Alamat">{state.agen_info.alamat}</Form.Item>
        <Form.Item label="Wilayah">{state.agen_info.region_name}</Form.Item>
      </Form>
      <h3>Kinerja Reseller Bulan Ini</h3>
      <Table {...state} {...tableResellerReport()} />
    </Content>
  );
};
