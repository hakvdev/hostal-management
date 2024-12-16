import React, { useState, useEffect } from "react";
import axios from "axios";

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/bookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
        console.log("Datos recibidos", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las reservas", error);
        setLoading(false);
      });
  }, []);

  // Función para extraer solo la fecha en formato YYYY-MM-DD
  const formatDate = (dateString) => {
    return dateString.split("T")[0]; // Esto extrae la fecha sin la parte de la hora
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reservas Actuales</h2>
      {loading ? (
        <p>Cargando reservas...</p>
      ) : bookings.length > 0 ? (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">ID de Reserva: {booking._id}</h5>
                  <p className="card-text">
                    <strong>Cliente:</strong>{" "}
                    {booking.client ? booking.client.name : "Sin asignar"}
                  </p>
                  <p className="card-text">
                    <strong>Habitación:</strong>{" "}
                    {booking.room ? booking.room.number : "Sin asignar"}
                  </p>
                  <p className="card-text">
                    <strong>Llegada:</strong> {formatDate(booking.start)}
                  </p>
                  <p className="card-text">
                    <strong>Salida:</strong> {formatDate(booking.end)}
                  </p>
                  <p className="card-text">
                    <strong>Total:</strong> ${booking.total}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay reservas disponibles.</p>
      )}
    </div>
  );
};
