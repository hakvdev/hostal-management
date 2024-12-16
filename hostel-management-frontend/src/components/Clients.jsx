import { useEffect, useState } from "react";
import axios from "axios";

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clients")
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Cargando clientes...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Clientes</h2>
      <div className="row">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div className="col-md-4 mb-4" key={client._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{client.name}</h5>
                  <p className="card-text">
                    <strong>Rut:</strong> {client.rut}
                  </p>
                  <p className="card-text">
                    <strong>Teléfono:</strong> {client.phone}
                  </p>
                  <p className="card-text">
                    <strong>Habitación ocupada:</strong> {client.room.number}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay clientes disponibles.</p>
        )}
      </div>
    </div>
  );
};
