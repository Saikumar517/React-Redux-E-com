import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import SearchProduct from "../Search/SearchProduct";
import { fetchAsyncData } from "../reducers/productsData";

//importing the required components

const MainWebPage = () => {
  const dispatch = useDispatch(); // calling the dispatch function to add the Payload

  useEffect(() => {
    dispatch(fetchAsyncData()); // calling the API data to show in the UI from redux store by using thunk
  }, [dispatch]);

  return (
    <Fragment>
      <SearchProduct /> {/* calling searching component */}
    </Fragment>
  );
};

export default MainWebPage;
