const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');

const app = express();
const port = 3001;

const { getRandom, saveFact, deleteFact } = require('./controllers/mainController');

app.use(json());
app.use(cors());


app.get('/api/random', getRandom);
app.post('/api/save', saveFact);
app.delete('/api/delete/:id', deleteFact);


app.listen(port, () => console.log(`Listening on port: ${port}`));