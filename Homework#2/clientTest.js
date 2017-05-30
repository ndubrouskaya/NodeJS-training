const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);

let timerId;

function startTimer() {
    let promise = new Promise((resolve) => {
        let i = 1;
        timerId = setInterval(() => {
            i === 30 ? resolve() : i++;
        }, 1000);
    });
    promise.then(() => {
        process.stdout.write('\n');
        rl.emit('line');
    });
}

server.on('question', (question) => {
    rl.setPrompt(question);
    rl.prompt();

    process.stdout.write('\n\> ');

    startTimer();
});

server.on('end', (result) => {
    process.stdout.write(result);
    rl.close();
});


rl.on('line', (answer) => {
    clearInterval(timerId);
    client.emit('answer', answer);
});

rl.on('close', () => {
    process.exit();
});
