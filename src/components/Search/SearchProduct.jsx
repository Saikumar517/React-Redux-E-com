import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productAction } from "../reducers/productsData";
import SearchComponent from "./SearchComponent";
import ReactPaginate from "react-paginate";
import "../Pagination styles/Pagination.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";

const SearchProduct = () => {
  // initializing the default states
  const [userSearch, setUserSearch] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const dispatch = useDispatch(); //calling the dispatch() function
  const reduxSearchData = useSelector((state) => state.products.products); // getting the products data from redux store
  const userInput = (e) => {
    setUserSearch(e.target.value); //adding the user input into state
  };

  const history = useHistory();
  const [count, setCount] = useState(0); // initializing the page count to ZERO for pagination

  const countPerPage = 12; // initializing the default page count
  const visitedPages = count * countPerPage; // calculating the pages count
  const searchHandler = async () => {
    if (userSearch === "") {
      //validating the user input
      alert("Please enter your Search input to get the Products...");
      return;
    }
    setFetchData(true);
    const searchData = await fetch(
      // fetching the data from API based on user input
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${userSearch}`
    );
    const resData = await searchData.json(); // getting the json data
    dispatch(productAction.product(resData)); //adding the JSON data into redux payload
    setFetchData(false);
  };

  const allSearchedData = reduxSearchData
    .slice(0, 53) //initializing the slice count to no of products for pagination
    .slice(visitedPages, visitedPages + countPerPage) // calculating the pages count per page
    .map((eachSearch) => {
      // mapping trough the products data
      return <SearchComponent eachSearch={eachSearch} key={eachSearch.id} />; // Sending the data to Search Component
    });

  const pageCount = Math.ceil(reduxSearchData.length / countPerPage); // couting the pages per page
  const changePage = ({ selected }) => {
    //  selecting the pages per number
    setCount(selected);
  };

  return (
    <Fragment>
      <Container fluid style={{ height: "150vh" }} className="pt-2">
        <Row>
          <Col sm={12} md={12} className="text-center ">
            <input
              type="search"
              placeholder="Search Your Product..."
              className="form-control w-50 m-auto "
              value={userSearch}
              onChange={userInput}
            />
            <button
              className="mt-2 mb-2 btn btn-primary"
              onClick={searchHandler}
            >
              Search
            </button>

            <h2 className="text-dark">
              {fetchData ? "Searching Your Brand ..Please wait ...." : ""}
            </h2>
          </Col>
        </Row>
        <Row className="text-center p-2">
          {allSearchedData.length >= 1 ? (
            <ReactPaginate //adding the React paginate component for pagination
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              activeClassName={"paginationActive"}
            />
          ) : (
            ""
          )}
          {allSearchedData.length >= 1 ? (
            allSearchedData
          ) : (
            <div style={style}>
              <Spinner animation="border" size="md" variant="primary" />
            </div>
          )}
        </Row>
      </Container>
    </Fragment>
  );
};
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
export default SearchProduct;
