import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required("Email required"),
  phone: yup.string().matches(/^[0-9]{10,10}$/, "Phone required"),
  address: yup.object({
    zipcode: yup
      .string()
      .required()
      .matches(/^[0-9]{5,6}$/, "Zipcode required"),
  }),
});

const AddUser = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "", skills: "", jobs: "" },
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://65536c325449cfda0f2eaa2c.mockapi.io/users",
          values
        );
        console.log("data submitted", res.data);
        navigate("/dashboard/users");
      } catch (error) {
        alert("Form cannot be Submitted", error);
      }
    },
  });

  return (
    <div>
      <h3>Add Users</h3>
      <br />
      <form onSubmit={formik.handleSubmit} className="addform">
        <div>
          <label>Basic</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : ""}
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : ""}
          <input
            type="url"
            id="website"
            name="website"
            placeholder="Website"
            value={formik.values.website}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <label>Company</label>

          <input
            type="text"
            id="company.name"
            name="company.name"
            placeholder="Company Name"
            value={formik.values.company.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="company.skills"
            name="company.skills"
            placeholder="Skills"
            value={formik.values.company.skills}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="company.jobs"
            name="company.jobs"
            placeholder="Jobs"
            value={formik.values.company.jobs}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label>Address</label>

          <input
            type="text"
            id="address.street"
            name="address.street"
            placeholder="Street"
            value={formik.values.address.street}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="address.suite"
            name="address.suite"
            placeholder="Suite"
            value={formik.values.address.suite}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="address.city"
            name="address.city"
            placeholder="City"
            value={formik.values.address.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <input
            type="text"
            id="address.zipcode"
            name="address.zipcode"
            placeholder="Zipcode"
            value={formik.values.address.zipcode}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.address?.zipcode && formik.errors.address?.zipcode
            ? formik.errors.address.zipcode
            : ""}
          <input
            type="text"
            id="address.geo.lat"
            name="address.geo.lat"
            placeholder="Latitude"
            value={formik.values.address.geo.lat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="address.geo.lng"
            name="address.geo.lng"
            placeholder="Longtitude"
            value={formik.values.address.geo.lng}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <br />
        <button onClick={formik.handleReset}>Reset</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
