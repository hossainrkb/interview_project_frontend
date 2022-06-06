import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../service/userService";
import React from "react";
function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      let userResponse = await getCurrentUser();
      let { data: userData } = userResponse;
      if (userData.status && userData.status == "ok") {
        setUser(userData.data);
      }
    })();
  }, []);
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
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/partner">
                Partners
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/offers"
              >
                Offers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
