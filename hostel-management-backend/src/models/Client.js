
const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    rut: {type:String, required: true},
    phone : {type: String, required: true},
    room : {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true}
})

module.exports = mongoose.model('Client', clientSchema)