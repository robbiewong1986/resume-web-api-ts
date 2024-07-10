var log4js = require('log4js'); // include log4js

//const dateString = require('../util').getDateString(new Date())

log4js.configure({ // configure to use all types in different files.

    appenders: {
        // fileLog: { type: 'file', filename: `./logs/${dateString}_debug.log` },
        console: { type: 'console' },
        everything: {
            type: 'dateFile',
            pattern: "yyyy-MM-dd",
            keepFileExt: true,  //
            maxLogSize: 1024 * 1024 * 1, //1024 * 1024 * 1 = 1M
            backups: 2,     //
            alwaysIncludePattern: true,     //
            numBackups: 3, //
            filename: 'log/run.log',
        },
        errFile: {
            type: 'dateFile',
            pattern: "yyyy-MM-dd",
            filename: 'log/error.log',
        },
        err : {
            type: "logLevelFilter",
            level: "ERROR",
            appender: "errFile",
        }

        },
    categories: {
        //file: { appenders: ['everything' , 'err'], level: 'error' },
        another: { appenders: ['console'], level: 'trace' },
        default: { appenders: ['console', 'everything' , 'err'], level: 'ALL' }
    }
}
    

    // appenders: [
    //     {   type: 'file',
    //         filename: "/logs/error.log", // specify the path where u want logs folder error.log
    //         category: 'error',
    //         maxLogSize: 20480,
    //         backups: 10
    //     },
    //     {   type: "file",
    //         filename: "/logs/info.log", // specify the path where u want logs folder info.log
    //         category: 'info',
    //         maxLogSize: 20480,
    //         backups: 10
    //     },
    //     {   type: 'file',
    //         filename: "/logs/debug.log", // specify the path where u want logs folder debug.log
    //         category: 'debug',
    //         maxLogSize: 20480,
    //         backups: 10
    //     }
    // ]
);

const Log4js ={
   logInfo : (log :string) => {    
        log4js.getLogger().info(log)
    },
    logDebug : (log:string) => {    
        log4js.getLogger().debug(log)
    },     
    logError : (log:string) => {    
        log4js.getLogger().error(log)
    }
}
export default Log4js

// export const setLogLevel = (level :string) => {
//     log4js.getLogger().level = level    
// }

// export const logInfo = (log :string) => {    
//     log4js.getLogger().info(log)
// }

// export const logDebug = (log:string) => {    
//     log4js.getLogger().debug(log)
// }
 
// export const logError = (log:string) => {    
//     log4js.getLogger().error(log)
// }
