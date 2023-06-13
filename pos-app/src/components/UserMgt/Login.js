import React, { useState, state, Component, props } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert2";
const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        user_password,
      });
      // Handle successful login
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Login Successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "250px",
        });
        console.log(response);
        if (response.data.results.user_role === "admin") {
          history("/AddUsers");
        } else if (response.data.results.user_role === "storekeeper") {
          history("/storekeeper");
        } else if (response.data.results.user_role === "cashier") {
          history("/Cashier");
        }
      }
    } catch (error) {
      // Handle login error
      console.error(error);
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
          <h1>SignIn</h1>

          <form className="login-form">
            {" "}
            {/*onSubmit={this.handleSubmit} */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your Email Address"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password">password</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
              value={user_password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="sign" type="submit" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
