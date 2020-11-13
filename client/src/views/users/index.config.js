import React from 'react'
import { Button } from 'antd'
import { EditFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { ADMIN, AGEN } from '../../contants/UserRoles'

export default {
    initState: {
        data: [],
        userSummary: {
            agenCount: 0,
            resellerCount: 0,
            regionCount: 0
        },
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
    table: (onDelete, onEdit, onApprove, role_name) => {
        const columns = [
            {
                title: role_name === ADMIN ? "Nama User" : "Nama Reseller",
                dataIndex: 'nama',
                sorter: true
            },
        ]
        if (role_name === ADMIN) {
            columns.push(
                {
                    title: 'Role User',
                    dataIndex: 'role_name',
                    sorter: true
                },
                {
                    title: 'Di daftarkan Oleh',
                    dataIndex: 'created_by',
                },
                {
                    title: 'Aksi',
                    align: 'center',
                    width: '10%',
                    render: row => {
                        const pending = row.status !== 'Aktif'
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                {pending && <Button type="primary" danger onClick={() => onDelete(row)}><CloseOutlined /></Button>}
                                <Button type="primary" onClick={() => pending ? onApprove(row) : onEdit(row)}>{pending ? <CheckOutlined /> : <EditFilled style={{ color: '#fff' }} />}</Button>
                            </div>
                        )
                    }
                })
        }else if(role_name === AGEN){
            columns.push({
                title: 'Status',
                dataIndex: 'status',
                sorter: true
            })
        }
        return {
            rowKey: 'id',
            columns: columns
        }
    }
}