const { exec, spawn } = require('child_process');
const http = require('http');
const { stderr, stdout } = require('process');

const server = http.createServer((req, res) => {
    let reqBody = '';
    req.on('data', chunk => reqBody += chunk);
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (req.method === 'GET') {
            console.log('\nReceived heartbeat request.');
            res.end(JSON.stringify({ message: 'heartbeat' }));
            return;
        }
        let { command, sudo_pass } = JSON.parse(reqBody);
        let originalCommand = command;
        if (command.startsWith('sudo') && command.length > 5)
            command = `echo ${sudo_pass} | sudo -S -p "" ${command.substring(5)}`
        console.log(`\nRunning command "${originalCommand}" with password ${sudo_pass} ...`);
        exec(command, { cwd: process.env.HOME }, (error, stdout, stderr) => {
            let result = { command: originalCommand };
            if (stderr) result['output'] = stderr;
            else if (stdout) result['output'] = stdout;
            else result['output'] = error;
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(7236);
console.log('Run.it server running on port 7236.');
