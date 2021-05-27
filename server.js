const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const cors = require('cors');

const topics = ['python', 'git', 'html', 'css', 'javascript'];

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* cors */
// const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://jr-dev-flashcards.netlify.app'];
// var corsOptions = {
//   optionsSuccessStatus: 200,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));

// UTIL TO READ IN MARKDOWN FILES
const parseMdFile = require('./db/get-questions');

app.get('/api/', (req, res) => {
  res.send('JR DEV QUESTION/ANSWERS!<ul> <li>/topics to get list of available topics </li><li>/topics/{X} (where {X} is an index integer from the topic list) to get an array of question/answer objects from that topic.</li><li>/topics/{X}/{Y} (where {Y} is an index integer from the topics question/answer list) to get a single question/answer object from that topic.</li></ul>');
});

// GET ALL TOPICS
app.get('/api/topics', (req, res) => {
  res.send({ topics });
});

// GET ALL QAs FROM A TOPIC
app.get('/api/topics/:topicStr/', (req, res) => {
  try {
    if (topics.indexOf(req.params.topicStr) === -1) {
      let msg = 'topic not found';
      throw new Error(msg);
    }

    const data = fs.readFileSync(`./db/${req.params.topicStr}-quiz.md`, 'utf8').toString();
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
app.get('/api/topics/:topicStr/:qaIdx', (req, res) => {
  try {
    if (topics.indexOf(req.params.topicStr) === -1) {
      let msg = 'topic not found';
      throw new Error(msg);
    }

    const data = fs.readFileSync(`./db/${req.params.topicStr}-quiz.md`, 'utf8').toString();
    let allQA = parseMdFile(data);

    if (req.params.qaIdx >= allQA.length) {
      let msg = 'question-answer index out of range';
      throw new Error(msg);
    }

    res.status(200);
    res.send(allQA[req.params.qaIdx]);
  } catch (e) {
    res.status(400);
    console.log('**Error**:', e.stack);
    res.send(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Jr-Dev-Flashcards-API listening at ${port}`);
});
