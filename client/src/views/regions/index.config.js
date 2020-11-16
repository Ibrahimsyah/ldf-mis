import React from 'react'
import { Button } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'

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
            rowKey: 'id',
            columns: [
                {
                    title: 'Nama Wilayah',
                    dataIndex: 'region_name',
                    key: 'id',
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