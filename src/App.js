import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import { Fragment } from "react";
import ProductPage from "./components/home/ProductPage";
import NavBar from "./components/home/NavBar";
import Cart from "./components/home/Cart";
import MainWebPage from "./components/home/MainWebPage";
import Error from "./components/home/Error";
import ProtectedRoute from "./components/home/ProtectedRoute";
import { useSelector } from "react-redux";
import Footer from "./components/home/Footer";
//Importing The components

//adding the Routes to the page by using React-router-dom
function App() {
  const auth = useSelector((state) => state.LoginHide.isLoggedIn);

  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Registration} />
          <ProtectedRoute
            exact
            path="/homepage"
            component={MainWebPage}
            auth={auth}
          />
          <ProtectedRoute
            exact
            path="/ProdctPage/:id"
            component={ProductPage}
            auth={auth}
          />
          <ProtectedRoute exact path="/cart" component={Cart} auth={auth} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
