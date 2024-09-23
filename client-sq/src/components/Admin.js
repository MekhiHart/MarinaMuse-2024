import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_BASE_URL}/auth&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Admin() {
  useEffect(() => {
    console.log("Client ID:", process.env.REACT_APP_CLIENT_ID);
    console.log("Base URL:", process.env.REACT_APP_BASE_URL);
    
    // Automatically redirect to the Spotify authentication page
    window.location.href = AUTH_URL;
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {/* You can remove this button since the redirect is automatic */}
    </Container>
  );
}
