import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../Pagination styles/Pagination.css";
import { useDispatch } from "react-redux";
import { addCartActions } from "../reducers/addToCart";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

// importing the required components

const SearchComponent = (props) => {
  const notify = () => toast.info("Item Added to Cart");

  const { id, name, brand, price, image_link, rating, product_type } =
    props.eachSearch; // destructing the values from Props
  const dispatch = useDispatch(); // calling the dispatch Hook
  const searchAddToCart = () => {
    const newItem = {
      //passing the cart values
      id,
      name,
      price,
      image_link,
    };

    dispatch(
      addCartActions.addCart({
        newItem,
        userQty: 1, // increasing the product based its values
      })
    );
    notify(); // calling the notify function
  };

  return (
    // returing the search UI
    <Fragment>
      <Col sm={12} xs={12} md={2} lg={3} style={styles}>
        <img height={200} src={image_link} alt={name} />
        <p>
          Brand : <strong> {brand}</strong>
        </p>
        <p>
          Product-Type : <strong> {product_type}</strong>
        </p>
        <p
          className={`${
            rating >= 3 ? "bg-success" : "bg-danger"
          } w-50 rounded m-auto text-center`}
        >
          Rating : <strong> {rating}</strong>
        </p>
        <Link to={`/ProdctPage/${id}`}>
          <button className="btn btn-primary mt-2"> View Product </button>
        </Link>
        <button className="btn btn-primary ml-3 mt-2" onClick={searchAddToCart}>
          Add to Cart
        </button>
        <ToastContainer />
      </Col>
    </Fragment>
  );
};

const styles = {
  // CSS styles
  maxWidth: "310px",
  minHeight: "100px",
  margin: "auto",
  marginTop: "10px",
  boxShadow: "2px 2px 10px #0275d8",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "58px",
};

export default SearchComponent;
