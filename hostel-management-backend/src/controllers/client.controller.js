const clientService = require('../services/clientService')

exports.createClient = async(req, res) => {
    try {
        const client = await clientService.createClient(req.body)
        res.status(201).send(client)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.getClients = async(req, res) => {
    try {
        const clients = await clientService.getClients()
        res.status(200).send(clients)
    } catch (error) {
        res.status(500).send(error)
    }
}