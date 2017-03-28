"use strict";
import childProcess = require("child_process");
import assignDeep = require("assign-deep");
var M = {
    spawnSync: function (sCommand, aArgs, oOption) {
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
