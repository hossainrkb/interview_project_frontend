import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../service/userService";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
function Navbar() {
  const navigation = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Project Frontend
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <UserContext.Consumer>
              {({ user }) => {
                return user.type && user.type == "admin" ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/partner"
                    >
                      Partners
                    </Link>
                  </li>
                ) : (
                  ""
                );
              }}
            </UserContext.Consumer>
          </ul>
          <UserContext.Consumer>
            {({ user, handleLogout }) => {
              return (
                <>
                  <h3>Name : {user.name}</h3>
                  <button className="btn bg-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              );
            }}
          </UserContext.Consumer>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
