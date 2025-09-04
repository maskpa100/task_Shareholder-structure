import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./Table.scss";
import type { Data } from "../../App";


const columns: ColumnsType<Data> = [
  {
    title: "Держатель акции",
    dataIndex: "holder",
    key: "stocks",
  },
  {
    title: "% Доли",
    dataIndex: "share_percent",
    key: "shares",
    width: 274,
    className: "shares-column",
    render: (value: number) => `${value.toFixed(2)} %`,
  },
];

export const StocksTable: React.FC<{ data: Data[] }> = ({ data }) => {
  return (
    <div className="table">
      <Table<Data> columns={columns} dataSource={data} pagination={false} rowKey="holder" />
    </div>
  );
};
