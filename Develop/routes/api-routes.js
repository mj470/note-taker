const express = require('express'); 
const path = require('path');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// we are going to need another file that sends to the screen, a writeFile or sendFile 
router.get('/api/notes', async (req, res) => {
    const dbJSON = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(dbJSON);
});

router.post('/api/notes', (req, res) => {
    const dbJSON = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJSON.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dbJSON));
    res.json(dbJSON);
});

router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('./db/db.json', 'utf8');
    const datadbJSON = JSON.parse(data);
    const newdbJSON = datadbJSON.filter((note) => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(newdbJSON));
res.json(newdbJSON);
});


module.exports = router;