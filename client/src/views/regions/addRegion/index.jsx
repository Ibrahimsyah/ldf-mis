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
    setSubmitting(true)
    try {
      await api.post("regions", values);
      message.success("Sukses Menambahkan Region");
      history.goBack()
    } catch (err) {
      message.error(err);
      setSubmitting(false)
    }
  };

  return (
    <Content title="Tambah Region">
      <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
        <Form.Item {...schema.region_name}>
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
