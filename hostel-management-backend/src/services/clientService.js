const Room = require('../models/Room')
const Client = require('../models/Client')
const clientDTO = require('../dto/clientDTO')

exports.createClient = async (data) => {
    try {
      const validatedData = clientDTO.validate(data);
      const newClient = new Client(validatedData);
      const roomId = newClient.room;
      await updateRoomAvailability(roomId)
      await newClient.save();
      await Room.findByIdAndUpdate(roomId, { client: newClient._id });
      return newClient;
    } catch (error) {
      throw error;
    }
  };

  const updateRoomAvailability = async (roomId) => {
    try {
      const room = await Room.findById(roomId)
      if (!room) {
        throw new Error('Habitación no encontrada')
      }
      room.isAvaliable = false
      await room.save()
      return { message: 'Habitación actualizada' }
    } catch (error) {
      throw error
    }
  }

exports.getClients = async() => {
    try {
        const clients = await Client.find().populate('room');
        return clients
    } catch (error) {
        throw error
    }
}
