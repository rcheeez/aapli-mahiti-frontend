import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTitle from "./DashboardTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPeopleData } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const toCamelCase = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.split('/').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('/'))
    .join(' ');
};


export default function AddDataForm() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      zone: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Name is required"),
      phoneNumber: Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits."),
      address: Yup.string().required("Address is required"),
      zone: Yup.string().required("Zone is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {

      try {
		setLoading(true);
        const response = await addPeopleData(values);
		    console.log(response);

        setTimeout(() => {
          navigate("/dashboard", {state: {message: "Person Data Added Succesfully!", visible: true}});
        }, 2000);
		setLoading(false);
      } catch (myerror) {
        setError("Failed to add Data!");
        navigate("/dashboard", {state: {message: error, visible: true}});
      } finally {
        //setLoading(false);
        setSubmitting(false);
      }
    },
  });

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  return (
    <>
    <Helmet>
      <title>Add New Data - Aapli Mahiti Portal</title>
    </Helmet>
      <DashboardSidebar isSidebarHidden={isSidebarHidden} />
      <div className="dashboard-body">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main>
          <DashboardTitle
            heading={"Add People Details"}
            breadcumb={"Add Details"}
          />
          <div className="data-form-container">
            <h2>Add People Details</h2>
            <form className="data-form-body" method="post" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <label htmlFor="fullName" className="data-form-label">
                    Enter Full Name:
                  </label>
                  <input
                    type="text"
                    className="data-form-control"
                    name="fullName"
                    id="fullName"
                    placeholder="For e.g: Archies Gurav"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
					required
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
              <div className="error">{formik.errors.fullName}</div>
            ) : null}
                </div>
                <div className="col">
                  <label htmlFor="phoneno" className="data-form-label">
                    Enter Phone Number:{" "}
                  </label>
                  <input
                    type="text"
                    className="data-form-control"
                    name="phoneNumber"
                    id="phoneno"
                    placeholder="For e.g: 7900195828"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="error">{formik.errors.phoneNumber}</div>
            ) : null}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="address" className="data-form-label">
                    Enter Address:{" "}
                  </label>
                  <textarea
                    name="address"
                    className="data-form-control"
                    id="address"
                    placeholder="For e.g: Paradise Villa, 23/B..."
                    rows={2}
                    cols={10}
                    onChange={(e) => {
                      formik.setFieldValue("address", toCamelCase(e.target.value));
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address ? (
              <div className="error">{formik.errors.address}</div>
            ) : null}
                </div>
                <div className="col">
                  <label htmlFor="zone" className="data-form-label">
                    Select Zone
                  </label>
                  <select
                    name="zone"
                    className="data-form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zone}
                  >
                    <option defaultValue={""}>Select your Zone</option>
                    <option value={"Zone A"}>Zone A</option>
                    <option value={"Zone B"}>Zone B</option>
                  </select>
                  {formik.touched.zone && formik.errors.zone ? (
              <div className="error">{formik.errors.zone}</div>
            ) : null}
                </div>
              </div>
              <div className="submit-container">
                <input
                  type="submit"
                  className="data-btn-submit"
                  value={"Add Data"}
                />
                <input
                  type="reset"
                  className="data-btn-reset"
                  value={"Reset Fields"}
                  onClick={formik.handleReset}
                />
              </div>
            </form>
          </div>
        </main>
      </div>
	  {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}
