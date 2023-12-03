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
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "city", label: "City" },
  { id: "zip", label: "Zip" },
  { id: "company", label: "Company" },
  { id: "actions", label: "Action" },
];

//////

const UserData = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://65536c325449cfda0f2eaa2c.mockapi.io/users"
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
        `https://65536c325449cfda0f2eaa2c.mockapi.io/users/${id}`
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
          <b>User Details</b>
        </div>
        <div>
          <button className="adduserbtn">
            <Link to="/dashboard/users/addusers" style={{ color: "#fff" }}>
              Add Users
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
                      <TableCell>{column.username}</TableCell>
                      <TableCell>{column.email}</TableCell>
                      <TableCell>{column.phone}</TableCell>
                      <TableCell>{column.address.city}</TableCell>
                      <TableCell>{column.address.zipcode}</TableCell>
                      <TableCell>{column.company.name}</TableCell>
                      <TableCell>
                        <div className="atnbtn">
                          <button className="editbtn">
                            <Link
                              to={`/dashboard/users/editusers/${column.id}`}
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

export default UserData;
