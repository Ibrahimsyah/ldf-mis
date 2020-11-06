import React from "react";
import { Form, Input, Button } from "antd";
import Content from "../../../components/Content";
import config from "./index.config";

export default () => {
  const { schema, layout } = config;
  const [form] = Form.useForm();

  return (
    <Content title="Tambah Produk">
      <Form
        form={form}
        {...layout.formBody}
        onFinish={(val) => console.log(val)}
      >
        <Form.Item {...schema.product_name}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.hq_price}>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
