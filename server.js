const express = require("express");
const fs = require("fs");
var path = require("path");

let lastNoteId;

// Set up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Express to serve static files
app.use(express.static('public'));

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
    // Read in JSON DB to see what the last note ID is
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json"), 'utf8'));
    
    // Assign the ID of the previous note
    lastNoteId = db[db.length -1].id;

    // If there was no previous note or ID, assign an ID of 0.
    if (isNaN(lastNoteId)) {
        lastNoteId = 0;
    }

    lastNoteId++;
    
    // Add the new ID to new note object
    req.body.id = lastNoteId;

    db.push(req.body);

    // Update the db JSON file with the new note
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(db), (err) => {
      if (err) throw err;
      console.log(`The note ${req.body.title} was added to the db!`);
    });
    // Send the new note back to the client in the response
    res.send(req.body);
});
// app.delete("/api/notes/:id", function(req, res) {
//     res.sendFile(path.join(__dirname, "public/notes.html"));
// });

// Default Route
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});