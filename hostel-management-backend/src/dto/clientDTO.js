const mongoose = require('mongoose');

exports.validate = (data) => {
    const { name, rut, phone, room } = data;
    if (!name || !rut || !phone || !room) {
        return { error: 'All fields are required.' };
    }

    return {
        name: String(name),
        rut: String(rut),
        phone: String(phone),
        room: room
    };
};