import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacer la llamada a la API para obtener todas las habitaciones
    axios
      .get("http://localhost:3000/api/rooms") // Ajusta la URL de la API si es necesario
      .then((response) => {
        console.log("Datos recibidos:", response.data); // Verifica la respuesta de la API
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las habitaciones", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando habitaciones...</p>;

  console.log("Habitaciones en el estado:", rooms); // Verifica el estado después de la actualización

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Habitaciones Disponibles</h2>
      <div className="row">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-4 mb-4" key={room._id}>
              <div className="card shadow-sm" style={{ height: "100%" }}>
                <img
                  src={room.imageURL}
                  alt={`Habitación ${room.number}`}
                  style={{
                    width: "100%",
                    height: "200px", // Establece una altura fija para las imágenes
                    objectFit: "cover", // Asegura que la imagen cubra el área de la tarjeta
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Habitación: {room.number}</h5>
                  <p className="card-text">Precio: ${room.price}</p>
                  <p className="card-text">
                    Disponibilidad:{" "}
                    {room.isAvaliable ? (
                      <span className="text-success">Disponible</span>
                    ) : (
                      <span className="text-danger">No disponible</span>
                    )}
                  </p>
                  <Link to={`/rooms/${room._id}`} className="btn btn-primary">
                    Ver detalles
                  </Link>

                  <div className="d-flex justify-content-between mt-3">
                    {room.isAvaliable ? (
                      <Link
                        to={`/reserve/${room._id}`}
                        className="btn btn-primary"
                      >
                        Reservar
                      </Link>
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        Reservar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay habitaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default RoomList;
