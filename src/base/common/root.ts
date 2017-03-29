import Log = require("log");


let log = new Log("info");

class CommonRoot {

    logDebug(iLogCode: number, ...as) {

        log.debug(as);

    }


}



export =new CommonRoot();
