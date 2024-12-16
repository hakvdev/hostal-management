
const express = require('express')
const router = express.Router()
const roomController = require('../controllers/room.controller')


//Agregar una habitación Ruta
router.post('/rooms', roomController.createRoom)

//Ver habitaciones Ruta
router.get('/rooms', roomController.getRooms)
router.get('/rooms/:id', roomController.getRoom)


module.exports = router