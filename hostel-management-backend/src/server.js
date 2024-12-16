const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const roomRoutes = require('./routes/rooms')
const clientRoutes = require('./routes/clients')
const bookingRoutes = require('./routes/bookings')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api', roomRoutes)
app.use('/api', clientRoutes)
app.use('/api', bookingRoutes)



mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a la Base de Datos'))
.catch((err) =>console.error('Error al conectar a MongoDB', err))

app.get('/', (req, res) =>{
    res.send('Hola mundo!')
})

app.listen(port, () => {
    console.log('Servidor escuchando en puerto', port)
})

