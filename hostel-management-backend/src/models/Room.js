const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    number : { type:String, required: true},
    price : { type: Number, required: true},
    isAvaliable: {type: Boolean, default: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null},
    imageURL: { type: String, required: false }
})

module.exports = mongoose.model('Room', roomSchema)