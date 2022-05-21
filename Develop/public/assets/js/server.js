const express = require('express');
const fs = requre('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// route to GET
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parsedData = json.parse(data);
        res.json(parsedData);
    });
    res.json({ message: "success" }); // test if port is working 
});

// route to POST
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parsedData = json.parse(data);
        const newNote = req.body;
        parsedData.push(newNote);

        fs.writeFile('./db/db.json', json.stringify(parsedData), (err) => {
            if (err) throw err;
            res.json(parsedData);
            console.log('Note saved.');
        })
    });
});


// route to DELETE