
const parsePrice = (price) => "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
        supplier_name: {
            name: 'nama',
            label: 'Nama Supplier',
        },
        supplier_owner: {
            name: 'nama_pemilik',
            label: 'Nama Pemilik',
        },
        alamat: {
            name: 'alamat',
            label: 'Alamat Supplier',
        },
        no_telp: {
            name: 'no_telp',
            label: 'Nomor Telepon',
        },
        email: {
            name: 'email',
            label: 'Email',
        },
    },
    table: () => {
        return {
            pagination: false,
            rowKey: 'id',
            columns: [
                {
                    title: 'No',
                    key: 'id',
                    render: (_, __, index) => index + 1 
                },
                {
                    title: 'Nama Barang',
                    dataIndex: 'product_name',
                },
                {
                    title: 'Harga Beli dari Supplier',
                    dataIndex: 'buy_price',
                    render: row => parsePrice(row)
                },
            ],
        }
    }
}