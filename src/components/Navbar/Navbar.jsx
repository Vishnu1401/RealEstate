import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [localStorage.getItem("user")]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Real Estate</h2>
      <div style={styles.navLinks}>
        {isLoggedIn ? (
          <>
            <Link to="/favourites" style={styles.navLink}>Favourites</Link>
            <button onClick={handleLogout} style={styles.navButton}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{...styles.navLink,...styles.navButton}}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "black",
    color: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    margin: "0",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#f1c40f", // Golden Yellow
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    transition: "color 0.3s ease-in-out",
  },
  navButton: {
    padding: "8px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#e74c3c", // Red
    color: "white",
    transition: "background 0.3s ease-in-out",
  },
};
