const express = require("express");
const router = express.Router();

module.exports = function (socket, session) {
  router.get("/", (req, res) => {
    res.send("queue routing check");
  });

  router.get("/next", (req, res) => {
    res.json(session.queue[0]);
  });

  router.get("/show", (req, res) => {
    res.json(session.queue);
  });

  router.post("/add", (req, res) => {
    let added = false;
    if (session.status.active) {
      added = session.addToQueue(req.body);
    }
    if (added) {
      socket.emit("queueAdd", req.body);
      res.send("PASS");
    } else {
      res.send("FAIL");
    }
  });

  // Add song to Spotify account queue periodically (Purpose: Reduces number of API requests)
  setInterval(() => {
    if (session.buffer.length < 1) {
      return;
    }
    const next = session.buffer.shift();
    session.spotify.addToQueue(next).then(
      () => {
        console.log("Next: " + next);
      },
      (err) => {
        console.log(err);
      }
    );
  }, 5000);

  // Popping Queue
  setInterval(() => {
    if (session.queue.length < 1) {
      // Empty queue
      return;
    }
    if (
      Object.keys(session.playback).length != 0 &&
      session.queue[0].uri == session.playback.item.uri
    ) {
      session.popQueue();
    }
  }, 1000);

  return router;
};
