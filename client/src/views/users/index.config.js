import React from 'react'
import { Button } from 'antd'
import { EditFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { ADMIN } from '../../contants/UserRoles'

export default {
    initState: {
        data: [],
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
                title: 'Nama User',
                dataIndex: 'nama',
                sorter: true
            },
            {
                title: 'Role User',
                dataIndex: 'role_name',
                sorter: true
            },
            {
                title: 'Didaftarkan Oleh',
                dataIndex: 'created_by',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                sorter: true
            },
        ]
        if (role_name === ADMIN) {
            columns.push({
                title: 'Aksi',
                align: 'center',
                width: '10%',
                render: row => {
                    const pending = row.status !== 'Aktif'
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            {pending && <Button type="primary" onClick={() => onDelete(row)}><CloseOutlined /></Button>}
                            <Button type="primary" danger={pending} onClick={() => pending ? onApprove(row) : onEdit(row)}>{pending ? <CheckOutlined /> : <EditFilled style={{ color: '#fff' }} />}</Button>
                        </div>
                    )
                }
            })
        }
        return {
            rowKey: 'id',
            columns: columns
        }
    }
}