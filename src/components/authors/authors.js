import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

/////////
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: "Name" },
  { id: "birth", label: "Birth Date" },
  { id: "bio", label: "Bio" },
  { id: "actions", label: "Actions" },
];

//////

const AuthorsData = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://656b272edac3630cf727c285.mockapi.io/authors"
      );
      setData(res.data);
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://656b272edac3630cf727c285.mockapi.io/authors/${id}`
      );
      getData();
    } catch (error) {
      alert("Can't Delete: ", error);
    }
  };

  return (
    <div className="usercontainer">
      <div className="addusersec">
        <div>
          <b>Authors Details</b>
        </div>
        <div>
          <button className="adduserbtn">
            <Link to="/dashboard/authors/addauthor" style={{ color: "#fff" }}>
              Add Authors
            </Link>
          </button>
        </div>
      </div>
      <div className="tableform">
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: "100vh", overflowX: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{ backgroundColor: "grey" }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        backgroundColor: "black",
                        color: "#fff",
                        fontWeight: "bolder",
                        textAlign: "center",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((column, index) => {
                  return (
                    <TableRow hover key={column.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{column.name}</TableCell>
                      <TableCell>{column.birth}</TableCell>
                      <TableCell>{column.bio}</TableCell>
                      <TableCell>
                        <div className="atnbtn">
                          <button className="editbtn">
                            <Link
                              to={`/dashboard/authors/editauthor/${column.id}`}
                              style={{ color: "#fff" }}
                            >
                              <EditIcon />
                            </Link>
                          </button>
                          <button
                            className="delbtn"
                            onClick={() => handleDelete(column.id)}
                          >
                            <Link style={{ color: "#fff" }}>
                              <DeleteIcon />
                            </Link>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default AuthorsData;
