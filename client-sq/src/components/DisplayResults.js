// Component for rendering the Queue
import React from "react";
import Track from "./Track";
// import {Container} from 'react-bootstrap';
import {
  TableContainer,
  Table,
  TableBody,
  tableCellClasses,
} from "@mui/material";
const DisplayResults = ({
  trackList,
  theme,
  clearCountdown,
  startCountdown,
  countdown,
}) => {
  return (
    <TableContainer
      style={{
        height: "65vh",
        marginTop: window.innerHeight * 0.02,
        overflowY: "auto",
        width: "auto",
        overflowX: "hidden",
      }}
    >
      <Table
        stickyHeader
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
        aria-label="sticky table"
      >
        <TableBody style={{}}>
          {trackList.map((track) => (
            <Track
              track={track}
              key={track.uri}
              clickable={true}
              albumName={track.albumName}
              duration={track.songDuration}
              theme={theme}
              clearCountdown={clearCountdown}
              startCountdown={startCountdown}
              countdown={countdown}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DisplayResults;
