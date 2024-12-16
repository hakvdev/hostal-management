const bookingDTO = require('../dto/bookingDTO');
const clientService = require('../services/clientService');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

exports.createBooking = async (data) => {
    try {
        // Validar los datos de la reserva usando bookingDTO
        const validatedBookingData = bookingDTO.validate(data);
        if (validatedBookingData.error) {
            throw new Error(validatedBookingData.error);
        }  

        // Desestructurar los datos validados
        const { client, room, guests, start, end, total } = validatedBookingData;
        
        
        // Verificar disponibilidad de la habitación antes de crear el cliente
        const roomToUpdate = await Room.findById(room);
        if (!roomToUpdate) {
            throw new Error('Habitación no encontrada');
        }
        if (!roomToUpdate.isAvaliable) {
            throw new Error('La habitación ya no está disponible');
        }
        
        // Crear el cliente usando el servicio existente
        const newClient = await clientService.createClient(client);
        
        // Actualizar disponibilidad de la habitación
        roomToUpdate.isAvaliable = false;
        await roomToUpdate.save();

        // Crear la reserva
        const newBooking = new Booking({
            client: newClient._id, // Almacena el ID del cliente creado
            room: roomToUpdate._id, // Almacena el ID de la habitación
            guests,
            start: start, // Fecha de inicio ya ajustada en el DTO
            end: end,     // Fecha de fin ya ajustada en el DTO
            total,
        });  

        await newBooking.save(); // Guarda la nueva reserva
        return newBooking;
    } catch (error) {
        throw error; // Re-lanza el error para que el controlador lo maneje
    }
};

exports.getBookings = async () => {
    try {
        const bookings = await Booking.find().populate('client').populate('room');
        return bookings;
    } catch (error) {
        throw error;
    }
};
