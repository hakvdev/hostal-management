import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateRoomForm = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    number: "",
    price: "",
    imageURL: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!roomData.number || !roomData.price || !roomData.imageURL) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true); // Deshabilitar el botón mientras se envía la solicitud

    // Asegurarnos de que isAvailable sea true por defecto
    const roomToCreate = {
      ...roomData,
      isAvaliable: true, // Agregar el campo isAvailable por defecto
    };

    try {
      // Enviar los datos de la nueva habitación al backend
      const response = await axios.post(
        "http://localhost:3000/api/rooms",
        roomToCreate
      );

      if (response.status === 200) {
        setMessage("Habitación creada con éxito!");
        setRoomData({ number: "", price: "", imageURL: "" }); // Resetear campos
      }
    } catch (error) {
      setError("Hubo un error al crear la habitación.");
      console.error("Error al crear la habitación:", error);
    } finally {
      setIsSubmitting(false); // Liberar el botón
      navigate("/rooms"); // Redirigir después de la creación
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Crear Nueva Habitación</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Número de la habitación */}
        <div className="mb-3">
          <label className="form-label">Número de la habitación:</label>
          <input
            type="text"
            className="form-control"
            value={roomData.number}
            onChange={(e) =>
              setRoomData({ ...roomData, number: e.target.value })
            }
            required
          />
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label">Precio por noche:</label>
          <input
            type="number"
            className="form-control"
            value={roomData.price}
            onChange={(e) =>
              setRoomData({ ...roomData, price: e.target.value })
            }
            required
          />
        </div>

        {/* URL de la imagen */}
        <div className="mb-3">
          <label className="form-label">URL de la imagen:</label>
          <input
            type="text"
            className="form-control"
            value={roomData.imageURL}
            onChange={(e) =>
              setRoomData({ ...roomData, imageURL: e.target.value })
            }
            required
          />
        </div>

        {/* Botón de creación */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear Habitación"}
        </button>
      </form>
    </div>
  );
};
