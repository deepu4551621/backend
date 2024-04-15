import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookSkull } from "react-icons/fa6";
import Cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/userSlice";
const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const handleLogout = () => {
    dispatch(logout());
    Cookie.remove("Jalebi");
  };
  return (
    <nav className="navbar">
      <Link to="/profile" className="logo">
        <FaBookSkull size={30} />
        <span>E-Learning Platform</span>
      </Link>
      <ul>
        {!pathname === "/" && <Link to="/">Home</Link>}

        {isAuthenticated ? (
          <>
            {pathname === "/profile" ? (
              <Link to="/">Home</Link>
            ) : (
              <Link to="/profile">Profile</Link>
            )}
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </ul>
    </nav>
  );
};
const styles = {
  modal: {
    backgroundColor: "#eee4",
    color: "#fff",
    width: 200,
    height: 50,
    borderRadius: 20,
    position: "absolute",
    left: 10,
    top: 60,
    textAlign: "center",
  },
};
export default Navbar;
