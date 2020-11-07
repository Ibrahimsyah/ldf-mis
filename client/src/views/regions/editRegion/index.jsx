import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";


export default (props) => {
  const { history, match } = props;
  const { region_id } = match.params;
  const { schema, layout } = config;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await api.put(`regions?region_id=${region_id}`, values);
      message.success("Sukses Mengubah Produk");
      history.goBack();
    } catch (err) {
      message.error(err);
      setSubmitting(false);
    }
  };

  const fetchProductDetail = async (region_id) => {
    const res = await api.get(`regions?region_id=${region_id}`);
    return res;
  };

  useEffect(() => {
    fetchProductDetail(region_id)
      .then((res) => {
        form.setFieldsValue(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form, region_id]);
  return (
    <Content title="Edit Region">
      <Spin spinning={loading}>
        <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
          <Form.Item {...schema.region_name}>
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
