
export default {
    state: {
        roles: [
            {
                id: '470ec00b-d332-43f4-8c9e-71fae43f4819',
                role_name: "Admin"
            },
            {
                id: '1ba746f6-5df9-4c8b-a078-3c0453d1122b',
                role_name: "Agen"
            },
            {
                id: '1ba746f6-5df9-4c8b-a078-3c0453d1122c',
                role_name: "Reseller"
            }
        ],
        agen: [
            {
                agen_id: '1',
                agen_name: 'Fulan',
                agen_region: 'Rembang'
            },
            {
                agen_id: '2',
                agen_name: 'Fulanah',
                agen_region: 'Malang'
            }
        ],
        region: []
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
        username: {
            name: 'username',
            label: 'Username',
            rules: [
                {
                    required: true,
                    message: 'Username tidak boleh kosong'
                }
            ]
        },
        email: {
            name: 'email',
            label: 'Email (Jika ada)',
            rules: [{
                type: 'email',
                message: 'Pastikan sesuai format: contoh@email.com'
            }]
        },
        password: {
            name: 'password',
            label: 'Password',
            rules: [
                {
                    required: true,
                    min: 8,
                    message: 'Password Minimal 8 Karakter'
                }
            ]
        },
        role: {
            name: 'role_id',
            label: 'Role',
        },
        region_id: {
            name: 'region_id',
            label: 'Region',
            rules: [
                {
                    required: true,
                    message: 'Pilih Region tempat Agen berada'
                }
            ]
        },
        agen_id: {
            name: 'agen_id',
            label: 'Agen Pengampu',
            rules: [
                {
                    required: true,
                    message: 'Pilih salah satu Agen Pengampu Reseller yang ingin dibuat'
                }
            ]
        },
        nama: {
            name: 'nama',
            label: 'Nama Lengkap',
            rules: [
                {
                    required: true,
                    message: 'Nama Lengkap tidak boleh kosong'
                }
            ]
        },
        alamat: {
            name: 'alamat',
            label: 'Alamat Lengkap',
            rules: [
                {
                    required: true,
                    message: 'Alamat Lengkap tidak boleh kosong'
                }
            ]
        },
        pekerjaan: {
            name: 'pekerjaan',
            label: 'Pekerjaan',
        },
    }
}