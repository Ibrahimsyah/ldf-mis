import React from 'react'
import { Button } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

export default {
    initState: {
        data: [],
        pagination: {
            pageSize: 10,
            current: 1,
            total: 10
        },
        loading: false,
        searchQuery: null
    },
    table: (onDelete, onEdit, onClick) => {
        return {
            rowKey: 'id',
            columns: [
                {
                    title: 'Nama Supplier',
                    dataIndex: 'nama',
                },
                {
                    title: 'Pemilik',
                    dataIndex: 'nama_pemilik',
                },
                {
                    title: 'Alamat',
                    dataIndex: 'alamat',
                },
                {
                    title: 'Telepon',
                    dataIndex: 'no_telp',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: 'Aksi',
                    align: 'center',
                    width: '10%',
                    render: row => (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button type="primary" onClick={(e) => {
                                e.stopPropagation()
                                onDelete(row)
                            }}><DeleteFilled style={{ color: '#fff' }} /></Button>
                            <Button type="primary" onClick={(e) => {
                                e.stopPropagation()
                                onEdit(row)
                            }}><EditFilled style={{ color: '#fff' }} /></Button>
                        </div>
                    )
                }
            ],
            onRow: (row) => {
                return {
                    onClick: () => onClick(row)
                }
            }
        }
    }
}