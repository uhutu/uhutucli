"use strict";
import childProcess = require("child_process");
import assignDeep = require("assign-deep");


interface IHelperSpawSyncOption{
    cwd:string
    stdio?:string
}

var M = {
    spawnSync: function (sCommand:string, aArgs:string[], oOption:IHelperSpawSyncOption) {
        oOption.stdio = 'inherit';
        var free = childProcess.spawnSync(sCommand, aArgs, oOption);
        //console.log(free.stdout.toString());
        //free.stdout.pipe(process.stdout);
    },
    deepAssign: function (oTarget, oSource) {
        return assignDeep({},oTarget, oSource);
    }
};
export=M;
