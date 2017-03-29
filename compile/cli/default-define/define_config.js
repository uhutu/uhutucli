"use strict";
var DefineConfig = (function () {
    function DefineConfig() {
        this.queues = [];
    }
    return DefineConfig;
}());
var MAimLocalEnv = (function () {
    function MAimLocalEnv() {
    }
    MAimLocalEnv.prototype.upConfig = function (oEnv) {
        var defineConfig = new DefineConfig();
        defineConfig.envs = oEnv;
        defineConfig.queues.push(new NexusQueueReact());
        return defineConfig;
    };
    return MAimLocalEnv;
}());
var NexusQueueReact = (function () {
    function NexusQueueReact() {
        this.workType = "react";
        this.workName = "react[@config:projects.projectName]";
    }
    return NexusQueueReact;
}());
module.exports = new MAimLocalEnv();
