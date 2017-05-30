const EventEmitter = require('events');
const QUESTIONS = require('./questions');

class Server extends EventEmitter {
    constructor(client) {
        let number = 0;
        let correct = 0;
        super();
        process.nextTick(() => {
            this.emit('question', QUESTIONS[number].question);
        });

        client.on('answer', (answer) => {
            if(answer == QUESTIONS[number].answer) correct++;
            number++;
            if(number < QUESTIONS.length) {
                this.emit('question', QUESTIONS[number].question);
            } else {
                this.emit('end', `Result - ${correct}/${QUESTIONS.length}.\nCorrect answers: ${QUESTIONS.map((question, index) => ' ' + (index + 1) + ': ' + question.answer)}`)
            }
        });
    }
}

module.exports = (client) => new Server(client);