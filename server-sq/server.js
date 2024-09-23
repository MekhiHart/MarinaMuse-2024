const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
const SessionManager = require("./models/SessionManager");

// Route Files
const host = require("./routes/host");
const search = require("./routes/search");
const queue = require("./routes/queue");
const playback = require("./routes/playback");
const statusRouter = require("./routes/status");

// Deployment Related Functionality
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Express Setup
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API Routes
const session = new SessionManager();
app.use("/status", statusRouter); // Ensure this matches the route file setup
app.use("/host", host(session));
app.use("/search", search(session));
app.use("/queue", queue(io, session));
app.use("/playback", playback(io, session));

// Open to port
server.listen(process.env.PORT || 3001, () => {
  console.log("Beachmuse API Active");
});

// Socket Handlers
io.on("connection", (socket) => {
  socket.emit("id", socket.id);
  console.log(socket.id + " connected");
  socket.on("disconnect", (reason) => {});
});
