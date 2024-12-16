const Room = require('../models/Room');
const roomDTO = require('../dto/roomDTO');


exports.createRoom = async(req, res) => {
    try {
        const validatedData = roomDTO.validate(req.body)
        const newRoom = new Room(validatedData)
        await newRoom.save()
        res.status(201).json(newRoom)
    }
    catch (error) {
        res.status(400).send(error)
    }
}

exports.getRooms = async(req, res) => {
    try {
        const rooms = await Room.find()
        res.status(200).send(rooms)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getRoom = async(req, res ) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id).populate('client')
        res.status(200).send(room)
    } catch (error) {
        res.status(500).send(error)
    }
}