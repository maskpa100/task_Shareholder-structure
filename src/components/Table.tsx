import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./Table.scss";

export interface Data {
    holder: string;
    share_percent: string;
}

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
    },
];

const data: Data[] = [
    {
        holder: "Группа ИнтерРАО",
        share_percent: "32.56 %"
    },
    {
        holder: "Правительство России",
        share_percent: "50.000"
    },
    {
        holder: "Американские инвесторы",
        share_percent: "33.000"
    },
    {
        holder: "Американские инвесторы",
        share_percent: "33.000"
    },
    {
        holder: "Другие акционеры",
        share_percent: "6.360"
    },
];

export const StocksTable: React.FC = () => {
    return (
        <div className="table">
            <Table<Data> columns={columns} dataSource={data} pagination={false} style={{minWidth:'734px'}} />
        </div>
    );
};
