import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  eachProductDetails,
  everyProductDetails,
} from "../reducers/eachProduct";
import { addCartActions } from "../reducers/addToCart";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";
// importing the required components

const ProductPage = () => {
  const dispatch = useDispatch(); // calling the dispatch function
  const params = useParams();
  const productId = params.id; //calling the useParams function for specific ID

  const notify = () => toast.info("Item added to cart"); //initializing the notification function

  const [addCartBtn, setAddCartBtn] = useState(false);

  const productDetails = useSelector((state) => state.eachData.productDetails); // selecting the data from redux store
  // const noOfItems = useSelector((state) => state.cartItems.totalQuantity);

  const {
    id,
    name,
    price,
    brand,
    image_link,
    description,
    rating,
    quantity,
    product_type,
  } = productDetails; // destructing the data from products data

  useEffect(() => {
    dispatch(eachProductDetails(productId)); // initializing the useEffect Hook for calling the data whenever component render
    return () => {
      dispatch(everyProductDetails.clearnUp()); // calling the clean up function
    };
  }, [dispatch, productId]); // adding dependencies
  const [userQty, setUserQty] = useState(1);

  const addToCartHandler = () => {
    const newItem = {
      id,
      name,
      price,
      image_link,
      quantity,
    };
    dispatch(
      addCartActions.addCart({
        newItem,
        userQty,
      })
    ); // initializing the addtocart function and passing the data based on product
    setAddCartBtn(true);
    notify(); // calling the notify() for notification
  };
  const qtySelect = (e) => {
    setUserQty(parseInt(e.target.value));
  };

  return (
    // adding the UI
    <Container fluid className="bg-light text-center pt-2">
      <Row className="shadow-lg p-2">
        <Col sm={12} md={12}>
          <h4>
            Product Name : <strong> {name}</strong>
          </h4>
        </Col>
        <Col xs={6} sm={6} md={6}>
          <img src={image_link} alt={name} className="rounded " />
          <p>
            Price : <strong> $ {price}</strong>
          </p>
          <hr />
          <p>
            Brand : <strong> {brand} </strong>
          </p>
          <hr />
          <p>
            Product Type : <strong> {product_type} </strong>
          </p>
          <hr />
        </Col>
        <Col
          sm={6}
          xs={6}
          md={6}
          className="d-flex flex-column justify-content-around align-items-center"
        >
          <div>
            <p
              className={`${
                rating >= 3 ? "bg-success" : "bg-danger"
              } w-25 rounded`}
            >
              Rating : {rating}
            </p>
            <p>
              <strong> Description : </strong>
              {description}
            </p>
          </div>

          <select
            style={{
              width: "60px",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
            name="QTY"
            id="Qty"
            onChange={qtySelect}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <button
            disabled={addCartBtn}
            onClick={addToCartHandler}
            className="btn btn-warning btn-block "
          >
            {addCartBtn ? "Item Added to Cart" : "Add to Cart"}
          </button>
          <ToastContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
