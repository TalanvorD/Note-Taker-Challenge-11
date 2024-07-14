const express = require('express'); // Declaring requirements and global variables
const app = express();
const path = require('path');
const apiRoute = require('./routes/index.js');

const PORT = process.env.PORT || 3001; // Using port 3001

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public')); // Our static files

// Not necessarily needed if using a * catchall to reroute to index.html instead of a 404?
// GET Route for index.html
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => // GET Route for notes.html
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.use('/api', apiRoute); // GET Route for API requests

app.get('*', (req, res) => // Wildcard route, reroutes to the index.html. Normally this would be a catchall for a 404 but the assignment specifically states to direct to index.html
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, function (err) {
    if (err) console.error(err);
  console.log(`App listening at http://localhost:${PORT}`)
});