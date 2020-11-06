export default {
    form: {
        id: {
            rules: [
                {
                    required: true,
                    message: 'Username atau Email tidak boleh kosong'
                }
            ]
        },
        password: {
            rules: [
                {
                    required: true,
                    message: 'Password tidak boleh kosong'
                }
            ]
        },
    }
}