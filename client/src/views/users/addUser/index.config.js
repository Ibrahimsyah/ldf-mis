export default {
    state: {
        roles: [
            {
                role_id  : '1',
                role_name: 'Admin'
            },
            {
                role_id  : '2',
                role_name: 'Agen'
            },
            {
                role_id  : '3',
                role_name: 'Reseller'
            },
        ],
        agen: [
            {
                agen_id    : '1',
                agen_name  : 'Fulan',
                agen_region: 'Rembang'
            },
            {
                agen_id    : '2',
                agen_name  : 'Fulanah',
                agen_region: 'Malang'
            }
        ],
        region: [
            {
                region_id  : 1,
                region_name: 'Rembang'
            },
            {
                region_id  : 2,
                region_name: 'Malang'
            },
        ]
    },
    layout: {
        formBody: {
            labelCol  : { span: 4 },
            wrapperCol: { span: 20 },
        },
        formFooter: {
            wrapperCol: { offset: 4, span: 20 },
        }
    },
    schema: {
        username: {
            name : 'username',
            label: 'Username',
            rules: [
                {
                    required: true,
                    message : 'Username tidak boleh kosong'
                }
            ]
        },
        email: {
            name : 'email',
            label: 'Email (Jika ada)',
            rules: [{
                type   : 'email',
                message: 'Pastikan sesuai format: contoh@email.com'
            }]
        },
        password: {
            name : 'password',
            label: 'Password',
            rules: [
                {
                    required: true,
                    min     : 8,
                    message : 'Password Minimal 8 Karakter'
                }
            ]
        },
        role: {
            name : 'role_id',
            label: 'Role',
            rules: [
                {
                    required: true,
                    message : 'Role tidak boleh kosong'
                }
            ]
        },
        region_id: {
            name : 'region_id',
            label: 'Region',
            rules: [
                {
                    required: true,
                    message : 'Pilih Region tempat Agen berada'
                }
            ]
        },
        agen_id: {
            name : 'agen_id',
            label: 'Agen Pengampu',
            rules: [
                {
                    required: true,
                    message : 'Pilih salah satu Agen Pengampu Reseller yang ingin dibuat'
                }
            ]
        },
        nama: {
            name : 'nama',
            label: 'Nama Lengkap',
            rules: [
                {
                    required: true,
                    message : 'Nama Lengkap tidak boleh kosong'
                }
            ]
        },
        alamat: {
            name : 'alamat',
            label: 'Alamat Lengkap',
            rules: [
                {
                    required: true,
                    message : 'Alamat Lengkap tidak boleh kosong'
                }
            ]
        },
        pekerjaan: {
            name : 'pekerjaan',
            label: 'Pekerjaan',
        },
    }
}