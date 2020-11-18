import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Spin, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";

const testNumber = (number) => !isNaN(number);
const { Option } = Select;
export default (props) => {
  const { history } = props;
  const { schema, layout } = config;
  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState({
    content: true,
    submit: false,
  });

  const fetchSuppliersData = async () => {
    const { data } = await api.get("suppliers");
    return data;
  };

  const handleSubmit = async (values) => {
    setLoading((loading) => ({ ...loading, submit: true }));
    const { admin_price, reseller_price, agen_price } = values;
    if (
      !testNumber(admin_price) ||
      !testNumber(reseller_price) ||
      !testNumber(agen_price)
    ) {
      message.warning("Masukkan harga dengan hanya angka (tanpa titik)");
      setLoading((loading) => ({ ...loading, submit: false }));
      return;
    }
    try {
      await api.post("products", values);
      message.success("Sukses Menambahkan Produk");
      history.goBack();
    } catch (err) {
      message.error(err);
      setLoading((loading) => ({ ...loading, submit: false }));
    }
  };

  useEffect(() => {
    fetchSuppliersData().then((res) => {
      setSuppliers(res);
      setLoading((loading) => ({ ...loading, content: false }));
    });
  }, []);
  return (
    <Content title="Tambah Produk">
      <Spin spinning={loading.content}>
        <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
          <Form.Item {...schema.product_name}>
            <Input />
          </Form.Item>
          <Form.Item name="supplier_id" label="Nama Supplier">
            <Select allowClear>
              {suppliers.map((s) => (
                <Option key={s.id} value={s.id}>
                  {s.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...schema.buy_price}>
            <Input />
          </Form.Item>
          <Form.Item {...schema.admin_price}>
            <Input />
          </Form.Item>
          <Form.Item {...schema.agen_price}>
            <Input />
          </Form.Item>
          <Form.Item {...schema.reseller_price}>
            <Input />
          </Form.Item>
          <Form.Item {...layout.formFooter}>
            <Button type="primary" htmlType="submit">
              {loading.submit && <LoadingOutlined />} Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Content>
  );
};
