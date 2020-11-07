module.exports = {
    success: writer => {
        writer.status(200).json({
            status: 'Success'
        })
    },
    error: message => {
        return {
            error: message
        }
    },
    systemError: {
        error: 'Kesalahan Server, Hubungi Administrator'
    },
    unauthorized: writer => {
        writer.status(401).json({
            error: 'Unauthorized'
        })
    }
}