import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

export default () => {
  return (
    <Footer style={{ textAlign: "center", background: "#fff", padding:8 }}>
      Landoh Digital Farm ©2020 Made with <span role="img" aria-label="Love Emoji">❤️</span> by Ibrahimsyah Zairussalam
    </Footer>
  );
};
