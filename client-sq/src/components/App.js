import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard.js";
import Admin from "./Admin";
import Authorized from "./Authorized";
import History from "./History";
import React, { useState, useEffect, useContext, useMemo } from "react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import HowToUse from "./HowToUse";
import LandingPage from "./LandingPage";
import { createContext } from "react";
import io from "socket.io-client";
import CustomSwitch from "./CustomSwitch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeDefinition from "./theme";

export const SocketContext = createContext(io(process.env.REACT_APP_API_URL));

function App() {
  const apiSocket = useContext(SocketContext);
  const [mode, setMode] = useState(
    window.localStorage.getItem("theme") === null
      ? "light"
      : window.localStorage.getItem("theme")
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if screen is mobile size
  const theme = useMemo(() => createTheme(themeDefinition(mode)), [mode]);

  useEffect(() => {
    // Event Handlers
    apiSocket.on("id", (res) => {
      console.log("ID: ", res);
    });

    return () => {
      apiSocket.off("id");
      apiSocket.disconnect();
    };
  }, [apiSocket]);

  const handleSwitch = () => {
    window.localStorage.setItem("theme", mode === "light" ? "dark" : "light");
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update mobile status based on screen width
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: theme.palette.background.primary,
          height: "100vh",
          backgroundImage:
            mode === "light"
              ? "url(http://localhost:3000/BackgroundLight.png)"
              : "url(http://localhost:3000/BackgroundDark.png)",
        }}
      >
        <SocketContext.Provider value={apiSocket}>
          <NavBar theme={theme} mode={mode}>
            <div
              style={{
                position: "flex",
                bottom: "4.5vh",
                left: "2.645vw",
                alignItems: "center",
              }}
            >
              <div>
                {!isMobile && ( // Render feedback form only if not on mobile
                  <div
                    style={{
                      marginBottom: "1.5vh",
                      display: "table",
                      height: "4.25vh",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2vh",
                        fontWeight: 400,
                        width: "23.5vh",
                        borderRadius: 100 * 0.01 + "vh",
                        backgroundColor: theme.palette.common.border,
                        textAlign: "center",
                        display: "table-cell",
                        verticalAlign: "middle",
                      }}
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: theme.palette.text.primary,
                        }}
                        href="https://forms.gle/MUCHvseSYHmyftvz9"
                      >
                        <svg
                          style={{ marginRight: "1.75vh", marginTop: "-.25vh" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.15vh"
                          height="2.15vh"
                          viewBox="0 0 23 23"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.288 3.64672C15.5532 3.37213 15.8705 3.1531 16.2212 3.00243C16.572 2.85175 16.9493 2.77244 17.331 2.76912C17.7127 2.76581 18.0913 2.83855 18.4446 2.98311C18.798 3.12766 19.119 3.34114 19.3889 3.61108C19.6589 3.88102 19.8723 4.20202 20.0169 4.55535C20.1614 4.90868 20.2342 5.28726 20.2309 5.669C20.2276 6.05074 20.1482 6.428 19.9976 6.77876C19.8469 7.12952 19.6279 7.44676 19.3533 7.71197L15.0408 12.0245C14.5016 12.5634 13.7705 12.8662 13.0082 12.8662C12.2458 12.8662 11.5147 12.5634 10.9755 12.0245C10.7044 11.7626 10.3413 11.6177 9.96439 11.621C9.58748 11.6243 9.22694 11.7755 8.96042 12.042C8.69389 12.3085 8.54271 12.669 8.53944 13.046C8.53616 13.4229 8.68105 13.786 8.94291 14.0571C10.0212 15.1351 11.4835 15.7406 13.0082 15.7406C14.5328 15.7406 15.9951 15.1351 17.0734 14.0571L21.3859 9.74459C22.4333 8.66013 23.0129 7.20767 22.9998 5.70004C22.9867 4.1924 22.382 2.75023 21.3159 1.68414C20.2498 0.61804 18.8076 0.0133183 17.3 0.000217365C15.7923 -0.0128835 14.3399 0.566684 13.2554 1.61409L11.0992 3.77034C10.9619 3.90295 10.8523 4.06157 10.777 4.23695C10.7017 4.41233 10.662 4.60096 10.6604 4.79183C10.6587 4.9827 10.6951 5.17199 10.7674 5.34865C10.8396 5.52532 10.9464 5.68582 11.0813 5.82079C11.2163 5.95576 11.3768 6.0625 11.5535 6.13477C11.7301 6.20705 11.9194 6.24342 12.1103 6.24177C12.3012 6.24011 12.4898 6.20045 12.6652 6.12511C12.8406 6.04978 12.9992 5.94026 13.1318 5.80297L15.288 3.64672ZM8.10053 10.8342C8.63967 10.2952 9.37081 9.99246 10.1332 9.99246C10.8955 9.99246 11.6266 10.2952 12.1658 10.8342C12.2984 10.9715 12.457 11.081 12.6324 11.1564C12.8078 11.2317 12.9964 11.2714 13.1873 11.273C13.3781 11.2747 13.5674 11.2383 13.7441 11.166C13.9208 11.0937 14.0813 10.987 14.2162 10.852C14.3512 10.7171 14.4579 10.5566 14.5302 10.3799C14.6025 10.2032 14.6389 10.0139 14.6372 9.82308C14.6355 9.63221 14.5959 9.44358 14.5206 9.2682C14.4452 9.09282 14.3357 8.9342 14.1984 8.80159C13.1201 7.72363 11.6579 7.11807 10.1332 7.11807C8.60846 7.11807 7.14619 7.72363 6.06791 8.80159L1.75541 13.1141C1.20622 13.6445 0.768176 14.279 0.466824 14.9805C0.165473 15.682 0.00685154 16.4366 0.000217101 17.2C-0.00641734 17.9635 0.139067 18.7207 0.428182 19.4273C0.717298 20.134 1.14425 20.776 1.68414 21.3159C2.22402 21.8557 2.86602 22.2827 3.57267 22.5718C4.27933 22.8609 5.03648 23.0064 5.79996 22.9998C6.56344 22.9931 7.31796 22.8345 8.01948 22.5332C8.72101 22.2318 9.35549 21.7938 9.88591 21.2446L12.0422 19.0883C12.1795 18.9557 12.289 18.7971 12.3643 18.6217C12.4396 18.4464 12.4793 18.2577 12.481 18.0669C12.4826 17.876 12.4462 17.6867 12.374 17.51C12.3017 17.3334 12.1949 17.1729 12.06 17.0379C11.925 16.9029 11.7645 16.7962 11.5878 16.7239C11.4112 16.6516 11.2219 16.6153 11.031 16.6169C10.8401 16.6186 10.6515 16.6582 10.4761 16.7336C10.3008 16.8089 10.1421 16.9184 10.0095 17.0557L7.85328 19.212C7.58807 19.4866 7.27083 19.7056 6.92007 19.8563C6.56931 20.0069 6.19205 20.0862 5.81031 20.0896C5.42857 20.0929 5.04999 20.0201 4.69666 19.8756C4.34334 19.731 4.02234 19.5175 3.7524 19.2476C3.48246 18.9777 3.26898 18.6567 3.12442 18.3033C2.97986 17.95 2.90712 17.5714 2.91044 17.1897C2.91375 16.8079 2.99306 16.4307 3.14374 16.0799C3.29442 15.7292 3.51344 15.4119 3.78803 15.1467L8.10053 10.8342Z"
                            fill="#3C435C"
                          />
                        </svg>
                        Feedback form
                      </a>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex" }}>
                  <span
                    style={{
                      float: "bottom",
                      fontWeight: 500,
                      fontSize: "1.85vh",
                      marginRight: "2vh",
                      color: mode === "light" ? "#A3A8BF" : "#D6DDFF",
                    }}
                  >
                    Theme
                  </span>

                  <CustomSwitch onChange={handleSwitch}></CustomSwitch>
                </div>
              </div>
            </div>
          </NavBar>
          <LandingPage theme={theme} mode={mode} />
          <Routes>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/auth" element={<Authorized />}></Route>
            <Route
              path="/"
              element={<Dashboard theme={theme} mode={mode} />}
            ></Route>
            <Route path="/history" element={<History theme={theme} />}></Route>

            <Route
              path="/howtouse"
              element={<HowToUse theme={theme} />}
            ></Route>
          </Routes>
        </SocketContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
