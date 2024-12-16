exports.validate = (data) => {
    const { client, guests, start, end, room, total } = data;
    
    if (!client || !guests || !start || !end || !room || !total ) {
        return { error: 'All fields are required.' };
    }

    // Convertir las fechas sin la hora para evitar que se establezca la hora actual
    const startDate = new Date(start.split('T')[0]); // Solo la fecha, sin la hora
    const endDate = new Date(end.split('T')[0]);     // Solo la fecha, sin la hora

    return {
        client: client,
        guests: Number(guests),
        start: startDate,
        end: endDate,
        room: room,
        total: Number(total),
    };
};
