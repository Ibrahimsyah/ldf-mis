module.exports = {
    sendHello: async (req, res) => {
        const model = {
            message: 'Hello World'
        }

        res.status(200)
        res.json(model)
    },

    getHello: async (req, res) => {
        const { body } = req
        const model = {
            message: 'Success',
            body: body
        }

        res.status(200)
        res.json(model)
    }
}