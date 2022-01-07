import React from "react";
import { useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { useHistory } from "react-router-dom";
import { addCartActions } from "../reducers/addToCart";
import { useDispatch } from "react-redux";

//importing the required components

const ProceedPay = () => {
  // getting the data from Redux Store
  const totalCount = useSelector((state) => state.cartItems.items);
  const history = useHistory();
  const dispatch = useDispatch();

  const cartAmount = totalCount.reduce((total, eachOne) => {
    // gatting the Cart Total amount by using Reducer function
    return total + parseInt(eachOne.totalPrice);
  }, 0);

  const home = () => {
    dispatch(addCartActions.clearCart({})); // calling the clear  cart function
    dispatch(addCartActions.removeQty(0));
    history.push("/homepage"); // moving to Homepage once clearing the cart
  };

  return (
    <div
      className="text-center bg-dark w-75 m-auto shadow-lg rounded p-5"
      style={{ position: "absolute", top: "25%", left: "10%" }}
    >
      <h1 className="mt-5 text-warning ">
        <strong> Thank you For Shopping With Us</strong>
      </h1>
      <hr />
      <h4 className="text-primary ">
        Your Cart Total Amount is : ${cartAmount}
      </h4>
      <button onClick={home} className="btn btn-warning mt-5 ml-5">
        Order Now
      </button>
    </div>
  );
};

export default ProceedPay;
