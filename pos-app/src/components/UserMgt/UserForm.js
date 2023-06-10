import React, { useState } from "react";
import "./UserForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        {
          full_name: fullName,
          address,
          email,
          mobile_no: mobileNo,
          user_password: userPassword,
          user_role: userRole,
        }
      );

      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error(error); // Handle the error as needed
    }
  };
  const initialValues = {
    full_name: "",
    address: "",
    email: "",
    mobile_no: "",
    user_role: "",
    user_password: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required(),
    email: Yup.string().email().required(),
    address: Yup.string().required(),
    mobile_no: Yup.number().typeError("Mobile No must be a number").required(),
    user_role: Yup.string().required(),
    user_password: Yup.string().max(6).min(4).required(),
  });

  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/Users", data).then((response) => {
      console.log("It works");
      window.alert("Details saved");
      resetForm();
    });
  };

  return (
    <div className="container01">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <div className="formTopic">Add user</div>
          <label className="lable">Employee Name</label>
          <Field
            className="input01"
            id="inputCreateUsers"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <ErrorMessage
            className="Error"
            name="full_name"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">Address</label>
          <Field
            className="input01"
            id="inputCreateUsers"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <ErrorMessage
            className="Error"
            name="address"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">Email</label>
          <Field
            className="input01"
            id="inputCreateUsers"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage
            className="Error"
            name="email"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">Mobile No</label>
          <Field
            className="input01"
            id="inputCreateUsers"
            name="mobile_no"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <ErrorMessage
            className="Error"
            name="mobile_no"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">User Role</label>
          <Field
            as="select"
            className="dropDown01"
            id="inputCreateUsers"
            name="user_role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="">Select User Role</option>
            <option value="cashier">Cashier</option>
            <option value="storekeeper">Storekeeper</option>
          </Field>
          <ErrorMessage
            className="Error"
            name="user_role"
            component="span"
            style={{ display: "block" }}
          />

          <label className="lable">Password</label>
          <Field
            className="input01"
            id="inputCreateUsers"
            name="user_password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <ErrorMessage
            className="Error"
            name="user_password"
            component="span"
            style={{ display: "block" }}
          />
          <button className="Addbutton" type="submit" onClick={handleSubmit}>
            Add
          </button>
          <button className="Clearbutton" type="reset">
            Clear
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default UserForm;
