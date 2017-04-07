"use strict";
import childProcess = require("child_process");
import assignDeep = require("assign-deep");
import inquirer = require('inquirer');


interface IHelperSpawSyncOption {
    cwd: string
    stdio?: string
}

class MutilsHelper {
    spawnSync(sCommand: string, aArgs: string[], oOption: IHelperSpawSyncOption) {
        oOption.stdio = 'inherit';
        var result = childProcess.spawnSync(sCommand, aArgs, oOption);


        if (result.status !== 0) {

            //process.exit(result.status);

            this.exitProcess(result.status, result.stderr ? result.stderr : 'spawn error "' + sCommand + ' "');
        } else {
            if (result.stdout) {
                process.stdout.write(result.stdout);
                process.stderr.write(result.stderr);
            }

        }
        //console.log(free.stdout.toString());
        //free.stdout.pipe(process.stdout);
    }
    deepAssign(oTarget, oSource) {
        return assignDeep({}, oTarget, oSource);
    }

    exitProcess(iState: number, oError: string | Buffer) {

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


    }

    processSleep(sleepTime: number) {
        this._flagSpeepEnd=false;
        if(sleepTime<0){
            this._flagSpeepEnd=true;
        }
        for (var start = +new Date; +new Date - start <= sleepTime;) { if(this._flagSpeepEnd){break;}}
    }

    _flagSpeepEnd=false

};



export =new MutilsHelper();
