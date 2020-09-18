import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Moment from "moment";
import "./index.scss";
const { Header } = Layout;
export default () => {
  const [currentTime, setCurrentTime] = useState(
    Moment(new Date()).locale("id").format("dddd, DD MMMM YYYY, HH:mm:ss")
  );
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(
        Moment(new Date()).locale("id").format("dddd, DD MMMM YYYY, HH:mm:ss")
      );
    }, 1000);
  }, []);
  return (
    <Header className="header">
      <div className="left">
        <h2>Selamat Datang Otong!</h2>
        <h5>{currentTime}</h5>
      </div>
      <div className="right">
        Keluar
      </div>
    </Header>
  );
};
