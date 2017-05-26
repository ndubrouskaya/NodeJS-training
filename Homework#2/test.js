const readline = require('readline');
const QUESTIONS = require('./questions');

const rl = readline.createInterface(
    process.stdin,
    process.stdout
);

rl.on('close', () => {
    process.exit();
});

let correct = 0;
let timerId;

function ask(number) {
    rl.setPrompt(`${QUESTIONS[number].question}\n`);
    rl.prompt();
    process.stdout.write('\> ');
    startTimer();
}

function startTimer() {
    let i = 1;
    timerId = setInterval(() => {
        if (i == 10) stopTimer(); // 30
        i++;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    console.log('Time is out!')
    rl.emit('line');
}

function test() {
    let i = 0;
    ask(i);
    rl.on('line', (answer) => {
        clearInterval(timerId);
        if(answer == QUESTIONS[i].answer) correct++;
        i++;
        if(i < QUESTIONS.length) {
            ask(i);
        } else {
            console.log(`Result - ${correct}/${QUESTIONS.length}`);
            rl.close();
        }
    });
}

module.exports = test;
