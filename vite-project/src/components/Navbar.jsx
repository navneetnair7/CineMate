import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.07), transparent)",
    padding: "40px 10px 0px 40px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    fontSize: "24px", 
  };

  const navbarLeftStyle = {
    display: "flex",
    alignItems: "center",
  };

  const navbarLogoStyle = {
    width: "120px",
    marginRight: "20px",
  };

  const navbarLinksStyle = {
    display: "flex",
    listStyle: "none",
    gap: "20px", 
    margin: 0,
    padding: 0,
  };

  const navbarRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "0px 80px 0px 0px",
  };

  const navbarProfileStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const navbarButtonStyle = {
    backgroundColor: "transparent", 
    color: "white", 
    border: "2px solid red", 
    padding: "5px 15px", 
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem", 
    fontWeight: 600,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "15vh", backgroundColor: "#181818" }}>
      <div style={navbarStyle}>
        <div style={navbarLeftStyle}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            style={navbarLogoStyle}
          />
          <ul style={navbarLinksStyle}>
            <li style={{
              fontSize: "1.6rem",
              fontWeight: "500",
              fontFamily: "'Poppins', sans-serif",
              margin: "0",
              color: "white",
            }}>Home</li>
            <li style={{
              fontSize: "1.6rem",
              fontWeight: "500",
              fontFamily: "'Poppins', sans-serif",
              margin: "0",
              color: "white",
            }}>New & Popular</li>
          </ul>
        </div>
        <div style={navbarRightStyle}>
          <div>
            <i className="fas fa-search" style={{ fontSize: "20px", cursor: "pointer" }}></i>
          </div>
          <div style={navbarProfileStyle}>
            <span style={{
              fontSize: "1.5rem",
              fontWeight: "300",
              fontFamily: "'Poppins', sans-serif",
              margin: "0",
              color: "white",
            }} >Hello, Navneet!</span>
            <Link to="/"><button style={navbarButtonStyle}>Log Out</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
