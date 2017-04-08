"use strict";
var childProcess = require("child_process");
var assignDeep = require("assign-deep");
var MutilsHelper = (function () {
    function MutilsHelper() {
        this._flagSpeepEnd = false;
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
    MutilsHelper.prototype.spawn = function (sCommand, aArgs, oOption) {
        oOption.stdio = 'inherit';
        childProcess.spawn(sCommand, aArgs, oOption);
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
        /*
        childProcess.execSync('echo "aabb"  ' ,{stdio:'inherit'});
        


        inquirer.prompt({
            "type": "input",
            "name": "iosDeploymentKey",
            "message": "What is your CodePush deployment key for iOS (hit <ENTER> to ignore)"
        }).then(()=>function (answer) {
            if (answer.iosDeploymentKey && answer.iosDeploymentKey == "y") {
               
            }
            else {
                process.exit(iState);
            }
        });

       */
    };
    MutilsHelper.prototype.processSleep = function (sleepTime) {
        this._flagSpeepEnd = false;
        if (sleepTime < 0) {
            this._flagSpeepEnd = true;
        }
        for (var start = +new Date; +new Date - start <= sleepTime;) {
            if (this._flagSpeepEnd) {
                break;
            }
        }
    };
    return MutilsHelper;
}());
;
module.exports = new MutilsHelper();
