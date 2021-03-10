const fs = require('fs');
let data;
try {
  data = fs.readFileSync('./css-quiz.md', 'utf8').toString();
} catch (e) {
  console.log('Error:', e.stack);
}

let qas = data.split('####'); // break into question-answer array
let topic = qas.shift(); // remove heading

let qaObjects = [];

// iterate QAs, split into objects
for (let idx in qas) {
  [q, a, ref] = qas[idx].split('?\n');
  //   console.log('*Q*', q, '\n****A****', a);
  qaObjects.push({ question: q, answer: a });
  if (!a) console.log(qaObjects[idx]);
}
