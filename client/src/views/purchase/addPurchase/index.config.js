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
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        },
        formFooter: {
            wrapperCol: { offset: 4, span: 20 },
        }
    },
    schema: {
        purchase_date: {
            name: 'purchase_date',
            label: 'Tanggal Pembelian',
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