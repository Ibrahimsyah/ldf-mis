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
        region_name: {
            name : 'region_name',
            label: 'Nama Region',
            rules: [
                {
                    required: true,
                    message : 'Nama Region tidak boleh kosong'
                }
            ]
        },
    }
}