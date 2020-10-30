const express = require("express");
const fs = require("fs");
var path = require("path");

// Set up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// API Routes
app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
        if(err) {
            throw err;
        }
        res.send(data);
    });
});
app.post("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.delete("/api/notes/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});