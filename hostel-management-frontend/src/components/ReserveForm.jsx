import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const ReserveForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la habitación
  const [room, setRoom] = useState(null);
  const [client, setClient] = useState({ name: "", rut: "", phone: "" }); // Datos del cliente
  const [guests, setGuests] = useState(1); // Número de huéspedes
  const [start, setStart] = useState(""); // Fecha de inicio
  const [end, setEnd] = useState(""); // Fecha de fin
  const [total, setTotal] = useState(0); // Total calculado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los detalles de la habitación
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/rooms/${id}`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener los datos de la habitación");
        setLoading(false);
      });
  }, [id]);

  // UseEffect para calcular el total cada vez que cambian las fechas o el precio de la habitación
  useEffect(() => {
    if (!start || !end || !room) return; // Si no hay fechas o habitación, no hacemos nada

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Calcular la duración en días
    const durationInMilliseconds = endDate - startDate;
    const durationInDays = durationInMilliseconds / (1000 * 3600 * 24); // Convertir milisegundos a días

    if (durationInDays < 1) {
      setError("La fecha de fin debe ser posterior a la fecha de inicio.");
      setTotal(0);
      return;
    }

    // Calcular el total (precio de la habitación por los días de estancia)
    setTotal(room.price * durationInDays); // Actualiza el total
    setError(null); // Reseteamos el error si todo está bien
  }, [start, end, room]); // Dependemos de start, end y room

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !room ||
      !client.name ||
      !client.rut ||
      !client.phone ||
      !start ||
      !end
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Enviar los datos al backend
    try {
      const response = await axios.post("http://localhost:3000/api/bookings", {
        client: {
          name: client.name, // Nombre del cliente
          rut: client.rut, // RUT del cliente
          phone: client.phone, // Teléfono del cliente
          room: room._id, // ID de la habitación
        },
        guests, // Número de huéspedes
        room: room._id, // ID de la habitación
        start, // Fecha de inicio
        end, // Fecha de fin
        total, // Total calculado
      });

      console.log("Reserva realizada correctamente:", response.data);
      navigate("/"); // Redirigir después de la reserva
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      setError("Hubo un error al realizar la reserva.");
    }
  };

  if (loading) return <p>Cargando habitación...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Reservar habitación</h1>
      <p>
        <strong>Habitación:</strong> {room.number}
      </p>
      <p>
        <strong>Precio por noche:</strong> ${room.price}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Cliente */}
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">RUT:</label>
          <input
            type="text"
            className="form-control"
            value={client.rut}
            onChange={(e) => setClient({ ...client, rut: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            className="form-control"
            value={client.phone}
            onChange={(e) => setClient({ ...client, phone: e.target.value })}
            required
          />
        </div>

        {/* Huéspedes */}
        <div className="mb-3">
          <label className="form-label">Huéspedes:</label>
          <input
            type="number"
            className="form-control"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            required
          />
        </div>

        {/* Fechas */}
        <div className="mb-3">
          <label className="form-label">Fecha de inicio:</label>
          <input
            type="date"
            className="form-control"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de fin:</label>
          <input
            type="date"
            className="form-control"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>

        {/* Total */}
        <div className="mb-3">
          <label className="form-label">Total:</label>
          <input
            type="text"
            className="form-control"
            value={`$${total}`}
            readOnly
          />
        </div>

        {/* Botón de reserva */}
        <button type="submit" className="btn btn-primary w-100">
          Reservar
        </button>
        <a href="/">Volver a Home</a>
      </form>
    </div>
  );
};
