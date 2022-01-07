import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // importing the thunk for making an API calls

export const eachProductDetails = createAsyncThunk(
  "/product/eachProductDetails",
  async (id) => {
    const productData = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    );
    const oneProduct = productData.json();
    return oneProduct; // making an API call by using createAsyncThunk
  }
);

const initialState = {
  productDetails: [], // intializing the initial state for storing the productDetails
};

const eachProduct = createSlice({
  // initialing the createSlice object for eachProduct details
  name: "singleProduct",
  initialState,
  reducers: {
    clearnUp: (state) => {
      state.productDetails = {}; // setting the Empty Object for cleaning the product details before selecting another product
    },
  },
  extraReducers: {
    // adding the extra reducer for adding the API data it contains 3 functions
    [eachProductDetails.pending]: () => {
      // calling the peding function if API state if Pending this function will call
      console.log("Pending");
    },
    [eachProductDetails.fulfilled]: (state, { payload }) => {
      return { ...state, productDetails: payload }; // fullFilled()  function is used to show the data if API data successfully fetched
    },
    [eachProductDetails.rejected]: () => {
      console.log("Rejected"); // rejceted() used for show the error if API failed to fetch the data
    },
  },
});

export const everyProductDetails = eachProduct.actions; // exporting the productDetails actions

export default eachProduct.reducer; // exporting the eachProduct reducer
