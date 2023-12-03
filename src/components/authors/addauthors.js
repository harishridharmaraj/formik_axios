import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const AddAuthor = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      birth: "",
      author: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://656b272edac3630cf727c285.mockapi.io/authors",
          values
        );
        console.log("data submitted", res.data);
        navigate("/dashboard/authors");
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
            type="date"
            id="birth"
            name="birth"
            placeholder="Birth Date"
            value={formik.values.birth}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="bio"
            name="bio"
            placeholder="Bio"
            value={formik.values.bio}
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

export default AddAuthor;
