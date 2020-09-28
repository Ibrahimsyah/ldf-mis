export default {
    state: {
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
        product_name: {
            name: 'product_name',
            label: 'Nama Produk',
            rules: [
                {
                    required: true,
                    message: 'Nama Produk tidak boleh kosong'
                }
            ]
        },
        hq_price: {
            name: 'hq_price',
            label: 'Harga Pusat',
            rules: [{
                required: true,
                message: 'Harga tidak boleh kosong'
            }]
        },
        agen_price: {
            name: 'agen_price',
            label: 'Harga Agen',
            rules: [{
                required: true,
                message: 'Harga tidak boleh kosong'
            }]
        },
        reseller_price: {
            name: 'reseller_price',
            label: 'Harga Reseller',
            rules: [{
                required: true,
                message: 'Harga tidak boleh kosong'
            }]
        },
    }
}