const Animal = require('./Animal');

class Bird extends Animal {

    constructor() {
        super('bird');
        this.legs = 2;
        this.fly = true;
        this.sound = 'Tsiu!'
    }
}

module.exports = Bird;