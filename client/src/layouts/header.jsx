import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { clearAuth } from "../stores/actions/auth";
import Moment from "moment";
import "./index.scss";
const { Header } = Layout;
export default () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(
    Moment(new Date()).locale("id").format("dddd, DD MMMM YYYY, HH:mm:ss")
  );

  const logout = () => {
    dispatch(clearAuth());
  };
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
        <div onClick={logout} className="btn-logout">
          Keluar
        </div>
      </div>
    </Header>
  );
};
