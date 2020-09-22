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
          subtitle="Kelola Data Penjualan"
          Icon={AreaChartOutlined}
        />
        <MenuCard
          title="Produk"
          subtitle="Kelola Daftar Produk dan Harga"
          Icon={ShopOutlined}
        />
        <MenuCard
          title="User"
          subtitle="Kelola Agen dan Reseller"
          Icon={TeamOutlined}
        />
      </Row>
    </div>
  );
};
