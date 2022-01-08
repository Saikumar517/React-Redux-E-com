import React, { Fragment, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MainWebPage from "../Main page/MainWebPage";
import { useHistory } from "react-router-dom";
import { loggeInActions } from "../reducers/LoginHide";
import { useSelector, useDispatch } from "react-redux";

//importing the components and required modules

function Login() {
  const [emaillog, setEmaillog] = useState(" ");
  const [passwordlog, setPasswordlog] = useState(" ");
  const [flag, setFlag] = useState(false);
  const [home, setHome] = useState(true);
  //initializing the default state
  const history = useHistory(); // adding history to go to another components or page

  const HideBtns = useSelector((state) => state.LoginHide.isLoggedIn);

  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault(); // preventing the default browser behaviour
    let pass = localStorage.getItem("password").replace(/"/g, ""); // getting the user details from localStorage
    let mail = localStorage.getItem("email").replace(/"/g, "");
    // .replace(/"/g,"") is used to remove the double quotes for the string

    if (!emaillog || !passwordlog) {
      setFlag(true); // validating the login form
    } else if (passwordlog !== pass || emaillog !== mail) {
      setFlag(true);
    } else {
      setHome(!home);
      setFlag(false);
      dispatch(loggeInActions.loggedIn(!HideBtns));
      history.push("/homepage"); // Going to home component if user details correct
    }
  }

  // adding the JSX for user input and login Button

  return (
    <Fragment>
      {home ? (
        <form className="bg-light">
          <h3 className="text-center text-primary p-2">LogIn🚪🔑</h3>
          <Container>
            <Row style={styles}>
              <Col sm={12} md={12}>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="form-control w-50 m-auto"
                  onChange={(event) => setEmaillog(event.target.value)}
                />
              </Col>
              <Col sm={12} md={12}>
                <input
                  type="password"
                  className="form-control w-50 m-auto"
                  placeholder="Enter your password..."
                  onChange={(event) => setPasswordlog(event.target.value)}
                />
              </Col>
              <Col sm={12} md={12}>
                <button
                  onClick={handleLogin}
                  className="btn btn-warning mb-2"
                  type="submit"
                >
                  Login
                </button>
                {flag && (
                  <Alert variant="danger" className="w-70 m-auto text-danger">
                    Fill correct Info else keep trying.
                  </Alert>
                )}
              </Col>
            </Row>
          </Container>
        </form>
      ) : (
        <MainWebPage />
      )}
    </Fragment>
  );
}

const styles = {
  // CSS Styles
  minHeight: "50vh",
  padding: "25px",
  textAlign: "center",
  borderRadius: "10px",
  marginTop: "30px",
};

export default Login;
