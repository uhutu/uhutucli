"use strict";
var MutilsMap = (function () {
    function MutilsMap() {
    }
    MutilsMap.prototype.initMap = function (oAttr) {
        var mMap = new Map();
        for (var k in oAttr) {
            mMap.set(k, oAttr[k]);
        }
        return mMap;
    };
    MutilsMap.prototype.formatMapbyObject = function (oObject, sPropName) {
        var oMap = new Map();
        if (oObject.hasOwnProperty(sPropName)) {
            for (var sKey in oObject[sPropName]) {
                var sVal = oObject[sPropName][sKey];
                oMap.set(sKey, sVal);
            }
        }
        return oMap;
    };
    return MutilsMap;
}());
module.exports = new MutilsMap();
