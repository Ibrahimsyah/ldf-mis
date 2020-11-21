import React, { useState, useEffect } from "react";
import { message, Table } from "antd";
import Content from "../../components/Content";
import config, {parsePrice} from "./index.config";
import api from "../../providers/api";
import "./index.scss";

const App = () => {
  const { table, initState } = config;
  const [state, setState] = useState(initState);

  const renderSummary = () => {
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={3} className="summary-label">Total Pemasukan Bulan Ini</Table.Summary.Cell>
          <Table.Summary.Cell >
            <p className="total-income">{parsePrice(state.inoutSummary.totalIncome)}</p>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={3} className="summary-label">Total Pengeluaran Bulan Ini</Table.Summary.Cell>
          <Table.Summary.Cell>
            <p className="total-outcome">{"-" + parsePrice(state.inoutSummary.totalOutcome)}</p>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={3} className="summary-label">Total Margin Bulan Ini</Table.Summary.Cell>
          <Table.Summary.Cell>
            <p className="total">{parsePrice(state.inoutSummary.margin)}</p>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };
  const getInOutSummary = async () => {
    const res = await api.get("summary/inoutproducts");
    return res;
  };
  useEffect(() => {
    setState(state => ({...state, loading:true}))
    getInOutSummary().then((res) => {
      setState((state) => ({ ...state, inoutSummary: res }));
    })
    .catch(err => {
      console.log(err)
      message.error(err)
    })
    .finally(() => {
      setState(state => ({...state, loading:false}))
    });
  }, []);
  return (
    <Content title="Laporan Kinerja">
      <Table
        {...table()}
        dataSource={state.inoutSummary.data}
        summary={renderSummary}
      />
    </Content>
  );
};
export default (App);
