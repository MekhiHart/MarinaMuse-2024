// Component for showing track details
import { useState, React, useRef, useEffect } from "react";
import axios from "axios";
import { Slide, Fade, Zoom, TableCell, TableRow } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { IconButton } from "@mui/material";
import { CountdownModal } from "./CountdownModal";
import { Snackbar, SnackbarContent } from "@mui/material";

const Track = ({
  track,
  clickable,
  num,
  theme,
  clearCountdown,
  startCountdown,
}) => {
  const [clicked, setClicked] = useState(false);
  const [disable, setDisabled] = useState(false);
  const [fade, setSlide] = useState(true);

  let unqueueable = false;

  const countdown = useRef(30);
  const countdownRef = useRef(null);

  if (!track.filter) unqueueable = true;
  if (track.explicit) unqueueable = true;

  function handleAdd() {
    const queueRequest = () => {
      if (!track.explicit && clickable && track.filter)
        axios
          .post(process.env.REACT_APP_API_URL + "/queue/add", {
            title: track.title,
            artist: track.artist,
            albumUrl: track.albumUrl,
            albumName: track.albumName,
            songDuration: track.songDuration,
            uri: track.uri,
            explicit: track.explicit,
            spotifyUrl: track.spotifyUrl,
          })
          .then((res) => {
            console.log("data: ", res.data);
            if (res.data === "PASS") {
              // start timer
              startCountdown();

              // call clearTimer()
              clearCountdown();

              localStorage.setItem(
                "time-queued",
                JSON.stringify(new Date().getTime())
              );
              setClicked(true);
              setDisabled(true);
              setTimeout(() => {
                setClicked(false);
              }, 3000);
              setTimeout(() => {
                setSlide(false);
              }, 2700);
            } else {
              console.log("Failed to add to queue");
              setDisabled(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    };

    /* Limiting clients to queueing to 30 second intervals. Method: localStorage flags
     * Not strict. */
    const interval = 30000; // Allowed interval in milliseconds
    let lastQueued = localStorage.getItem("time-queued");
    if (!lastQueued) {
      queueRequest();
    } else {
      let time = new Date().getTime();
      let check = Math.abs(lastQueued - time);
      if (check < interval) {
        console.log("Wait to add to queue again");
      } else {
        queueRequest();
      }
    }
  }

  function secondsToMinutes(milliSeconds) {
    let seconds = parseFloat((milliSeconds / 1000) % 60).toFixed(0);
    let minutes = Math.floor(milliSeconds / 1000 / 60);
    if (seconds < 10) {
      return minutes.toString() + ":0" + seconds.toString();
    }
    return minutes.toString() + ":" + seconds.toString();
  }

  return (
    <>
      {/* <Snackbar
        open={true}
        message="hi world"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <SnackbarContent>Hello</SnackbarContent>
      </Snackbar> */}
      {/* <CountdownModal /> */}
      {clickable == false ? (
        <Fade key={num && track.title} in={true} timeout={1000}>
          <TableRow>
            <TableCell style={{ padding: "0" }}>
              <div
                style={{
                  width: "2vw",
                  textAlign: "center",
                  fontSize: 100 * 0.01 + "vw",
                  fontWeight: 500,
                  fontFamily: "DM Sans",
                  opacity: "75%",
                  color: theme.palette.text.primary,
                }}
              >
                {num + 1}
              </div>
            </TableCell>
            <TableCell
              style={{ padding: ".7vh 1.6vw", width: 100 * 0.01 + "vw" }}
              align="left"
            >
              <a
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  class="bigger"
                  src={track.albumUrl}
                  alt={track.title}
                  style={{
                    height: 100 * 0.02625 + "vw",
                    width: "100*0.02625+ 'vw'",
                  }}
                />
              </a>
            </TableCell>
            <div
              style={{
                marginLeft: -100 * 0.007 + "vw",
                alignItems: "center",
                align: "center",
              }}
            >
              <TableCell
                class="bigger2"
                style={{
                  transformOrigin: "left",
                  padding: "1.15vh .3vw",
                  width: 100 * 0.3 + "vw",
                  fontFamily: "DM Sans",
                  color: theme.palette.text.primary,
                }}
                align="left"
              >
                <div
                  style={{
                    marginBottom: -100 * 0.002 + "vh",
                    fontWeight: 700,
                    fontSize: 100 * 0.01 + "vw",
                    width: "50vw",
                  }}
                >
                  {track.title.length > 70
                    ? track.title.substring(0, 67) + "..."
                    : track.title}
                </div>
                <div
                  style={{
                    opacity: "75%",
                    fontWeight: 300,
                    color: theme.palette.text.primary,
                    fontSize: 100 * 0.008 + "vw",
                  }}
                >
                  {track.artist}
                </div>
              </TableCell>
            </div>
          </TableRow>
        </Fade>
      ) : (
        <Slide direction="down" in={true} timeout={500}>
          <TableRow>
            <div
              style={{ width: ".9vw", marginLeft: -100 * 0.007 + "vw" }}
            ></div>

            {/* image  */}

            <TableCell
              style={{ padding: ".75vh  1.1vw", width: 100 * 0.01 + "vw" }}
              align="left"
            >
              <a
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  class="bigger"
                  src={track.albumUrl}
                  alt={track.title}
                  style={{
                    height: 100 * 0.034 + "vw",
                    width: 100 * 0.034 + "vw",
                  }}
                />
              </a>
            </TableCell>

            <div
              style={{
                marginLeft: -100 * 0.007 + "vw",
                alignItems: "center",
                align: "center",
              }}
            >
              {/* Title and Artist  */}

              <TableCell
                class="bigger2"
                style={{
                  transformOrigin: "left",
                  padding: "1.3vh .6vw",
                  width: 100 * 0.3 + "vw",
                  fontFamily: "DM Sans",
                  color: theme.palette.text.primary,
                }}
                align="left"
              >
                <div
                  style={{ fontWeight: "bold", fontSize: 100 * 0.011 + "vw" }}
                >
                  {track.title.length > 35
                    ? track.title.substring(0, 32) + "..."
                    : track.title}
                </div>
                <div
                  style={{
                    opacity: "75%",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    fontSize: 100 * 0.01 + "vw",
                  }}
                >
                  {track.artist}
                </div>
              </TableCell>
            </div>

            {/* Button Add to Queue */}
            <TableCell
              style={{ padding: "0vh", paddingRight: "0vw" }}
              align="right"
            >
              {!unqueueable && clickable ? (
                <IconButton
                  onClick={handleAdd}
                  disabled={disable}
                  disableRipple
                  disableTouchRipple
                  style={{}}
                >
                  {!clicked ? (
                    !disable ? (
                      <AddCircleOutlineRoundedIcon
                        className="button"
                        sx={{ fontSize: "2.2vw" }}
                      />
                    ) : (
                      <Zoom in={disable} timeout={300}>
                        <AddCircleOutlineRoundedIcon
                          sx={{
                            color: theme.palette.common.disButton,
                            fontSize: "2.2vw",
                          }}
                        />
                      </Zoom>
                    )
                  ) : (
                    <Zoom in={fade} timeout={300}>
                      <CheckCircleRoundedIcon
                        sx={{
                          fontSize: "2.2vw",
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Zoom>
                  )}
                </IconButton>
              ) : clickable ? (
                <IconButton
                  variant="outlined"
                  disabled
                  style={{ color: theme.palette.common.disButton }}
                >
                  <AddCircleOutlineRoundedIcon
                    sx={{ fontSize: 100 * 0.022 + "vw" }}
                  />
                </IconButton>
              ) : null}
            </TableCell>
          </TableRow>
        </Slide>
      )}
    </>
  );
};
export default Track;
