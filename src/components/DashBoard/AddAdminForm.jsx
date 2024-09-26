import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { registerAdmin } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

export default function AddAdminForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const response = await registerAdmin(values);
        console.log(response);

        setTimeout(() => {
          navigate("/dashboard/team", {
            state: { message: "Admin Created Successfully!", visible: true },
          });
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div className="admin-team-container">
        <h2 className="team-admin-title">Add New Admin</h2>
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
              value="Add Admin"
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
    </>
  );
}
