const router = require('express').Router(); // Declaring requirements and global variables
const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, '../db/db.json');

const readFile = () => { // Handles reading the db.json file and returns a stringified object
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

router.get('/notes', (req, res) => { // Handles requests to directly read the db.json file and sends a stringified response
    const notes = readFile();
    res.json(notes);
});

module.exports = router;