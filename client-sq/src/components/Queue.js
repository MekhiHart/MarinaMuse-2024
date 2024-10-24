// Component for rendering the Queue
import React from "react";
import Track from "./Track";
import {
  TableContainer,
  Table,
  TableBody,
  tableCellClasses,
  TableCell,
} from "@mui/material";

const Queue = ({ trackList, theme, clearCountdown, startCountdown }) => {
  return (
    // Will be modified to include displaying position in queue.

    <TableContainer
      sx={{ height: "40.5vh", boxShadow: 0, width: "auto" }}
      style={{ overflowY: "auto", overflowX: "hidden" }}
    >
      <Table
        stickyHeader
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
          boxShadow: 0,
        }}
      >
        <TableBody>
          {trackList.map((track, index) => (
            <Track
              track={track}
              key={index}
              num={index}
              clickable={false}
              theme={theme}
              clearCountdown={clearCountdown}
              startCountdown={startCountdown}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Queue;
