import { configureStore } from "@reduxjs/toolkit";
import addToCart from "../reducers/addToCart";
import eachProduct from "../reducers/eachProduct";
import productsData from "../reducers/productsData";
import LoginHide from "../reducers/LoginHide";
// importing the reducers

const store = configureStore({
  //  configuring the store for multiple reducers
  reducer: {
    products: productsData, // adding the redecers in the reducer object
    eachData: eachProduct,
    cartItems: addToCart,
    LoginHide: LoginHide,
  },
});

export default store; // exporting the store for global access
