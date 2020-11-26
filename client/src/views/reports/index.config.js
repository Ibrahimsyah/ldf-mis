import React from 'react'

import moment from 'moment'

export const parsePrice = (price) => price >= 0 ? "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace('-', '')
export default {
    initState: {
        inoutSummary: {
            margin: 0,
            totalIncome: 0,
            totalOutcome: 0,
            data: []
        },
        agentSummary: [],
        pagination: {
            pageSize: 10,
            current: 1,
            total: 10
        },
        sorter: {
            field: null,
            order: ''
        },
        loading: false,
        searchQuery: null
    },
    tableAgentSummary: (onClick) => {
        return {
            pagination: false,
            rowKey: 'user_id',
            columns: [
                {
                    title: 'Nama Agen',
                    dataIndex: 'nama'
                },
                {
                    title: 'Total Barang Terjual',
                    dataIndex: 'barang_terjual'
                },
                {
                    title: 'Total Pendapatan',
                    dataIndex: 'total_pendapatan',
                    render: row => parsePrice(row)
                }
            ],
            onRow: (row) => {
                return {
                    onClick: () => onClick(row)
                }
            }
        }
    },
    tableInOut: () => {
        return {
            pagination: false,
            rowKey: row => row.waktu + row.product_name,
            columns: [
                {
                    title: 'Waktu',
                    dataIndex: 'waktu',
                    render: row => moment(row).format('DD MMMM YYYY')
                },
                {
                    title: 'Nama Produk',
                    dataIndex: 'product_name'
                },
                {
                    title: 'Jumlah',
                    dataIndex: 'jumlah'
                },
                {
                    title: 'Total',
                    align: 'right',
                    render: row => {
                        if (row.is_income) {
                            return <div className="row-income">{parsePrice(row.harga)}</div>
                        } else {
                            return <div className="row-outcome"> -{parsePrice(row.harga)}</div>
                        }
                    }
                }
            ]
        }
    }
}