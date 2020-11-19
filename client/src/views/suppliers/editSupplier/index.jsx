import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";
export default (props) => {
  const { history, match } = props;
  const { supplier_id } = match.params;
  const { schema, layout } = config;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    if(isNaN(values.no_telp)){
      message.warning("Nomor telepon harus berupa angka")
      return
    }
    setSubmitting(true);
    try {
      await api.put(`suppliers?supplier_id=${supplier_id}`, values);
      message.success("Sukses Mengubah Produk");
      history.goBack();
    } catch (err) {
      message.error(err);
      setSubmitting(false);
    }
  };

  const fetchProductDetail = async (supplier_id) => {
    const res = await api.get(`suppliers?supplier_id=${supplier_id}`);
    return res;
  };

  useEffect(() => {
    fetchProductDetail(supplier_id)
      .then((res) => {
        form.setFieldsValue(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form, supplier_id]);
  return (
    <Content title="Edit Data Supplier">
      <Spin spinning={loading}>
        <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
        <Form.Item {...schema.supplier_name}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.supplier_owner}>
          <Input/>
        </Form.Item>
        <Form.Item {...schema.alamat}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.no_telp}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.email}>
          <Input />
        </Form.Item>
        <Form.Item {...layout.formFooter}>
          <Button type="primary" htmlType="submit">
            {submitting && <LoadingOutlined/>} Submit
          </Button>
        </Form.Item>
        </Form>
      </Spin>
    </Content>
  );
};
