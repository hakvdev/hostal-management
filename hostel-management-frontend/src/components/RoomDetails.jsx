import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const RoomDetails = () => {
  const { id } = useParams(); // Obtener el 'id' de la URL
  const [room, setRoom] = useState({}); // Inicializar como objeto vacío
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/rooms/${id}`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la habitación", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header text-center">
              <img
                src={room.imageURL}
                className="img-fluid rounded"
                alt="Imagen de la habitación"
                style={{ maxWidth: "500px", height: "auto" }}
              />
            </div>
            <div className="card-body">
              <h1 className="card-title text-center">{room.number}</h1>
              <p className="text-center text-muted">Precio: ${room.price}</p>
              <div className="mt-4">
                <h4 className="text-secondary">Detalles:</h4>
                <p>
                  <strong>Servicios:</strong>
                  <span className="d-inline-flex align-items-center">
                    Wifi
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="14"
                      width="17.5"
                      viewBox="0 0 640 512"
                      style={{ margin: "0 5px" }}
                    >
                      <path
                        fill="#000000"
                        d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
                      />
                    </svg>
                  </span>
                  <span className="d-inline-flex align-items-center">
                    Servicio a la Habitación:
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="14"
                      width="12.25"
                      viewBox="0 0 448 512"
                      style={{ margin: "0 5px" }}
                    >
                      <path
                        fill="#000000"
                        d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"
                      />
                    </svg>
                  </span>
                </p>

                {room.client ? (
                  <div className="alert alert-success">
                    <h5>Cliente Asignado:</h5>
                    <p>
                      <strong>Nombre:</strong> {room.client.name}
                    </p>
                    <p>
                      <strong>Contacto:</strong> {room.client.phone}
                    </p>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <p>Sin asignar</p>
                  </div>
                )}
              </div>
              <div className="text-center mt-4">
                <a href="/rooms" className="btn btn-outline-secondary btn-lg">
                  Volver a la lista de habitaciones
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
