// index.js
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

let users = [];

// Serve frontend.html at /frontend
app.get("/frontend", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend.html"));
});

// GET all users
app.get("/users", (req, res) => {
  res.send("Hello users: " + users.join(", "));
});

// POST add a new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send("Missing name in req.body");
    return;
  }
  users.push(name);
  res.send(`User ${name} added successfully`);
});

// TODO: DELETE a user (Try to recycle as much code from app.post as possible!)
app.delete("/users", (req, res) => {
  const { name } = req.body;
    if (!name) {
      res.status(400).send("Missing name in req.body");
      return;
    }

    const indexOfName = users.indexOf(name);
    if (indexOfName == -1) {
      res.status(404).send('User ${name} not found');
      return;
    }

    users.splice(name);
    res.send(`User ${name} removed successfully`);
});

app.listen(port, () => {
  console.log(`Users app listening at http://localhost:${port}`);
  console.log(`Frontend available at http://localhost:${port}/frontend`);
});
