const { exec, spawn } = require('child_process');
const http = require('http');
const { stderr, stdout } = require('process');

const sudoPass = '4710';

const server = http.createServer((req, res) => {
    let reqBody = '';
    req.on('data', chunk => reqBody += chunk);
    req.on('end', () => {
        let command = JSON.parse(reqBody).command;
        if (command.startsWith('sudo') && command.length > 5)
            command = `echo ${sudoPass} | sudo -S -p "" ${command.substring(5)}`
        console.log(`Running command "${command}" ...`);
        exec(command, { cwd: process.env.HOME }, (error, stdout, stderr) => {
            let result = { command };
            if (stderr) result['output'] = stderr;
            else if (stdout) result['output'] = stdout;
            else result['output'] = error;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(8000);
