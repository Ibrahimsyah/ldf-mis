import React, { useState, useEffect } from "react";
import { message, Table, Collapse } from "antd";
import Content from "../../components/Content";
import config, { parsePrice } from "./index.config";
import api from "../../providers/api";
import "./index.scss";

const { Panel } = Collapse;

const App = () => {
  const { tableInOut, tableAgentSummary, initState } = config;
  const [state, setState] = useState(initState);

  const renderSummary = () => {
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={3} className="summary-label">
            Total Pemasukan Bulan Ini
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <p className="total-income">
              {parsePrice(state.inoutSummary.totalIncome)}
            </p>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={3} className="summary-label">
            Total Pengeluaran Bulan Ini
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <p className="total-outcome">
              {"-" + parsePrice(state.inoutSummary.totalOutcome)}
            </p>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={3} className="summary-label">
            Total Margin Bulan Ini
          </Table.Summary.Cell>
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

  const getAgenSummary = async () => {
    const res = await api.get("summary/agentreport");
    return res;
  };
  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    Promise.all([getInOutSummary(), getAgenSummary()])
      .then((res) => {
        const [inout, agent] = res;
        setState((state) => ({
          ...state,
          inoutSummary: inout,
          agentSummary: agent,
        }));
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      })
      .finally(() => {
        setState((state) => ({ ...state, loading: false }));
      });
  }, []);
  return (
    <Content title="Laporan Kinerja">
      <Collapse accordion defaultActiveKey={["1"]}>
        <Panel header="Laporan Keuangan" key="1">
          <Table
            {...tableInOut()}
            dataSource={state.inoutSummary.data}
            summary={renderSummary}
          />
        </Panel>
        <Panel header="Laporan Kinerja Agen" key="2">
          <Table
            className="agent-table"
            {...tableAgentSummary()}
            dataSource={state.agentSummary}
          />
        </Panel>
      </Collapse>
    </Content>
  );
};
export default App;
