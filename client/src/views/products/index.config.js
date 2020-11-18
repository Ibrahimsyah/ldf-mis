import React from 'react'
import { Button } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

const parsePrice = (price) => "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
export default {
    initState: {
        data: [],
        pagination: {
            pageSize:10,
            current: 1,
            total:10
        },
        loading: false,
        searchQuery: null
    },
    table: (onDelete, onEdit) => {
        return {
            rowKey: 'product_id',
            columns: [
                {
                    title: 'Nama Produk',
                    dataIndex: 'product_name',
                    key: 'product_id',
                },
                {
                    title: 'Harga Beli',
                    dataIndex: 'buy_price',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Harga Jual LDF',
                    dataIndex: 'admin_price',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Harga Jual Agen',
                    dataIndex: 'agen_price',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Harga Jual Reseller',
                    dataIndex: 'reseller_price',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Aksi',
                    align: 'center',
                    width: '10%',
                    render: row => (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button type="primary" onClick={() => onDelete(row)}><DeleteFilled style={{ color: '#fff' }} /></Button>
                            <Button type="primary" onClick={() => onEdit(row)}><EditFilled style={{ color: '#fff' }} /></Button>
                        </div>
                    )
                }
            ],
        }
    }
}