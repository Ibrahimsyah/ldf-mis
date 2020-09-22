import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import Layout from "./layouts";
import store from "./stores";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
