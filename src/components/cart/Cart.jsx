import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCartActions } from "../reducers/addToCart";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProceedPay from "../proceed to pay/ProceedPay";

// importing the required components

const Cart = () => {
  const [show, setShow] = useState(false);
  const cartItems = useSelector((state) => state.cartItems.items);

  const cartAmount = cartItems.reduce((total, eachOne) => {
    // gatting the Cart Total amount by using Reducer function
    return total + parseInt(eachOne.totalPrice);
  }, 0);

  // getting the state from Redux store to access the state

  const dispatch = useDispatch(); // calling the dispatch function to add the Payload

  const items = cartItems.map((eachOne) => {
    const { id, name, price, img, quantity, totalPrice } = eachOne; // getting the data by using useSelector hook from redux store

    const QtyIncrese = () => {
      const newItem = { id, name, price, img };
      // if we click on increase button  the product will increase by 1 unit
      dispatch(
        addCartActions.addCart({
          // increasing the product based its values
          newItem,
        })
      );
    };
    const QtyDecrease = () => {
      // if we click on idecrease button  the product will increase by 1 unit based on its ID
      dispatch(addCartActions.removeItem(id));
    };

    // adding the JSX for UI to show the cart Items
    return (
      <Fragment>
        <Container key={id}>
          {/*Adding the Conatiner and Row for Responsive Web */}
          <Row>
            <Col sm={12} md={12}>
              <strong>Item : {name} </strong>
            </Col>
          </Row>
          <Row style={(styles, container)}>
            <Col sm={12} md={4}>
              <img height={50} src={img} alt={name} className="mt-2 rounded" />
            </Col>
            <Col
              sm={12}
              md={4}
              className="mt-2 d-flex justify-content-around align-items-center"
            >
              <p>Price : ${Math.floor(price)} </p>
              <p> Total Price : ${Math.floor(totalPrice)} </p>
            </Col>
            <Col
              sm={12}
              md={4}
              className="d-flex justify-content-around align-items-center"
            >
              <button onClick={QtyIncrese} className="btn btn-warning ">
                +
              </button>
              <strong>{quantity} </strong>
              <button onClick={QtyDecrease} className="btn btn-warning ">
                -
              </button>
            </Col>
          </Row>
          <hr />
        </Container>
      </Fragment>
    );
  });

  return (
    <div style={{ marginBottom: "150px" }}>
      {items.length >= 1 ? (
        items
      ) : (
        <h2 className="text-primary text-center mt-3">
          No Items Found in Your Cart 🤐 <br />
          <Link to="/homepage" className="btn btn-warning">
            Go to Home
          </Link>
        </h2>
      )}
      {show && <ProceedPay />}
      <hr />

      {items.length >= 1 ? (
        <Fragment>
          <div className="text-right mr-5">
            <h4>SubTotal: ${cartAmount}</h4>
          </div>
          <div className="d-flex justify-content-around mt-2 mb-2 ">
            <button
              onClick={() => {
                dispatch(addCartActions.clearCart({})); // calling the Clear cart function for clearning the Items in the cart
                dispatch(addCartActions.removeQty(0));
              }}
              className="btn btn-danger"
              style={shadow}
            >
              Clear Cart
            </button>
            <button
              style={shadow}
              onClick={() => {
                setShow(true);
              }}
              className="btn btn-dark"
            >
              Proceed To Pay
            </button>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

const styles = {
  // CSS  for styling
  height: "100vh",
  textAlign: "center",
};
const container = {
  // CSS  for styling
  backgroundColor: "gray",
  color: "#fff",
  minHeight: "50px",
  padding: "5px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "2px 2px 6px yellow",
  fontWeight: "bold",
};
const shadow = { boxShadow: "2px 2px 6px black" };

export default Cart;
