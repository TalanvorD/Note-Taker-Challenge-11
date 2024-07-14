const router = require('express').Router(); // Declaring requirements and global variables
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const dbPath = path.join(__dirname, '../db/db.json');

const readFile = () => { // Handles reading the existing db.json file and returns a stringified object
    try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
    }
    catch(err){ console.error(err); }
};

const writeFile = (data) => { // Handles writing to the db.json file
    try {
    fs.writeFileSync(dbPath, JSON.stringify(data), 'utf8');
    }
    catch(err){ console.error(err); }
};

router.get('/notes', (req, res) => { // Handles requests to directly read the db.json file and sends a stringified response
    try {
    console.info(`${req.method} request received for db.json`);
    const notes = readFile();
    res.json(notes);
    }
    catch(err){ console.error(err); }
});

router.post('/notes', (req, res) => { // Handles writing a new note to the db.json file
    try {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body; // Destructuring req.body
    const currentNotes = readFile();

    if (title && text) { // Checking to see if both title and text exist
      const newNote = {
        title: title,
        text: text,
        id: uuid.v7(),
        };
    currentNotes.push(newNote);
    writeFile(currentNotes);
    res.json(currentNotes);
        } else {
            console.log(`${req.body} is invalid.`)
        }
    }   
    catch(err){ console.error(err); }
});

router.delete('/notes/:id', (req, res) => { // Deletes a note from the db.json file
    try {
    const currentNotes = readFile();
    const updatedNotes = currentNotes.filter((currentNotes) => currentNotes.id !== req.params.id);
    writeFile(updatedNotes);
    res.json(updatedNotes);
    }
    catch(err){ console.error(err); }
});

module.exports = router;