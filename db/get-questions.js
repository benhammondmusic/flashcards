const fs = require('fs');

/* 
READ IN MD FILE, RETURN ARRAY OF TPOIC/QUESTION/CHOICES/ANSWER OBJECTS
 */
const parseMdFile = function (data) {
  let qas = data.split('####'); // break into question-answer array
  let topic = qas.shift().trim().replace('## ', '');

  let qaObjects = [];

  // iterate QAs, split into objects
  for (let idx in qas) {
    [question, answer, ref] = qas[idx].split('?\n');

    question = question.split('. ')[1];

    answer = answer.concat();

    // remove checked answer from Q
    const choices = answer.replace('[x]', '[ ]');

    qaObjects.push({ topic, question, choices, answer });
    //   console.log(qaObjects[idx]);
  }

  return qaObjects;
};

module.exports = parseMdFile;
