import React, { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
// import * as yup from "yup";

const EditBooks = () => {
  const [data, setData] = useState();
  const { bookId } = useParams();
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://656b272edac3630cf727c285.mockapi.io/books/${bookId}`
      );
      console.log("Response", res.data);
      setData(res.data);
    } catch (error) {
      console.log("Cannot Fetch Data ", error);
    }
  }, [bookId]);

  useEffect(() => {
    getData();
  }, [getData, bookId]);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      publish_date: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          `https://656b272edac3630cf727c285.mockapi.io/books/${bookId}`,
          values
        );
        console.log("data Updated", res.data);
        navigate("/dashboard/books");
      } catch (error) {
        alert("Form cannot be Submitted", error);
      }
    },
  });
  useEffect(() => {
    if (data && !formik.values.title) {
      formik.setValues(data);
    }
  }, [data, formik]);

  return (
    <div>
      <h3>Edit Books</h3>
      <br />
      <form onSubmit={formik.handleSubmit} className="addform">
        <div>
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
            name="isbn"
            placeholder="ISBN Number"
            value={formik.values.isbn}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
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

export default EditBooks;
