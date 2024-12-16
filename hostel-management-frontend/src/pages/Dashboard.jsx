import React from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 text-primary mb-4">
            ¡Hola! Bienvenido al panel de administración de Horizonte Hostal 👋🏻
          </h1>
          <p className="lead mb-5">
            Selecciona una opción del menú para comenzar.
          </p>

          <div className="d-grid gap-2">
            <Link to="/clients" className="btn btn-outline-primary btn-lg mb-3">
              Ver clientes
            </Link>
            <Link
              to="/bookings"
              className="btn btn-outline-primary btn-lg mb-3"
            >
              Ver reservas
            </Link>
            <Link to="/rooms" className="btn btn-outline-primary btn-lg mb-3">
              Ver habitaciones
            </Link>
            <Link
              to="/create-rooms"
              className="btn btn-outline-primary btn-lg mb-3"
            >
              Agregar habitaciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
