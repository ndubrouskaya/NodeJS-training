class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log('Hello, I am ' + this.name);
    }
};

module.exports = Person;