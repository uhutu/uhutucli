"use strict";
var SimpleReact = (function () {
    function SimpleReact() {
    }
    SimpleReact.prototype.exec = function (oLocalConfig, oPlugin, oSet) {
        return true;
    };
    return SimpleReact;
}());
module.exports = new SimpleReact();
