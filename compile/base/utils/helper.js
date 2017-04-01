"use strict";
var childProcess = require("child_process");
var assignDeep = require("assign-deep");
var MutilsHelper = (function () {
    function MutilsHelper() {
    }
    MutilsHelper.prototype.spawnSync = function (sCommand, aArgs, oOption) {
        oOption.stdio = 'inherit';
        var result = childProcess.spawnSync(sCommand, aArgs, oOption);
        if (result.status !== 0) {
            //process.exit(result.status);
            this.exitProcess(result.status, result.stderr ? result.stderr : 'spawn error "' + sCommand + ' "');
        }
        else {
            if (result.stdout) {
                process.stdout.write(result.stdout);
                process.stderr.write(result.stderr);
            }
        }
        //console.log(free.stdout.toString());
        //free.stdout.pipe(process.stdout);
    };
    MutilsHelper.prototype.deepAssign = function (oTarget, oSource) {
        return assignDeep({}, oTarget, oSource);
    };
    MutilsHelper.prototype.exitProcess = function (iState, oError) {
        if (!oError) {
            oError = "undefined error from exit";
        }
        //process.abort();
        //console.error(oError);
        process.stderr.write(oError);
        this.processSleep(3000);
        process.exit(iState);
    };
    MutilsHelper.prototype.processSleep = function (sleepTime) {
        for (var start = +new Date; +new Date - start <= sleepTime;) { }
    };
    return MutilsHelper;
}());
;
module.exports = new MutilsHelper();
