import { bullet, exit } from './util';

// Gracefully handle uncaught exceptions
process.on('uncaughtException', err => {
    console.error('Oops! An unhandled error occurred.');
    console.error(`${bullet}If available, update to a newer version of the app.`);
    console.error(`${bullet}If not, please report this issue and provide the full log to https://anga.blue/contact`);

    if (err.stack) err.stack.split('\n').forEach(line => console.error(line));
    else console.error(String(err));

    exit();
});
