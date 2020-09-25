
const parsePrice = (price) => "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
export default {
    initState: {
        data: [
            {
                product_id: 1,
                product_name: 'Sakanato 1L',
                admin_price: 10000,
                agen_price: 20000,
                reseller_price: 30000
            },
            {
                product_id: 2,
                product_name: 'Sulfoks 1L',
                admin_price: 20000,
                agen_price: 30000,
                reseller_price: 40000
            }
        ]
    },
    table: () => {
        return {
            rowKey:'product_id',
            columns: [
                {
                    title: 'Nama Produk',
                    dataIndex: 'product_name',
                    key: 'product_id',
                },
                {
                    title: 'Harga Pusat',
                    dataIndex: 'admin_price',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Harga Agen',
                    dataIndex: 'agen_price',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Harga Reseller',
                    dataIndex: 'reseller_price',
                    render: row => parsePrice(row)
                }
            ],
        }
    }
}