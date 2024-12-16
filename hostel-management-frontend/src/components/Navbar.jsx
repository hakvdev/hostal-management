import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarBT() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Horizonte Hostal 🛎</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/rooms">Ver habitaciones</Nav.Link>
            <Nav.Link href="/clients">Ver clientes</Nav.Link>
            <Nav.Link href="/bookings">Ver Reservas</Nav.Link>
            <Nav.Link href="/create-rooms">Agregar habitación</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBT;
