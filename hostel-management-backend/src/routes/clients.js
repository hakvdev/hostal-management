const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client.controller')


router.post('/clients', clientController.createClient)
router.get('/clients', clientController.getClients)
module.exports = router