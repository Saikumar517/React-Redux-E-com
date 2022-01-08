import React from "react";
import { Container, Row, Col } from "react-bootstrap";

//importing the Footer and css for styling

const Footer = () => {
  return (
    // footer component and added JSX for UI
    <Container fluid>
      <Row
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <Col className="d-flex flex-column align-items-center bg-primary text-white">
          <p className="text-center">
            Copy Rights &#9400; Reserved <br />
            <span>Flipkart &#9400; 2022</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
