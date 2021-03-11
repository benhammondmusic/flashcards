const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');

const topics = ['html', 'css', 'javascript', 'git'];

// UTIL TO READ IN MARKDOWN FILES
const parseMdFile = require('./db/get-questions');

app.get('/', (req, res) => {
  res.send('FLASH CARDS !!!');
});

app.get('/topic', (req, res) => {
  res.send({ topics });
});

app.get('/topic/:id', (req, res) => {
  try {
    const data = fs.readFileSync(`./db/${topics[req.params.id]}-quiz.md`, 'utf8').toString();
    // console.log(parseMdFile(data));
    let allQA = parseMdFile(data);
    res.send(allQA);
  } catch (e) {
    console.log('**Error**:', e.stack);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
