import React, { useState, useEffect } from "react";
import { Table, Input, Row, Col, Button, Modal } from "antd";
import Content from "../../components/Content";
import api from "../../providers/api";
import config from "./index.config";

const { confirm } = Modal;
export default (props) => {
  const { history } = props;
  const { table, initState } = config;
  const [state, setState] = useState(initState);

  const handleTableChange = (pagination) => {
    setState((state) => ({ ...state, pagination: pagination }));
  };

  const handleSearchQuery = (query) =>
    setState((state) => ({
      ...state,
      searchQuery: query,
      pagination: { ...state.pagination, current: 1 },
    }));

  const onDelete = async (row) => {
    confirm({
      title: "Anda yakin akan menghapus Region ini?",
      content: "Anda harus menambah region lagi jika ingin mengembalikan",
      onOk() {
        return new Promise(async (resolve, reject) => {
          await api.delete(`regions?region_id=${row.id}`);
          resolve();
          refresh();
        });
      },
      onCancel() {},
    });
    setState((state) => ({ ...state }));
  };

  const onEdit = (row) => {
    history.push(`/region/edit/${row.id}`);
  };

  const refresh = async (page, limit, query) => {
    setState((state) => ({ ...state, loading: true }));
    let url = `regions?page=${page || initState.pagination.current}&limit=${
      limit || initState.pagination.pageSize
    }`;
    if (query) url += `&keyword=${query}`;
    const { meta, data } = await api.get(url);
    setState((state) => ({
      ...state,
      data: data,
      pagination: meta,
      loading: false,
    }));
  };

  useEffect(() => {
    refresh(
      state.pagination.current,
      state.pagination.pageSize,
      state.searchQuery
    );
  }, [state.pagination.current, state.searchQuery]);

  return (
    <Content title="Region">
      <Row gutter={24} style={{ marginBottom: 16 }}>
        <Col xs={24} md={16}>
          <Input.Search
            placeholder="Cari berdasarkan nama"
            onSearch={handleSearchQuery}
          />
        </Col>
        <Col xs={24} md={8}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={() => history.push("/region/add")}
          >
            Tambah Produk
          </Button>
        </Col>
      </Row>
      <Table
        {...table(onDelete, onEdit)}
        {...state}
        dataSource={state.data}
        onChange={handleTableChange}
      />
    </Content>
  );
};
