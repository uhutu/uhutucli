"use strict";
var M = {
    readProp: function (oObject, sProp) {
        var aStr = sProp.split('.');
        var oTag = oObject[aStr[0]];
        if (aStr.length == 1) {
            return oTag;
        }
        else {
            aStr.shift(0);
            return M.readProp(oTag, aStr.join('.'));
        }
    },
    formatReplace: function (sInput, oReplace) {
        var re = new RegExp("\\[\\[(\\w*:\\w*)\\]\\]", "gi");
        var sReturn = sInput;
        if (sInput == undefined || sInput == null) {
            return sReturn;
        }
        var aExec = sReturn.match(re);
        if (aExec != null) {
            for (var i = 0; i < aExec.length; i++) {
                var sMathText = aExec[i];
                var aSplit = sMathText.replace('[[', '').replace(']]', '')
                    .split(':');
                var sKeyName = aSplit[0];
                var sValueName = aSplit[1];
                if (oReplace[sKeyName] != undefined
                    && oReplace[sKeyName][sValueName] != undefined) {
                    var reg = new RegExp("(\\[\\[)" + aSplit[0] + ":"
                        + aSplit[1] + "(\\]\\])", "g");
                    sReturn = sReturn.replace(reg, oReplace[sKeyName][sValueName]);
                }
            }
        }
        // console.log(sReturn);
        return sReturn;
    }
};
module.exports = M;
