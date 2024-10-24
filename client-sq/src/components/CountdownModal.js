// import Snackbar from "@mui/material/Snackbar";
import { Typography, Snackbar } from "@mui/material";
export function CountdownModal({ countdown }) {
  return (
    <Snackbar
      open={countdown > 0}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <div
        style={{
          display: "flex",
          width: "280px",
          height: "180px",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "15px",
          border: "3px solid #F9A8D4",
        }}
      >
        <Typography
          sx={{
            color: "#575279",
          }}
          variant="h6"
        >
          Queue Timer:
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "#818CF8",
          }}
        >
          {countdown}s
        </Typography>
      </div>
    </Snackbar>
  );
}
