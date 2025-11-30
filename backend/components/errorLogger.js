const winston = require('winston');
const date = new Date();
const path = require('path')

const errorLogger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({
            filename: path.join(__dirname, `../logs/exception/${date.getDate()}${date.getUTCMonth()+1 < 10 ? "0"+(date.getUTCMonth()+1) : date.getUTCMonth()+1}${date.getFullYear()}.log`),
            level: 'error'
        })
    ]
});

// const infoLogger = winston.createLogger({
//     levels: winston.config.syslog.levels,
//     transports: [
//         new winston.transports.Console({ level: 'info' }),
//         new winston.transports.File({
//             filename: 'Logs/Info/info.log',
//             level: 'info'
//         })
//     ]
// });

// const inventoryUpdateLogger = winston.createLogger({
//     levels: winston.config.syslog.levels,
//     transports: [
//         new winston.transports.Console({ level: 'info' }),
//         new winston.transports.File({
//             filename: 'Logs/Inventory/update.log',
//             level: 'info'
//         })
//     ]
// });


module.exports = {
    errorLogger: errorLogger,
    // infoLogger: infoLogger,
    // inventoryUpdateLogger: inventoryUpdateLogger
};