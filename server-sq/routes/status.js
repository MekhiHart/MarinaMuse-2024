const express = require("express");
const router = express.Router();

// Define the /status route
router.get('/', (req, res) => {
  res.json({ message: "Server is up and running!" });
});

module.exports = router;
