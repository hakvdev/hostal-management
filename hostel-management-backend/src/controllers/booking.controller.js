const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json(booking);
    } catch (error) {
        // Manejar diferentes tipos de errores
        if (error.message.includes('Habitación no encontrada')) {
            return res.status(404).json({ message: error.message });
        } else if (error.message.includes('La habitación ya no está disponible')) {
            return res.status(409).json({ message: error.message });
        } else {
            return res.status(400).json({ message: error.message });
        }
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getBookings();
        res.status(200).send(bookings)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
}