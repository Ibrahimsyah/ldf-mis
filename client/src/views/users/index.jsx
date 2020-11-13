import React, { useState, useEffect } from "react";
import { Table, Input, Row, Col, Button, Modal, message } from "antd";
import {connect} from 'react-redux'
import Content from "../../components/Content";
import config from "./index.config";
import api from "../../providers/api";
import { AGEN } from "../../contants/UserRoles";

const { confirm } = Modal;

const App =  (props) => {
  const {history, auth: {profile}} = props
  const { table, initState } = config;
  const [state, setState] = useState(initState);

  const handleTableChange = (pagination, _, sorter) => {
    setState((state) => ({ ...state, pagination: pagination, sorter: sorter }));
  };

  const handleSearchQuery = (query) =>
    setState((state) => ({
      ...state,
      searchQuery: query,
      pagination: { ...state.pagination, current: 1 },
    }));

  const onDelete = async (row) => {
    confirm({
      title: "Anda yakin akan menghapus User ini?",
      content: "Anda harus menambah User lagi jika ingin mengembalikan",
      onOk() {
        return new Promise(async (resolve, reject) => {
          await api.delete(`users?user_id=${row.id}`);
          resolve();
          refresh(
            state.pagination.current,
            state.pagination.pageSize,
            state.searchQuery,
            state.sorter
          );
        });
      },
      onCancel() {},
    });
    setState((state) => ({ ...state }));
  };

  const onEdit = (row) => {
    history.push(`/product/edit/${row.product_id}`);
  };

  const onApprove = (row) => {
    confirm({
      title: "Anda yakin akan mengaktifkan User ini?",
      content: "Aksi ini tidak dapat dikembalikan",
      onOk() {
        return new Promise(async (resolve, reject) => {
          await api.put(`users/confirmation?user_id=${row.id}`);
          resolve();
          refresh(
            state.pagination.current,
            state.pagination.pageSize,
            state.searchQuery,
            state.sorter
          );
        });
      },
      onCancel() {},
    });
    setState((state) => ({ ...state }));
  };
  const refresh = async (page, limit, query, sorter) => {
    setState((state) => ({ ...state, loading: true }));
    let url = `users?page=${page || initState.pagination.current}&limit=${
      limit || initState.pagination.pageSize
    }`;
    if (sorter.field)
      url += `&sortby=${sorter.field}&mode=${
        sorter.order === "ascend" ? "ASC" : "DESC"
      }`;
    if (query) url += `&keyword=${query}`;
    console.log(url);
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
      state.searchQuery,
      state.sorter
    );
  }, [state.pagination.current, state.searchQuery, state.sorter]);

  return (
    <Content title={profile.role_name === AGEN ? "Reseller" : "User"}>
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
            onClick={() => history.push("/user/add")}
          >
            Tambah {profile.role_name === AGEN ? "Reseller" : "User"}
          </Button>
        </Col>
      </Row>
      <Table
        {...table(onDelete, onEdit, onApprove, profile.role_name)}
        {...state}
        dataSource={state.data}
        onChange={handleTableChange}
      />
    </Content>
  );
};

const mapStateToProps = state => {
  return {
    auth : state.auth
  }
}

export default connect(mapStateToProps)(App)