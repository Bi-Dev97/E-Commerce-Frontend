/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "./../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const signUpSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .nullable()
    .email("Email Should be valid")
    .required("Email Address Is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  /**useDispatch() ​ ... This hook returns a reference 
  to the dispatch function from the Redux store. 
  You may use it to dispatch actions as needed. */
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  /**
   useFormik() is a custom React hook that will return all 
   Formik state and helpers directly.
   initialValues is an object which describes respectly initials 
   values in the form fields.
   The name given to each key in 
   initialValues must match the name given to the field that Formik must control.
   */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values));
      //console.log(values);
      dispatch(registerUser(values));
    },
  });
  useEffect(() => {
    if (authState?.createdUser !== null && authState?.isError === false) {
      navigate("/login");
    }
  }, [authState]);

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-30"
              >
                <CustomInput
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur(
                    "firstName"
                  )} /**onBlur is a built-in event that is triggered when the user moves the cursor away from the element.
                   This event is opposite to the onFocus event . Generally, the onBlur event is used with form validation elements. */
                />
                <div className="errors">
                  {
                    /**The “touched” property in Formik is 
                    a way to determine if a field has been used (or touched) by the user. */
                    formik.touched.firstName && formik.errors.firstName
                  }
                </div>
                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur(
                    "lastName"
                  )} /**onBlur is a built-in event that is triggered when the user moves the cursor away from the element.
                   This event is opposite to the onFocus event . Generally, the onBlur event is used with form validation elements. */
                />
                <div className="errors">
                  {
                    /**The “touched” property in Formik is 
                    a way to determine if a field has been used (or touched) by the user. */
                    formik.touched.lastName && formik.errors.lastName
                  }
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur(
                    "email"
                  )} /**onBlur is a built-in event that is triggered when the user moves the cursor away from the element.
                   This event is opposite to the onFocus event . Generally, the onBlur event is used with form validation elements. */
                />
                <div className="errors">
                  {
                    /**The “touched” property in Formik is 
                    a way to determine if a field has been used (or touched) by the user. */
                    formik.touched.email && formik.errors.email
                  }
                </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur(
                    "mobile"
                  )} /**onBlur is a built-in event that is triggered when the user moves the cursor away from the element.
                   This event is opposite to the onFocus event . Generally, the onBlur event is used with form validation elements. */
                />
                <div className="errors">
                  {
                    /**The “touched” property in Formik is 
                    a way to determine if a field has been used (or touched) by the user. */
                    formik.touched.mobile && formik.errors.mobile
                  }
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur(
                    "password"
                  )} /**onBlur is a built-in event that is triggered when the user moves the cursor away from the element.
                   This event is opposite to the onFocus event . Generally, the onBlur event is used with form validation elements. */
                />
                <div className="errors">
                  {
                    /**The “touched” property in Formik is 
                    a way to determine if a field has been used (or touched) by the user. */
                    formik.touched.password && formik.errors.password
                  }
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
