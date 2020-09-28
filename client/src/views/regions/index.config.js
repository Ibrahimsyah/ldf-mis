import React from 'react'
import { Button } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
export default {
    initState: {
        data: [
            {
                region_id: 1,
                region_name: 'Rembang',
            },
            {
                region_id: 2,
                region_name: 'Malang',
            },
        ]
    },
    table: (onDelete, onEdit) => {
        return {
            rowKey: 'region_id',
            columns: [
                {
                    title: 'Region',
                    dataIndex: 'region_name',
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