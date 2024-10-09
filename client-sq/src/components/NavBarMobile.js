// Component for rendering the Queue
import React, { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import "./NavBar.css"; // Import the CSS file for styling

const NavBar = ({ children, theme, mode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = async () => {
    if (!searchQuery) return;
    // Example search function; you can modify this to suit your requirements
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/search/tracks`,
        { searchString: searchQuery }
      );
      console.log(response.data); // Process search results as needed
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

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.secondary,
        borderRight: ".25vh solid " + theme.palette.common.border,
        width: "100vw",
        height: "7vh",
        display: "flex",
        alignItems: "center", // Vertically align items to the center
        justifyContent: "space-between", // Distribute items evenly with space between
        padding: "0 10vw", // Adjust padding as needed
        border: "2px solid red",
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
          <div
            className="nav-item-title" // Make sure to add this class
            style={{
              fontSize: "1.85vh",
              fontWeight: 500,
              marginLeft: ".1vw",
            }}
          >
            {item.name}
          </div>
        </NavLink>
      ))}

      <main>{children}</main>
    </div>
  );
};

export default NavBar;
