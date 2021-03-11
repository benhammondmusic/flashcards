const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

const quizTopics = ['html', 'css', 'javascript', 'git'];

// UTIL TO READ IN MARKDOWN FILES
const parseMdFile = require('./db/get-questions');

app.get('/', (req, res) => {
  res.send('FLASH CARDS !!!');
});

app.get('/quiz/:id', (req, res) => {
  try {
    const data = fs.readFileSync(`./db/${quizTopics[req.params.id]}-quiz.md`, 'utf8').toString();
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
