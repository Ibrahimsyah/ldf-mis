import React, {useState} from "react";
import { Form, Input, Button, message } from "antd";
import {LoadingOutlined} from '@ant-design/icons'
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config from "./index.config";


const testNumber = number => !isNaN(number)

export default (props) => {
  const { history } = props;
  const { schema, layout } = config;
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true)
    const {admin_price, reseller_price, agen_price} = values
    if(!testNumber(admin_price) || !testNumber(reseller_price) || !testNumber(agen_price)){
      message.warning('Masukkan harga dengan hanya angka (tanpa titik)')
      setSubmitting(false);
      return
    }
    try {
      await api.post("products", values);
      message.success("Sukses Menambahkan Produk");
      history.goBack()
    } catch (err) {
      message.error(err);
      setSubmitting(false)
    }
  };

  return (
    <Content title="Tambah Produk">
      <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
        <Form.Item {...schema.product_name}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.admin_price}>
          <Input/>
        </Form.Item>
        <Form.Item {...schema.agen_price}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.reseller_price}>
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
