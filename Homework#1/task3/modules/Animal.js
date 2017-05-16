class Animal {

    constructor(type) {
        this.type = type;
        this.ears = 2;
        this.legs = 4;
        this.fly = false;
        this.sound = 'booo!';
    }

    sayHello() {
        console.log(`I can say ${this.sound}`);
    }
}

module.exports = Animal