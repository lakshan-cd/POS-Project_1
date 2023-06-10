import React, { useState } from "react";
import "./App.css";
import Login from "./components/UserMgt/Login";
import { ReactDOM } from "react-dom";
import { Log } from "./components/UserMgt/Log";
import Checkout from "./components/SalesMgt/Checkout";
import { BrowserRouter, Routes, Route, Switch, Link } from "react-router-dom";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import AddUsers from "./components/UserMgt/AddUsers";
import EditUser from "./components/UserMgt/EditUser";
import ResetPassword from "./components/UserMgt/ResetPassword";
import Storekeeper from "./components/UserMgt/Storekeeper";
import Cashier from "./components/UserMgt/Cashier";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/KeyBoard" element={<KeyBoard />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/AddUsers" element={<AddUsers />} />
          <Route path="/EditUser/:id" element={<EditUser />} />
          <Route path="/ResetPassword/:id/:token" element={<ResetPassword />} />
          <Route path="/storekeeper" element={<Storekeeper />} />
          <Route path="/Cashier" element={<Cashier />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
