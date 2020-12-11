import React from "react";
import "./errorMessage.css";
import img from "./error.jpg";

const ErrorMessage = () => {
  return (
    <>
      {/* <img src={process.env.PUBLIC_URL + "/img/error.jpg"} alt="error" /> */}
      <img src={img} alt="error" />
      <span>Somthing goes wrong</span>
    </>
  );
};

export default ErrorMessage;
