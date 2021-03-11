const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');

const topics = ['html', 'css', 'javascript', 'git'];

// UTIL TO READ IN MARKDOWN FILES
const parseMdFile = require('./db/get-questions');

app.get('/', (req, res) => {
  res.send('JR DEV QUESTION/ANSWERS!<ul> <li>/topic to get list of available topics </li><li>/topic/{X} (where {X} is an index integer from the topic list) to get an array of question/answer objects from that topic.</li><li>/topic/{X}/{Y} (where {Y} is an index integer from the topics question/answer list) to get a single question/answer object from that topic.</li></ul>');
});

// GET ALL TOPICS
app.get('/topics', (req, res) => {
  res.send({ topics });
});

// GET ALL QAs FROM A TOPIC
app.get('/topics/:topicIdx/', (req, res) => {
  try {
    if (req.params.topicIdx >= topics.length) {
      let msg = 'topic index out of range';
      // console.log(msg);
      throw new Error(msg);
    }
    const data = fs.readFileSync(`./db/${topics[req.params.topicIdx]}-quiz.md`, 'utf8').toString();
    // console.log(parseMdFile(data));
    let allQA = parseMdFile(data);
    res.status(200);
    res.send(allQA);
  } catch (e) {
    res.status(400);
    console.log('**Error**:', e.stack);
    res.send(e.stack);
  }
});

// GET ONE QA FROM A TOPIC
app.get('/topics/:topicIdx/:qaIdx', (req, res) => {
  try {
    const data = fs.readFileSync(`./db/${topics[req.params.topicIdx]}-quiz.md`, 'utf8').toString();
    // console.log(parseMdFile(data));
    let allQA = parseMdFile(data);
    res.send(allQA[req.params.qaIdx]);
  } catch (e) {
    console.log('**Error**:', e.stack);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
