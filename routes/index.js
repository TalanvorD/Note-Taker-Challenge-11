const router = require('express').Router(); // Declaring requirements and global variables
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const dbPath = path.join(__dirname, '../db/db.json');

const readFile = () => {
    try { // Handles reading the existing db.json file and returns a stringified object
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
    }
    catch(err){ console.error(err); }
};

const writeFile = (data) => {
    try { // Handles writing to the db.json file
    fs.writeFileSync(dbPath, JSON.stringify(data), 'utf8');
    }
    catch(err){ console.error(err); }
};

router.get('/notes', (req, res) => {
    try { // Handles requests to directly read the db.json file and sends a stringified response
    console.info(`${req.method} request received get db.json`);
    const notes = readFile();
    res.json(notes);
    }
    catch(err){ console.error(err); }
});

router.post('/notes', (req, res) => {
    try { // Handles writing a new note to the db.json file
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body[0]; // Destructuring assignment for the items in req.body
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
        };
    }   
    catch(err){ console.error(err); }
});

module.exports = router;