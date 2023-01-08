// Component for rendering the Queue
import React from "react"
import Track from "./Track"
import { Divider, TableContainer, Table, TableBody, tableCellClasses, TableHead, TableCell } from '@mui/material';
export default function Queue({ trackList }) {
    return (
      // Will be modified to include displaying position in queue.
      
        <TableContainer sx={{ height: "42vh", boxShadow:0,width: "auto",}} 
        style={{ overflowY: "auto", overflowX:"hidden", marginLeft: window.innerWidth*0.005}}>
          
          
          <Table
          stickyHeader
          sx={{
                [`& .${tableCellClasses.root}`]: {
                borderBottom: "none" },
                boxShadow:0,
                
            }}
          >

          
          <TableBody >
           
           
              {trackList.map((track, index) => (
                <Track 
                  track={track}
                  key={index}
                  num={index}
                  clickable={false} 
              />
              ))}
           
          </TableBody>
            </Table>
        </TableContainer>
    )
}