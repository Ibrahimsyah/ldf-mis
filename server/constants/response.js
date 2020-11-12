module.exports = {
    success: writer => {
        return writer.status(200).json({
            status: 'Success'
        })
    },
    error: (writer, status, error) => {
        return writer.status(status).json({
            error: error
        })
    },
    systemError: {
        error: 'Kesalahan Server, Hubungi Administrator'
    },
    unauthorized: writer => {
        return writer.status(401).json({
            error: 'Unauthorized'
        })
    },
    accountNotActive: writer => {
        return writer.status(403).json({
            error: 'Akun anda sedang dalam menunggu persetujuan admin'
        })
    }
}