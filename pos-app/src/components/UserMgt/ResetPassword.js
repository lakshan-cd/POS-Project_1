import React, { useState, state, Component, props, useParams } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import Swal from "sweetalert2";
const ResetPassword = () => {
  const { userId, resetToken } = useParams();
  const history = useNavigate();
  const [user_password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPassword = "newPassword123"; // Replace with the user's new password
      const response = await axios.post(`/api/reset/${userId}/${resetToken}`, {
        password: newPassword,
      });
      const data = response.data;
      // Handle the response from the API
      // Display success or error message to the user
    } catch (error) {
      // Handle the error
    }
  };
  return (
    <>
      <div className="split logo1">
        <div className="centered">
          <img src={require("../images/logo1.png")} />
          <p className="p1">
            <b> WELCOME !</b>
          </p>
          <p className="p2"> BY TECH POS SOLUTION </p>
          <p className="p3"> Our technology creates your excellence </p>
        </div>
      </div>

      <div className="split App">
        <div className="auth-form-container">
          <h1>Reset Password</h1>

          <form className="login-form">
            {" "}
            {/*onSubmit={this.handleSubmit} */}
            <label htmlfor="password">Enter new password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label htmlfor="password">Confirm password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="sign" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
