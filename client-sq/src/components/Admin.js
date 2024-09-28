import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=" +
  process.env.REACT_APP_CLIENT_ID +
  "&response_type=code&redirect_uri=" +
  window.location.origin +
  "/auth&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Admin() {
  // console.log("client ID: ", process.env.REACT_APP_CLIENT_ID);
  // console.log("baseURL: ", window.location.origin);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login to Spotify
      </a>
    </Container>
  );
}
