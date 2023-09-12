// for Date & Time formatation
const { format } = require('date-fns');

// for uuid
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyy MM dd\tHH:mm:ss'));

console.log(uuid());
