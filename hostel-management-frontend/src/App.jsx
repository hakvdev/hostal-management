// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard"; // Asegúrate de que el nombre de importación coincida
import RoomsPage from "./pages/Rooms"; // Asegúrate de que RoomsPage esté importado correctamente
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBT from "./components/Navbar";
import { ClientsPage } from "./pages/Clients";
import { BookingsPage } from "./pages/Bookings";
import { RoomDetails } from "./components/RoomDetails";
import { Reserve } from "./pages/Reserve";
import { CreateRoom } from "./pages/CreateRoom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/rooms"
            element={
              <>
                <NavbarBT />
                <RoomsPage />
              </>
            }
          />
          <Route
            path="/clients"
            element={
              <>
                <NavbarBT />
                <ClientsPage />
              </>
            }
          />
          <Route
            path="/bookings"
            element={
              <>
                <NavbarBT />
                <BookingsPage />
              </>
            }
          />
          <Route
            path="/rooms/:id"
            element={
              <>
                <RoomDetails />
              </>
            }
          />
          <Route
            path="/reserve/:id"
            element={
              <>
                <Reserve />
              </>
            }
          />
          <Route
            path="/create-rooms"
            element={
              <>
                <NavbarBT />
                <CreateRoom />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
