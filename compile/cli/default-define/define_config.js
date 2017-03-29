"use strict";
var currentConfig = {
    env: null,
    project: {
        projectName: "demo"
    },
    appReact: {
        workName: "react[@config:project.projectName]"
    }
};
var MAimLocalEnv = (function () {
    function MAimLocalEnv() {
    }
    MAimLocalEnv.prototype.upConfig = function (oEnv) {
        var defineConfig = currentConfig;
        defineConfig.env = oEnv;
        return defineConfig;
    };
    return MAimLocalEnv;
}());
module.exports = new MAimLocalEnv();
