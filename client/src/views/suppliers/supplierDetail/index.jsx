import React, { useEffect, useState } from "react";
import { Form, Table, Spin } from "antd";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";
export default (props) => {
  const { match } = props;
  const { supplier_id } = match.params;
  const { schema, layout, table } = config;
  const [form] = Form.useForm();
  const [supplierData, setSupplierData] = useState({
    products: []
  });
  const [loading, setLoading] = useState(true);

  const fetchProductDetail = async (supplier_id) => {
    const res = await api.get(`suppliers?supplier_id=${supplier_id}&showProducts=true`);
    return res;
  };

  useEffect(() => {
    fetchProductDetail(supplier_id)
      .then((res) => {
        setSupplierData(res)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form, supplier_id]);
  return (
    <Content title="Data Supplier">
      <Spin spinning={loading}>
        <Form form={form} {...layout.formBody} >
          <Form.Item {...schema.supplier_name}>
            {supplierData.nama}
          </Form.Item>
          <Form.Item {...schema.supplier_owner}>
            {supplierData.nama_pemilik}
          </Form.Item>
          <Form.Item {...schema.alamat}>{supplierData.alamat}</Form.Item>
          <Form.Item {...schema.no_telp}>{supplierData.no_telp}</Form.Item>
          <Form.Item {...schema.email}>{supplierData.email}</Form.Item>
        </Form>
        <h3>Barang yang Dijual</h3>
        <Table {...table()} dataSource={supplierData.products}/>
      </Spin>
    </Content>
  );
};
