import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../../styles/login.css";
import { useFormik } from "formik";
import { loginAdmin } from "../../services/ApiService";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Username is Required"),
      password: Yup.string().required("Password is Required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setError("");

      try {
        const response = await loginAdmin(values);
        const { token } = response;
        localStorage.setItem("token", token);

        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard", {
            state: { message: "Login Success!", visible: true },
          });
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.log(formik.values.username);
        console.log(formik.values.password);
        setLoading(false);
        setError("Login Failed! Please check your credentials and try again!");
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <Helmet>
        <title>Login - Aapli Mahiti</title>
        <meta
          name="description"
          content="Login to Aapli Mahiti to access personalized information and services. Secure and easy login for all users."
        />
        <meta
          name="keywords"
          content="Aapli Mahiti, login, user login, secure login, personalized information, access services"
        />
      </Helmet>
      <div className="login-body-container">
      <div className="login-container">
        <h2 className="team-admin-title">Admin Login</h2>
        {!error && (<p className="error-msg">{error}</p>)}
        <form
          className="admin-form-body"
          onSubmit={formik.handleSubmit}
          method="post"
        >
          <div className="mb-3">
            <label htmlFor="username" className="admin-form-label">Enter Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="admin-form-control"
              placeholder="Enter Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="admin-form-label">Enter Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="admin-form-control"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type="submit"
              value="Login"
              className="admin-btn-submit"
            />
          </div>
        </form>
      </div>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      </div>
    </>
  );
}
