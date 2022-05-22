// dependancies 
const express = require('express');
const fs = require('fs');
const path = require('path');
let database = require('./Develop/db/db.json'); // database assignment
// console.log(database);

// app and port variables
const app = express();
const PORT = process.env.PORT || 3000;

// 
app.use(express.static('Develop/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route to get notes html 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});

// route to grab database content for GET and POST
app.route('/api/notes')
    .get(function (req, res) {
        res.json(database)
    })

    //Route post to our databse when we click the save btn
    .post(function (req, res) {
        let newJSON = (path.join(__dirname, "/Develop/db/db.json"));
        let newNote = req.body;

        let notesId = 0;
        for (let i = 0; i < database.length; i++) { // for loop to make sure the id of the notes go up by 1 each time a new note is created
            let note = database[i]; 
            if (note.id > notesId) {
                notesId = note.id
            }
        }
        newNote.id = notesId + 1;
        database.push(newNote) // adds new note to database

        // writes new note to database file
        fs.writeFile(newJSON, JSON.stringify(database), (err) => {

            if (err) throw err; 
            console.log("New notes saved");
        });
        
        res.json(newNote); // displays new notes on page

    })

// route to DELETE
app.delete('/api/notes/:id', (req, res) => {

    let newJSON = (path.join(__dirname, "/Develop/db/db.json"));
    let newDatabase = [];

    //add all notes that don't have the same id
    database.forEach(note => {
        if (parseInt(note.id) !== parseInt(req.params.id)) {
            newDatabase.push(note);
        }
    });

    database = newDatabase; // assign database to a new empty database after deleting note(s)

    fs.writeFile(newJSON, JSON.stringify(newDatabase), (err) => {
        if (err) throw err;
    });

    res.json(database);

})

app.get("*", (req, res) => { // makes any url path that isn't /notes go back to the home page
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));