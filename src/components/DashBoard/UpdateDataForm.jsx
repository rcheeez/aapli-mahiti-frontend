import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { updatePeopleData } from "../../services/ApiService";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateDataForm({ data, onClose }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      zone: data.zone,
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Name is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits."),
      address: Yup.string().required("Address is required"),
      zone: Yup.string().required("Zone is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updatePeopleData(values, data.id);

        setTimeout(() => {
          navigate("/dashboard", {state: {message: "Data Updated Successfully!", visible: true}});
          window.location.reload();
        }, 1000);
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="update-form-popup">

        <h2 className="update-form-title">Update Details</h2>
        <div className="people-close-btn" onClick={onClose}>
          &#10005;
        </div>
        <form
          method="post"
          className="form-body"
          onSubmit={formik.handleSubmit}
        >
              <label htmlFor="fullName">Enter FullName</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="form-control"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <label htmlFor="phoneno">Enter Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneno"
                className="form-control"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <label htmlFor="address">Enter Address</label>
              <textarea
                name="address"
                id="address"
                cols="10"
                rows="2"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>

              <label htmlFor="zone">Select Zone</label>
              <select
                name="zone"
                id="zone"
                className="form-control"
                value={formik.values.zone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="Zone A">Zone A</option>
                <option value="Zone B">Zone B</option>
              </select>
          <div className="update-btn-container">
            <button type="submit" className="update-btn-submit">
              &#9998; &nbsp;Edit
            </button>
            <Link
              to={"/dashboard"}
              style={{ textAlign: "center" }}
              className="update-btn-cancel"
            >
              &#10006; &nbsp;Cancel
            </Link>
          </div>
        </form>
    </div>
  );
}
