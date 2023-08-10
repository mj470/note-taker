const express = require('express');
const htmlRouter = require('./routes/html-routes');
const apiRouter = require('./routes/api-routes');
const notesRouter = require('./routes/api-routes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(htmlRouter);
app.use(apiRouter);
app.use('/', notesRouter);

const server = app.listen(PORT, () => {
    console.log(`Application successfully listening to http://localhost:${PORT}`);
});

server.on('error', (error) => {
    console.error('Error starting the server:', error);
});