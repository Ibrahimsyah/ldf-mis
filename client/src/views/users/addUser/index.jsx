import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Content from "../../../components/Content";
import { RESELLER, AGEN, ADMIN } from "../../../contants/UserRoles";

import config from "./index.config";
import api from "../../../providers/api";
const { Option } = Select;

const App = (props) => {
  const { schema, layout, state } = config;
  const { history, auth } = props;
  const [roles] = useState(state.roles);
  const [agen, setAgen] = useState(state.agen);
  const [region, setRegion] = useState(state.region);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState({
    content: true,
    submit: false,
  });
  const [form] = Form.useForm();

  const handleRoleChange = (value) => {
    setUserRole(roles.find((role) => role.id === value).role_name);
  };

  const fetchAgents = async () => {
    const res = await api.get("users?agents=true");
    return res;
  };

  const fetchRegion = async () => {
    const { data } = await api.get("regions");
    return data;
  };

  const handleSubmit = async (values) => {
    setLoading((loading) => ({ ...loading, submit: true }));
    try {
      if(auth.profile.role_name === AGEN){
        values.agen_id = auth.profile.id
      }
      await api.post("users", values);
      history.goBack();
    } catch (err) {
      message.error(err);
      console.log(err);
      setLoading((loading) => ({ ...loading, submit: false }));
    }
  };
  useEffect(() => {
    Promise.all([fetchAgents(), fetchRegion()]).then((res) => {
      const [agents, regions] = res;
      setRegion(regions);
      setAgen(agents);
      setLoading((loading) => ({ ...loading, content: false }));
    });
  }, []);
  return (
    <Spin spinning={loading.content}>
      <Content title="Tambah User">
        <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
          <Form.Item {...schema.username}>
            <Input />
          </Form.Item>
          <Form.Item {...schema.email}>
            <Input />
          </Form.Item>
          <Form.Item {...schema.password}>
            <Input.Password />
          </Form.Item>
          {auth.profile.role_name === ADMIN && (
            <Form.Item {...schema.role}>
              <Select
                placeholder="Pilih Role"
                allowClear
                onChange={handleRoleChange}
              >
                {roles.map((role) => (
                  <Option value={role.id} key={role.id}>
                    {role.role_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {userRole === AGEN && (
            <Form.Item {...schema.region_id}>
              <Select
                placeholder="Region"
                allowClear
                showSearch
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {region.map((r) => (
                  <Option value={r.id} key={r.id}>
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
              {loading.submit && <LoadingOutlined />} Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Spin>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
