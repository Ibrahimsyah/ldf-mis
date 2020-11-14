import React from "react";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/id_ID";
import { Provider } from "react-redux";
import moment from 'moment'
import 'moment/locale/id'
import "./App.scss";
import Layout from "./layouts";
import store from "./stores";

moment.locale('id')
function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <Layout />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
