import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";

const testNumber = (number) => !isNaN(number);
const { Option } = Select;
export default (props) => {
  const { history, match } = props;
  const { product_id } = match.params;
  const { schema, layout } = config;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const { admin_price, reseller_price, agen_price } = values;
    if (
      !testNumber(admin_price) ||
      !testNumber(reseller_price) ||
      !testNumber(agen_price)
    ) {
      message.warning("Masukkan harga dengan hanya angka (tanpa titik)");
      setSubmitting(false);
      return;
    }
    try {
      await api.put(`products?product_id=${product_id}`, values);
      message.success("Sukses Mengubah Produk");
      history.goBack();
    } catch (err) {
      message.error(err);
      setSubmitting(false);
    }
  };

  const fetchProductDetail = async (product_id) => {
    const res = await api.get(`products?product_id=${product_id}`);
    return res;
  };

  const fetchSuppliersData = async () => {
    const { data } = await api.get("suppliers");
    return data;
  };

  useEffect(() => {
    fetchSuppliersData().then((res) => {
      setSuppliers(res);
      fetchProductDetail(product_id)
        .then((res) => {
          form.setFieldsValue(res);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [form, product_id]);

  return (
    <Content title="Edit Produk">
      <Spin spinning={loading}>
        <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
          <Form.Item {...schema.product_name}>
            <Input />
          </Form.Item>
          <Form.Item name="supplier_id" label="Nama Supplier">
            <Select>
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
              {submitting && <LoadingOutlined />} Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Content>
  );
};
