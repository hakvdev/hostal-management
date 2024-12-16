const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema ({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null},
    guests: {type: Number, required: true},
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    total: {type: Number, required: true}
})

module.exports = mongoose.model('Booking', bookingSchema)



