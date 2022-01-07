import { createSlice } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

const initialState = {
  // initializing the initial state
  items: [],
  totalQuantity: 0,
};

const addToCart = createSlice({
  //making the  object for accessing the state and actions
  name: "addToCart", // adding name for slice
  initialState, //adding the initial state
  reducers: {
    addCart: (state, action) => {
      // adding the addCart() function adding the items into the cart which we want to Buy
      const { newItem, userQty } = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          // pushing the product values to an array
          id: newItem.id,
          price: Math.floor(newItem.price).toFixed(2),
          quantity: userQty,
          totalPrice: userQty * Math.floor(newItem.price).toFixed(2),
          name: newItem.name,
          img: newItem.image_link,
        });
      } else {
        state.items = state.items.map((eachItem) => {
          if (eachItem.id === newItem.id) {
            // increasing the QTY by using product ID
            eachItem.quantity++;
            eachItem.totalPrice =
              Math.floor(eachItem.totalPrice) + Math.floor(eachItem.price);
          }
          return eachItem;
        });
      }
    },
    removeItem: (state, action) => {
      // adding the removeItem() function for removing the items from cart if we dont want those items
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        // removing the Product based on Its ID
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items = state.items.map((item) => {
          if (item.id === id) {
            item.quantity--;
            item.totalPrice = item.totalPrice - item.price;
          }
          return item;
        });
      }
    },
    clearCart: (state, action) => {
      state.items = []; // clearning cart Items
    },
    removeQty: (state, action) => {
      state.totalQuantity = action.payload;
    },
  },
});

export const addCartActions = addToCart.actions; // exporting the addToCart Actions

export default addToCart.reducer; // exporting the addToCart reducer
