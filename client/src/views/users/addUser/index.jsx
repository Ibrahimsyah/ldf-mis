import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import Content from "../../../components/Content";
import { RESELLER, AGEN } from "../../../contants/UserRoles";

import config from "./index.config";

const { Option } = Select;
export default () => {
  const { schema, layout, state } = config;
  const [roles] = useState(state.roles);
  const [agen] = useState(state.agen);
  const [region] = useState(state.region);
  const [userRole, setUserRole] = useState("");
  const [form] = Form.useForm();

  const handleRoleChange = (value) => {
    setUserRole(roles.find((role) => role.role_id === value).role_name);
  };

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
          <Select
            placeholder="Pilih Role"
            allowClear
            onChange={handleRoleChange}
          >
            {roles.map((role) => (
              <Option value={role.role_id} key={role.role_id}>
                {role.role_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {userRole === AGEN && (
          <Form.Item {...schema.region_id}>
            <Select
              placeholder="Region"
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {region.map((r) => (
                <Option value={r.region_id} key={r.region_id}>
                  {r.region_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {userRole === RESELLER && (
          <Form.Item {...schema.agen_id}>
            <Select
              placeholder="Agen Pengampu"
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {agen.map((a) => (
                <Option value={a.agen_id} key={a.agen_id}>
                  {`${a.agen_name} (${a.agen_region})`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
