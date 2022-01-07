import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // importing createAsyncThunk for API Call

export const fetchAsyncData = createAsyncThunk(
  "product/fetchAsyncData",
  async () => {
    const res = await fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    );
    const data = await res.json();
    return data; // making an API call by using the API
  }
);

const initialState = {
  products: [], // initializing the initial state
};

const products = createSlice({
  name: "product",
  initialState, // adding the createSLice name and initialState
  reducers: {
    // adding the reducer
    product: (state, action) => {
      state.products = action.payload; // storing the products into an array
    },
  },
  extraReducers: {
    // adding the extra reducer for adding the API data it contains 3 functions
    [fetchAsyncData.pending]: () => {
      // calling the peding function if API state if Pending this function will call
      console.log("Pending");
    },
    [fetchAsyncData.fulfilled]: (state, action) => {
      console.log("fulfilled"); // fullFilled()  function is used to show the data if API data successfully fetched
      return { ...state, products: action.payload };
    },
    [fetchAsyncData.rejected]: () => {
      console.log("rejected");
      throw new Error("Failed to fetch the data"); //rejceted() used for show the error if API failed to fetch the data
    },
  },
});

export const productAction = products.actions; //exporting the products actions

export default products.reducer; // exporting the products reducers
