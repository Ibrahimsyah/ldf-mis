import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import Content from "../../../components/Content";
import config from "./index.config";

const { Option } = Select;
export default () => {
  const { schema, layout, state } = config;
  const [roles]                   = useState(state.roles);
  const [form]                    = Form.useForm();

  return (
    <Content title="Tambah User">
      <Form
        form={form}
        {...layout.formBody}
        onFinish={(val) => console.log(val)}
      >
        <Form.Item {...schema.username}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.email}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...schema.role}>
          <Select placeholder="Pilih Role" allowClear>
            {roles.map((role) => (
              <Option value={role.role_id} key={role.role_id}>
                {role.role_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...schema.nama}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.alamat}>
          <Input />
        </Form.Item>
        <Form.Item {...schema.pekerjaan}>
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
