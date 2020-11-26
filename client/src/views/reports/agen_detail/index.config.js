const parsePrice = (price) => price >= 0 ? "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "-Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace('-', '')
export default {
    initState: {
        dataSource: [],
        agen_info: {},
        loading: false
    },

    tableResellerReport: () => {
        return {
            pagination: false,
            rowKey: 'reseller_id',
            columns: [
                {
                    title: 'Nama Reseller',
                    dataIndex: 'nama'
                }, 
                {
                    title: 'Total Barang Terjual',
                    dataIndex: 'barang_terjual'
                },
                {
                    title: 'Total Pendapatan',
                    dataIndex: 'total_pendapatan',
                    render: row => parsePrice(row)
                }
            ]
        }
    }
}