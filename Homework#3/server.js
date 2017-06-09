const fs = require('fs');
const os = require('os');
const url = require('url');

const server = require('http').createServer();


server.on('request', (request, response) => {
    let promise = new Promise((resolve, reject) => {
        const parsedUrl = url.parse(request.url, true);
        const query = parsedUrl.query;

        const FILE_PATH = 'test.txt';

        if(parsedUrl.pathname === '/') {
            fs.readFile(FILE_PATH, (err, data) => {
                if (err) throw err;
                return resolve(data);
            });
        } else if(parsedUrl.pathname === '/find') {
            fs.readFile(FILE_PATH, (err, data) => {
                if (err) throw err;
                const lines = data.toString('utf8').split("\n"); // convert data to a string
                return findWord(lines, query, resolve);
            });
        } else if(parsedUrl.pathname === '/show') {
            fs.readFile(FILE_PATH, (err, data) => {
                if (err) throw err;
                const lines = data.toString('utf8').split("\n");
                return showLines(lines, query, resolve, reject);
            });
        } else if(request.url === '/os') {
            return resolve(`CPU: ${JSON.stringify(os.cpus())}\nFree Memory: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} Gb`);
        } else {
            return reject('404. Not found.\n');
        }
    });
    promise
        .then(data => {
            response.write(data);
        }, message => {
            message && response.write(message);
            response.write('Try next urls:\n/\n/find?str=some_word\n/show?startLine=1&startColumn=0\nshow?startLine=1&startColumn=0&endLine=11&endColumn=4\n/os');
        })
        .then(() => {
            response.end();
        });
});

server.listen(8000);

console.log("Server running at http://localhost:8000\nCTRL + C to shutdown");

function findWord(lines, query, resolve) {
    const regex = new RegExp('\\s' + query.str + '\\s');
    let found = '';
    lines.forEach((line, index) => {
        if(line.match(regex)) {
            let column = line.match(regex).index;
            found = found.concat(`Word '${query.str}' was found on - ${index + 1}:${column + 1}\n`);
        }
    });
    return resolve(found ? found : `Word '${query.str}' was not found`);
}

function showLines(lines, query, resolve, reject) {
    const startLine = query.startLine;
    const startColumn = query.startColumn;
    const endLine = query.endLine || lines.length;
    const endColumn = query.endColumn;

    if(startLine >= 1 && startLine <= lines.length && endLine >= startLine && endLine <= lines.length) {
        let result = lines.slice(startLine - 1, endLine).map((line, index, arr) => {
            if(arr.length === 1) {
                return line.slice(startColumn, endColumn);
            } else if(index === 0) {
                return line.slice(startColumn);
            } else if(index === arr.length - 1) {
                return line.slice(null, endColumn);
            } else {
                return line;
            }
        });
        return resolve(Buffer.from(result.join('\n')));
    } else {
        return reject(`Test file has ${lines.length} lines. Please, enter correct line numbers (1-${lines.length})!\n`);
    }
}