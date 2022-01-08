import React from "react";
import image from "../../2022184.jpg";
import { Link } from "react-router-dom";

//importing the required modules

const Error = () => {
  return (
    // adding the JSX to Show an error to user if URl path changes
    <div style={styles}>
      <Link to="/homepage" className="btn btn-warning">
        Go to Home
      </Link>
    </div>
  );
};

const styles = {
  // CSS styles
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "90vh",
  width: "100%",
  textAlign: "center",
  padding: "20px",
};

export default Error; // exporting the component
