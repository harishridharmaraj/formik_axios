import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const formValidationSchema = yup.object({
  isbn: yup
    .string()
    .matches(/^[0-9]{13,}$/, "Need 13 Numbers")
    .required("ISBN is required"),
});

const AddBooks = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      publish_date: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://656b272edac3630cf727c285.mockapi.io/books",
          values
        );
        console.log("data submitted", res.data);
        navigate("/dashboard/books");
      } catch (error) {
        alert("Form cannot be Submitted", error);
      }
    },
  });

  return (
    <div>
      <h3>Add Books</h3>
      <br />
      <form onSubmit={formik.handleSubmit} className="addform">
        <div>
          <label>Books</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Authors"
            value={formik.values.author}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="isbn"
            name="Isbn"
            placeholder="ISBN Number"
            value={formik.values.isbn}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.isbn && formik.errors.isbn ? formik.errors.isbn : ""}
          <input
            type="date"
            id="publish_date"
            name="publish_date"
            placeholder="Published Date"
            value={formik.values.publish_date}
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

export default AddBooks;
