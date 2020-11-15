import React from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

const parsePrice = (price) => "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
export default {
    initState: {
        salesData: [],
        summary: {
            todayIncome: 0,
            last7Income: 0,
            last30Income: 0,
        },
        loading: false,
        range: "1"
    },
    table: (onDelete, onEdit) => {
        return {
            rowKey: row => row.product_id + row.waktu,
            columns: [
                {
                    title: 'Nama Produk',
                    dataIndex: 'product_name',
                },
                {
                    title: 'Harga Satuan',
                    dataIndex: 'harga_satuan',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Jumlah',
                    dataIndex: 'jumlah'
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Waktu Transaksi',
                    dataIndex: 'waktu',
                    render: row => moment(row).format('DD-MMMM-YYYY')
                }
            ],
        }
    }
}