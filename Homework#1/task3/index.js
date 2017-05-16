const Bird = require('./modules/Bird');
const Dog = require('./modules/Dog');
const Cat = require('./modules/Cat');

const bird = new Bird();
const dog = new Dog();
const cat = new Cat();

console.log(bird);
console.log(dog);
console.log(cat);

console.log('\n');

bird.sayHello();
dog.sayHello();
cat.sayHello();
