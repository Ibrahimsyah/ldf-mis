import React, {useState} from "react";
import { Form, Input, Button, message } from "antd";
import {LoadingOutlined} from '@ant-design/icons'
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";

export default (props) => {
  const { history } = props;
  const { schema, layout } = config;
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    if(isNaN(values.no_telp)){
      message.warning("Nomor telepon harus berupa angka")
      return
    }
    setSubmitting(true)
    try {
      await api.post("suppliers", values);
      message.success("Sukses Menambahkan Supplier");
      history.goBack()
    } catch (err) {
      message.error(err);
      setSubmitting(false)
    }
  };

  return (
    <Content title="Tambah Supplier">
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
    </Content>
  );
};
