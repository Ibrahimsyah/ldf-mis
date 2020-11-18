export default {
    state: {
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
        supplier_name: {
            name : 'nama',
            label: 'Nama Supplier',
            rules: [
                {
                    required: true,
                    message : 'Nama Supplier tidak boleh kosong'
                }
            ]
        },
        supplier_owner: {
            name : 'nama_pemilik',
            label: 'Nama Pemilik',
            rules: [{
                required: true,
                message : 'Nama Pemilik tidak boleh kosong'
            }]
        },
        alamat: {
            name : 'alamat',
            label: 'Alamat Supplier',
        },
        no_telp: {
            name : 'no_telp',
            label: 'Nomor Telepon',
            rules:[{
                max: 13,
                message: 'Nomor telepon maksimal 13 digit'
            }]
        },
        email: {
            name : 'email',
            label: 'Email',
        },
    }
}