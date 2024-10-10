import React, { useState, useEffect } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./NavBar.css"; // Import the CSS file for styling

const NavBar = ({ children, theme, mode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Function to handle search
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/search/tracks`,
        { searchString: searchQuery }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Search error: ", error);
    }
  };

  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <HomeRoundedIcon style={{ fontSize: "2.75vh" }} />,
    },
    {
      path: "/history",
      name: "History",
      icon: <AccessTimeFilledRoundedIcon style={{ fontSize: "2.75vh" }} />,
    },
    {
      path: "/howtouse",
      name: "How to use",
      icon: <HelpCenterRoundedIcon style={{ fontSize: "2.75vh" }} />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.secondary,
        borderRight: ".25vh solid " + theme.palette.common.border,
        width: "100vw",
        height: "7vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10vw",
      }}
    >
      {/* Logo */}
      <img
        style={{
          transition: "transform .2s",
          width: 52 * 0.24 + "vw",
          height: 52 * 0.152 + "vw",
          marginRight: "5vh",
        }}
        src={mode === "light" ? "logo.png" : "logoDark.png"}
        alt="Logo"
      />

      {/* Navigation Links */}
      {menuItem.map((item, index) => (
        <NavLink
          style={{
            marginLeft: ".65vw",
            marginBottom: "1vh",
            marginTop: "1vh",
            width: "12.35vw",
            borderRadius: ".75vh",
            padding: "1.1vh .7vw",
            height: "5vh",
            display: "flex",
            alignItems: "center",
          }}
          to={item.path}
          key={index}
          className={mode === "light" ? "link" : "link1"}
          activeClassName="active"
        >
          {item.icon}
          {/* Conditionally render text based on screen size */}
          {!isMobile && (
            <div
              className="nav-item-title"
              style={{
                fontSize: "1.85vh",
                fontWeight: 500,
                marginLeft: ".1vw",
              }}
            >
              {item.name}
            </div>
          )}
        </NavLink>
      ))}

      <main>{children}</main>
    </div>
  );
};

export default NavBar;
