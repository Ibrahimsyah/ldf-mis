module.exports = {
    success: {
        message: 'success'
    },
    error: message => {
        return {
            error: message
        }
    },
    systemError: {
        error: 'Kesalahan Server, Hubungi Administrator'
    }
}