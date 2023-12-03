import React, { useState } from "react";
import "./styles.css";
import AppsIcon from "@mui/icons-material/Apps";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./users";
import BooksData from "./books/books";
import AuthorsData from "./authors/authors";
import Dashboard from "./dashboard";
import AddUser from "./adduser";
import EditUser from "./edituser";
import AddBooks from "./books/addbooks";
import EditBooks from "./books/editbooks";
import AddAuthor from "./authors/addauthors";
import EditAuthor from "./authors/editauthors";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(true);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <div className="navbar">
        <div className="logoSec">
          <div>
            <button
              className="toggle"
              style={{ backgroundColor: "inherit" }}
              onClick={toggleSidebar}
            >
              <AppsIcon />
            </button>
          </div>
          <Link to="/dashboard" style={{ color: "#000" }}>
            Dashboard
          </Link>
        </div>
        <div>
          <button className="logout">Logout</button>
        </div>
      </div>
      <div className="sidesandcenter">
        {sidebar && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}
        <div style={{ marginTop: "30px" }}>
          <Routes>
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="addusers" element={<AddUser />} />
                <Route path="editusers/:userId" element={<EditUser />} />
              </Route>
              <Route path="books">
                <Route index element={<BooksData />} />
                <Route path="addbooks" element={<AddBooks />} />
                <Route path="editbooks/:bookId" element={<EditBooks />} />
              </Route>
              <Route path="authors">
                <Route index element={<AuthorsData />} />
                <Route path="addauthor" element={<AddAuthor />} />
                <Route path="editauthor/:userId" element={<EditAuthor />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard" style={{ color: "#000" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/users" style={{ color: "#000" }}>
            Users
          </Link>
        </li>
        <li>
          <Link to="/dashboard/books" style={{ color: "#000" }}>
            Books
          </Link>
        </li>
        <li>
          <Link to="/dashboard/authors" style={{ color: "#000" }}>
            Authors
          </Link>
        </li>
      </ul>
    </div>
  );
};
