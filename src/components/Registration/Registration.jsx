import React, { Fragment, useState } from "react";
import { Alert } from "react-bootstrap";
import Login from "../Login/Login";
import { Container, Row, Col } from "react-bootstrap";

//importing the required modules

function Registration() {
  const [name, setName] = useState(""); // setting the state for User registation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState(false); // setting the boolean values based on condition by using state
  const [login, setLogin] = useState(true);
  const [info, setInfo] = useState(true);

  // on form submit...
  function handleFormSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      // validating the user details
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("email", JSON.stringify(email)); // sending the user data to localStorage
      localStorage.setItem("password", JSON.stringify(password));
      setLogin(!login);
    }
  }

  // Directly to the login page
  function handleClick() {
    // based on state page re-direct to login page
    setLogin(!login);
  }

  // Adding  the JSX code for user input and clicking the button

  return (
    <Fragment>
      {info ? (
        <div>
          {login ? (
            <form onSubmit={handleFormSubmit} className="bg-light">
              <h3 className="text-center text-primary p-2">Register📖</h3>
              <Container fluid>
                <Row style={styles}>
                  <Col sm={12} md={12}>
                    <input
                      type="text"
                      className="w-50 form-control m-auto"
                      placeholder="Enter Full Name"
                      name="name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </Col>
                  <Col sm={12} md={12}>
                    <input
                      className="w-50 form-control m-auto"
                      type="email"
                      placeholder="Enter email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Col>
                  <Col sm={12} md={12}>
                    <input
                      type="password"
                      className="w-50 form-control m-auto "
                      placeholder="Enter password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Col>
                  <Col sm={12} md={12}>
                    <button className="btn btn-warning mt-2 mb-2" type="submit">
                      Register
                    </button>
                    <p>
                      Already registered{" "}
                      <a href="#" onClick={handleClick}>
                        log in?
                      </a>
                    </p>
                    {flag && (
                      <Alert
                        variant="danger"
                        className="text-danger w-70 m-auto"
                      >
                        *I got it you are in hurry! But every Field is
                        important!
                      </Alert>
                    )}
                  </Col>
                </Row>
              </Container>
            </form>
          ) : (
            <Login />
          )}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

const styles = {
  minHeight: "55vh",
  padding: "10px",
  textAlign: "center",
  borderRadius: "10px",
  minWidth: "200px",
  marginTop: "30px",
};

export default Registration;
