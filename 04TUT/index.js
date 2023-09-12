const logEvents = require('./logEvents');

const EventEmitter = require('events');

// initialize object
const emitter = new EventEmitter();

// add listner for the log event
emitter.on('log', msg => {
    logEvents(msg);
})

setTimeout(() => {
    // Emit event
    emitter.emit('log', 'Log event emitted!');
}, 2000);
