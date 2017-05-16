const Animal = require('./Animal');

class Cat extends Animal {

    constructor() {
        super('cat');
        this.sound = 'Meow!'
    }
}

module.exports = Cat;