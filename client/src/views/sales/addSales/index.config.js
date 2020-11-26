import React from 'react'
import { Button } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
export const parsePrice = (price) => "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
export default {
    state: {
        loading: {
            content: false,
            submit: false
        }
    },
    layout: {
        formBody: {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        },
        formFooter: {
            wrapperCol: { offset: 6, span: 18 },
        }
    },
    schema: {
        sales_date: {
            name: 'sales_date',
            label: 'Tanggal Penjualan',
            rules: [{
                required: true,
                message: 'Tanggal tidak boleh kosong'
            }]
        },
        tambah_barang: {
            name: 'product_id',
            label: 'Tambah Barang'
        },
        jumlah_barang: {
            name: 'quantity',
            label: 'Jumlah'
        },
        productList: (onDelete) => {
            return {
                rowKey: 'product_id',
                columns: [
                    {
                        title: 'Nama Produk',
                        dataIndex: 'product_name',
                        key: 'product_id',
                    },
                    {
                        title: 'Harga',
                        dataIndex: 'price',
                        render: row => parsePrice(row)
                    },
                    {
                        title: 'Jumlah',
                        dataIndex: 'quantity',
                    },
                    {
                        title: 'Total',
                        render: row => parsePrice(row.quantity * row.price)
                    },
                    {
                        title: 'Aksi',
                        render: (row) => {
                            return <Button danger onClick={() => onDelete(row)}><DeleteFilled /></Button>
                        }
                    }
                ],
            }
        }
    }
}