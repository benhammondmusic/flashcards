const fs = require('fs');

/* 
SHUFFLE ALGO
BASED ON DURSTENFELD - FISHER-YATES
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/

function shuffle(array) {
  console.log(array);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log(array);
  return array;
}

/*
READ IN MD FILE, RETURN ARRAY OF TOPIC/QUESTION/CHOICES/ANSWER OBJECTS
 */
const parseMdFile = function (data) {
  let qas = data.split('####'); // break into question-answer array
  let topic = qas.shift().trim().replace('## ', '');

  let qaObjects = [];

  // iterate QAs, split into objects
  for (let idx in qas) {
    [question, answer, ref] = qas[idx].split('?\n');

    question = question.split('. ')[1];
    console.log(question);
    answer = answer.concat();

    // remove checked answer from Q
    const choices = answer.replace('[x]', '[ ]');

    qaObjects.push({ topic, question, choices, answer });
    //   console.log(qaObjects[idx]);
  }

  shuffle(qaObjects);

  return qaObjects;
};

module.exports = parseMdFile;
