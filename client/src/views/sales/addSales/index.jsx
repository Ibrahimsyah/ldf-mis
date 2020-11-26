import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  DatePicker,
  Table,
  Select,
  InputNumber,
  message,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment";
import Content from "../../../components/Content";
import api from "../../../providers/api";
import config, { parsePrice } from "./index.config";
import { AGEN, RESELLER } from "../../../contants/UserRoles";

const { Option } = Select;

const App = (props) => {
  const {
    auth: { profile },
    history,
  } = props;
  const { schema, layout, state } = config;
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(state.loading);
  const [form] = Form.useForm();
  const dateFormat = "DD MMMM YYYY";

  const handleSubmit = async () => {
    if (cart.length < 1) {
      message.warn("Anda harus menambah minimal 1 barang untuk melanjutkan");
      return;
    }
    setLoading((loading) => ({ ...loading, submit: true }));
    const products = cart.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      };
    });
    const { sales_date } = form.getFieldsValue();
    const model = {
      sales_date: sales_date.format("YYYY-MM-DD HH:mm:ss"),
      products,
    };
    try {
      await api.post("sales", model);
      message.success("Sukses Menambahkan Data Penjualan");
      history.goBack();
    } catch (err) {
      console.log(err);
      setLoading((loading) => ({ ...loading, submit: false }));
    }
  };

  const fetchProducts = async () => {
    const { data } = await api.get("products?page=1&limit=1000");
    return data;
  };

  const handleAddProduct = () => {
    const { product_id, quantity } = form.getFieldsValue();
    if (!product_id || !quantity) {
      message.warning("Isi nama dan jumlah barang dengan tepat");
      return;
    }
    const item = { product_id, quantity };
    if (cart.find((item) => item.product_id === product_id)) {
      message.error("Anda sudah memasukkan barang ini");
      return;
    }
    const p = productList.find((p) => p.product_id === product_id);
    item.product_name = p.product_name;
    item.price =
      profile.role_name === AGEN
        ? p.agen_price
        : profile.role_name === RESELLER
        ? p.reseller_price
        : p.admin_price;
    setCart((cart) => [item, ...cart]);

    form.setFieldsValue({
      product_id: null,
      quantity: null,
    });
  };

  const handleDeleteItem = (row) => {
    const newCart = cart.filter((item) => item.product_id !== row.product_id);
    setCart(newCart);
  };
  const calculateSummary = () => {
    const totalPrices =
      cart.length > 0
        ? cart.reduce(
            (prev, current) => prev + current.price * current.quantity,
            0
          )
        : 0;
    return (
      <h4 style={{ textAlign: "right", margin: "10px 0px" }}>
        Total {cart.length} barang, {parsePrice(totalPrices)}
      </h4>
    );
  };
  useEffect(() => {
    fetchProducts().then((res) => {
      setProductList(res);
      setLoading((loading) => ({ ...loading, content: false }));
    });
  }, []);
  return (
    <Content title="Tambah Penjualan">
      <Spin spinning={loading.content}>
        <Form form={form} {...layout.formBody} onFinish={handleSubmit}>
          <Form.Item {...schema.sales_date} initialValue={moment(Date.now())}>
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item {...schema.tambah_barang}>
            <Select
              showSearch
              style={{ marginRight: 16 }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {productList.map((product) => (
                <Option value={product.product_id} key={product.product_id}>
                  {product.product_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...schema.jumlah_barang}>
            <InputNumber placeholder="Jumlah" min={1} />
          </Form.Item>
          <Form.Item {...layout.formFooter}>
            <Button type="primary" onClick={handleAddProduct}>
              Tambah Barang
            </Button>
          </Form.Item>
          <h3>Daftar Barang Sementara</h3>
          <Table
            dataSource={cart}
            {...schema.productList(handleDeleteItem)}
            pagination={false}
          />
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                {calculateSummary()}
                <Button type="primary" onClick={handleSubmit}>
                  {loading.submit && <LoadingOutlined />} Simpan Data Penjualan
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </Content>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
