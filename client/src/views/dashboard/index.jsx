import React from "react";
import { Row } from "antd";
import {
  AreaChartOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import MenuCard from "../../components/MenuCard";

export default () => {
  return (
    <div className="fadeIn">
      <Row gutter={24}>
        <MenuCard
          title="Penjualan"
          subtitle="Input Data Penjualan"
          Icon={AreaChartOutlined}
        />
        <MenuCard
          title="Manajemen Produk"
          subtitle="Kelola Daftar Produk dan Harga"
          Icon={ShopOutlined}
        />
        <MenuCard
          title="Manajemen User"
          subtitle="Kelola Agen dan Reseller"
          Icon={TeamOutlined}
        />
      </Row>
    </div>
  );
};
