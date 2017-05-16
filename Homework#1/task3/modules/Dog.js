const Animal = require('./Animal');

class Dog extends Animal {

    constructor() {
        super('dog');
        this.sound = 'Woof!'
    }
}

module.exports = Dog;