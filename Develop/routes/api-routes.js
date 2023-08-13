const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', async (req, res) => {
    try {
        const dbJSON = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        res.json(dbJSON);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching notes.' });
    }
});

router.post('/api/notes', (req, res) => {
    try {
        const dbJSON = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };
        dbJSON.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(dbJSON));
        res.json(dbJSON);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the note.' });
    }
});

router.delete('/api/notes/:id', (req, res) => {
    try {
        let noteData = fs.readFileSync('./db/db.json', 'utf8');
        const datadbJSON = JSON.parse(noteData);
        const newdbJSON = datadbJSON.filter((note) => {
            return note.id != req.params.id;
        });
        fs.writeFileSync('./db/db.json', JSON.stringify(newdbJSON));
        res.json(newdbJSON);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the note.' });
    }
});

module.exports = router;
