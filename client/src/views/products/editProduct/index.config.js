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
        product_name: {
            name : 'product_name',
            label: 'Nama Produk',
            rules: [
                {
                    required: true,
                    message : 'Nama Produk tidak boleh kosong'
                }
            ]
        },
        admin_price: {
            name : 'admin_price',
            label: 'Harga Jual LDF',
            rules: [{
                required: true,
                message : 'Harga tidak boleh kosong'
            }]
        },
        agen_price: {
            name : 'agen_price',
            label: 'Harga Jual Agen',
            rules: [{
                required: true,
                message : 'Harga tidak boleh kosong'
            }]
        },
        reseller_price: {
            name : 'reseller_price',
            label: 'Harga Jual Reseller',
            rules: [{
                required: true,
                message : 'Harga tidak boleh kosong'
            }]
        },
    }
}