import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Real <i className="bi bi-geo-fill"></i>App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active"></li>
            <li className="nav-item">
              <NavLink to="about" className="nav-link">
                About
              </NavLink>
            </li>
            {user?.biz && (
              <li className="nav-item">
                <NavLink to="mycards" className="nav-link">
                  My Cards
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item active">
                <NavLink onClick={logout} to="signin" className="nav-link">
                  Sign out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item active">
                  <NavLink to="signin" className="nav-link">
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="signup" className="nav-link">
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="signupbiz" className="nav-link">
                    Sign up Business
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
