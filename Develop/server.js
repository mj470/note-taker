const express = require('express');
const htmlRouter = require('./routes/html-routes');
const apiRouter = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(htmlRouter);
app.use(apiRouter);


app.listen(PORT, () => {
    console.log(`Application successfully listening to http://localhost:${PORT}`);
});

