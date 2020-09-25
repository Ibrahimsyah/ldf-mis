
export default {
    initState: {
        data: [
            {
                user_id: 1,
                user_name: 'Fulan 1',
                user_role: 'Admin',
                created_by: 'Ibrahimsyah Z',
                created_at: (new Date()).toLocaleDateString(),
                status: 'Aktif'
            },
            {
                user_id: 2,
                user_name: 'Fulan 2',
                user_role: 'Agen',
                created_by: 'Admin',
                created_at: (new Date()).toLocaleDateString(),
                status: 'Menunggu Persetujuan'
            },
        ]
    },
    table: () => {
        return {
            rowKey: 'user_id',
            columns: [
                {
                    title: 'Nama User',
                    dataIndex: 'user_name',
                    key: 'user_id',
                },
                {
                    title: 'Role User',
                    dataIndex: 'user_role',
                },
                {
                    title: 'Didaftarkan Oleh',
                    dataIndex: 'created_by',
                },
                {
                    title: 'Didaftarkan Pada',
                    dataIndex: 'created_at',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    align: 'center'
                }
            ],
        }
    }
}