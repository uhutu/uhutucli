"use strict";
var Mexport = (function () {
    function Mexport() {
    }
    Mexport.prototype.scssParse = function (oLocalConfig, oParseFile) {
        var sContent = oParseFile.fileContent;
        var regList = [];
        regList.push({ regStr: '(align-items: center;)', regReplace: '$1 display:flex;' });
        regList.push({ regStr: '(flex-direction:\\s?row;)', regReplace: '$1 display:flex;' });
        regList.push({ regStr: 'line-height:(\\s?\\d*);', regReplace: 'line-height:$1px;' });
        //regList.push({regStr:'',regReplace:''});
        return this.replaceRegex(sContent, regList);
    };
    Mexport.prototype.replaceRegex = function (sContent, regList) {
        regList.forEach(function (fItem) {
            sContent = sContent.replace(new RegExp(fItem.regStr, 'igm'), fItem.regReplace);
        });
        return sContent;
    };
    return Mexport;
}());
module.exports = new Mexport();
