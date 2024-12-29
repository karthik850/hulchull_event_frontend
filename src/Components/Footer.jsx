import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 ">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Hulchull</h5>
            <p>
              Lets have Fun
            </p>
          </Col>
          {/* <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-light">Home</a></li>
              <li><a href="#services" className="text-light">Services</a></li>
              <li><a href="#contact" className="text-light">Contact</a></li>
            </ul>
          </Col> */}
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: karthikemireddy@gmail.com</p>
            <p>Phone: *********</p>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p className="mb-0">&copy; Hulchull 12.0</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
// {new Date().getFullYear()}
