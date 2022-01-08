import React, { useState } from "react";
import { SiFlipkart } from "react-icons/si";
import { Link, useHistory } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

// importing the required components

const NavBar = () => {
  const noOfItems = useSelector((state) => state.cartItems.totalQuantity); //getting the products QTY from redux store
  const HideBtns = useSelector((state) => state.LoginHide.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory(); // getting the useHistory hook for routing

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    history.push("/");
    window.location.reload();
    return;
  };

  const logOutBtn = () => {
    setShow(true);
  };

  return (
    // returning the JSX code for UI
    <Container fluid>
      <Row>
        <Col sm="12" md="12">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true} // adding the Modal for Logout
          >
            <Modal.Header closeButton>
              <Modal.Title>🔐</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure want to Log out..?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleShow}>
                Yes, Logout
              </Button>
              <Button onClick={handleClose} variant="primary">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col
          sm="12"
          md="12"
          className=" bg-primary p-2 d-flex justify-content-around align-items-center"
        >
          <Link to="/homepage">
            <div className="d-flex align-items-center text-white ">
              <SiFlipkart size={35} />
              <strong> Flipkart </strong>
            </div>
          </Link>
          {HideBtns ? (
            <ul
              className="d-flex align-items-center
          list-unstyled"
            >
              <li>
                <Link to="/cart" className="text-white mr-2">
                  <BsCartCheck size={25} />
                  {noOfItems >= 1 ? noOfItems : 0}
                </Link>
              </li>
              <li>
                <button className="btn btn-warning" onClick={logOutBtn}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
