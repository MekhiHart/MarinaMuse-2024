// Component for showing track details
import React from "react"
import axios from 'axios';

export default function Track({ track, clickable }) {
    function handleAdd() {
      if (!track.explicit && clickable) axios.post("http://localhost:3001/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            uri: track.uri
          })
          .then(res => {
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err)
          }); 
      else console.log('Explicit song will not be added to queue');
    }

    return (
        <div className="d-flex m-2 align-items-center" style={{ cursor: "pointer"}} onClick={handleAdd}>
            <img src={track.albumUrl} alt={track.title} style={{height : "64px", width: "64px"}} />
            <div className="m1-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}