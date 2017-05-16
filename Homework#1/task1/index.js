const cliArgs = process.argv.slice(2);

if(cliArgs.length) {
    if(cliArgs.some(arg => typeof +arg != 'number' || Number.isNaN(+arg))) {
        console.log('Command-line arguments should be numbers!!')
    } else {
        const sum = cliArgs.map(arg => parseInt(arg)).reduce((a, b) => a + b);
        console.log('Sum of cli arguments: ' + sum);
    }
} else {
    console.log('Pass one or more numbers as cli parameters, e.g. node index.js 1 5 -6');
}
