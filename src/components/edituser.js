import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
// import * as yup from "yup";

const EditUser = () => {
  const [data, setData] = useState();
  const { userId } = useParams();
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://65536c325449cfda0f2eaa2c.mockapi.io/users/${userId}`
      );
      console.log("Response", res.data);
      setData(res.data);
    } catch (error) {
      console.log("Cannot Fetch Data ", error);
    }
  }, [userId]);

  useEffect(() => {
    getData();
  }, [getData, userId]);

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
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          `https://65536c325449cfda0f2eaa2c.mockapi.io/users/${userId}`,
          values
        );
        console.log("data Updated", res.data);
        navigate("/dashboard/users");
      } catch (error) {
        alert("Form cannot be Submitted", error);
      }
    },
  });
  useEffect(() => {
    if (data && !formik.values.name) {
      formik.setValues(data);
    }
  }, [data, formik]);

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
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
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

export default EditUser;
