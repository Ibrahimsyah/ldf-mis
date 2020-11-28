import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Button, Input, Row, Col, message, Modal, Spin } from "antd";
import Content from "../../components/Content";
import api from "../../providers/api";

const UbahPasswordModal = (props) => {
  const { visible, setVisible  } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleChangePassword = async (values) => {
    if (values.oldPassword && values.newPassword && values.confirmPassword) {
      if (values.newPassword !== values.confirmPassword) {
        message.warn("Konfirmasi Password harus sama dengan Password Baru");
        return;
      }
      setLoading(true);
      try {
        await api.put("users/changepassword", values);
        message.success('Password berhasil di ganti')
        setVisible(false)
      } catch (err) {
        message.error(err);
      }finally{
        setLoading(false);
      }
      return;
    }
    message.warn("Periksa kembali kolom input, pastikan sudah terisi semua");
  };

  const onCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      footer={null}
      onCancel={onCancel}
      visible={visible}
      title="Ubah Password"
    >
      <Form form={form} labelCol={{ span: 10 }} onFinish={handleChangePassword}>
        <Form.Item label="Password Lama" name="oldPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Password Baru" name="newPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Konfirmasi Password Baru" name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Row gutter={[12, 12]}>
            <Col md={12} sm={24}>
              <Button htmlType="submit" type="primary">
                {loading && <LoadingOutlined />} Simpan Password
              </Button>
            </Col>
            <Col md={12} sm={24}>
              <Button onClick={onCancel}>Tutup</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default () => {
  const [loading, setLoading] = useState({
    updateUser: false,
    content: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getUserData = async () => {
    const res = api.get("users/me");
    return res;
  };

  const handleChangePassword = () => {
    setModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading((loading) => ({ ...loading, updateUser: true }));
      await api.put(`users?user_id=${values.id}`, values);
      message.success("Sukses Mengubah Informasi Akun");
    } catch (err) {
      console.log(err);
      message.error(err);
    } finally {
      setLoading((loading) => ({ ...loading, updateUser: false }));
    }
  };
  useEffect(() => {
    setLoading((loading) => ({ ...loading, content: true }));
    getUserData().then((res) => {
      form.setFieldsValue(res);
      setLoading((loading) => ({ ...loading, content: false }));
    });
  }, [form]);

  return (
    <Content title="Edit Profil" backToDashboard>
      <Spin spinning={loading.content}>
        <UbahPasswordModal
          visible={modalVisible}
          setVisible={setModalVisible}
        />
        <Form form={form} labelCol={{ span: 4 }} onFinish={handleSubmit}>
          <Form.Item name="id" noStyle>
            <Input hidden />
          </Form.Item>
          <Form.Item label="Nama Lengkap" name="nama">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Alamat" name="alamat">
            <Input />
          </Form.Item>
          <Form.Item label="Pekerjaan" name="pekerjaan">
            <Input />
          </Form.Item>
          <Form.Item>
            <Row gutter={[12, 12]}>
              <Col md={6} sm={24}>
                <Button htmlType="submit" type="primary">
                  {loading.updateUser && <LoadingOutlined />} Simpan Perubahan
                </Button>
              </Col>
              <Col md={6} sm={24}>
                <Button type="danger" onClick={handleChangePassword}>
                  Ubah Password
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </Content>
  );
};
