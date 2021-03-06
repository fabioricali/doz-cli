const {spawn} = require('child_process');
const {TESTING} = require('../src/constants');
const fs = require('fs-extra');

describe('doz cli', function () {

    this.timeout(5000);

    beforeEach(function () {
        fs.removeSync('test/cwd/my-app');
    });

    describe('app', function () {

        it('create', function (done) {
            const cli = spawn('node', [
                'src/cli.js',
                'app',
                'my-app',
                TESTING
            ]);

            cli.stdout.on('data', data => {
                console.log(`${data}`);
            });

            cli.stderr.on('data', data => {
                console.error(`${data}`);
                done(`${data}`);
            });

            cli.on('close', code => {
                console.log(`child process exited with code ${code}`);
                done()
            });
        });

        it('app name empty', function (done) {

            const cli = spawn('node', [
                'src/cli.js',
                'app',
                '',
                TESTING
            ]);

            cli.stdout.on('data', data => {
                console.log(`${data}`);
            });

            cli.stderr.on('data', data => {
                console.error(`${data}`);
                done();
            });

        });

    });

});