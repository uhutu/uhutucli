"use strict";
var fs = require("fs");
var path = require("path");
var utilsString = require("./string");
var glob = require("glob");
var MUtilsIo = (function () {
    function MUtilsIo() {
    }
    MUtilsIo.prototype.chmodSync = function (sPath, iMode) {
        if (iMode == undefined) {
            iMode = 774;
        }
        fs.chmodSync(sPath, iMode);
    };
    MUtilsIo.prototype.upFilePath = function (sPath) {
        return glob.sync(this.pathNormalize(sPath));
    };
    MUtilsIo.prototype.upBaseName = function (sFile, sExt) {
        if (sExt == undefined) {
            sExt = this.upExtName(sFile);
        }
        return path.basename(sFile, sExt);
    };
    MUtilsIo.prototype.upExtName = function (sFile) {
        return path.extname(sFile);
    };
    MUtilsIo.prototype.flagExist = function (sPath) {
        return fs.existsSync(sPath);
    };
    MUtilsIo.prototype.mkdir = function (dirpath, mode) {
        var sFather = path.dirname(dirpath);
        if (!fs.existsSync(sFather)) {
            this.mkdir(sFather, mode);
        }
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, mode);
        }
        return true;
    };
    MUtilsIo.prototype.copyFileAsync = function (sSourcePath, sTargetPath) {
        this.mkdir(path.dirname(sTargetPath));
        fs.createReadStream(sSourcePath).pipe(fs.createWriteStream(sTargetPath));
    };
    MUtilsIo.prototype.listDir = function (sPath) {
        var aList = [];
        var stat = fs.statSync(sPath);
        if (stat.isDirectory()) {
            var readDir = fs.readdirSync(sPath);
            fs.readdirSync(sPath).forEach(function (file) {
                var aFiles = new MUtilsIo().listDir(path.join(sPath, file));
                if (aFiles.length > 0) {
                    aFiles.forEach(function (sName) {
                        aList.push(sName);
                    });
                    //aList.concat(aFiles);
                }
            });
        }
        else {
            aList.push(sPath);
        }
        return aList;
    };
    //根据文件读取配置项
    MUtilsIo.prototype.upConfigByFile = function (sPath) {
        var sContent = this.readFile(sPath);
        return JSON.parse(sContent);
    };
    //将配置写入配置文件
    MUtilsIo.prototype.inFileByConfig = function (sPath, oJson) {
        this.writeFile(sPath, JSON.stringify(oJson));
    };
    MUtilsIo.prototype.writeFile = function (sPath, sContent) {
        this.mkdir(path.dirname(sPath));
        fs.writeFileSync(sPath, sContent);
    };
    MUtilsIo.prototype.readFile = function (sPath) {
        return fs.readFileSync(sPath, 'UTF-8');
    };
    MUtilsIo.prototype.copyFile = function (sSource, sTarget) {
        this.mkdir(path.dirname(sTarget));
        fs.writeFileSync(sTarget, fs.readFileSync(sSource));
    };
    MUtilsIo.prototype.contentIndexOf = function (sPath, sStr) {
        var sContent = this.readFile(sPath);
        return sContent.indexOf(sStr);
    };
    MUtilsIo.prototype.contentReplaceWith = function (sPath, sReplace, sWith) {
        var sContent = this.readFile(sPath);
        //sContent=sContent.replace(sReplace,sWith);
        sContent = utilsString.replaceAll(sContent, sReplace, sWith);
        this.writeFile(sPath, sContent);
    };
    MUtilsIo.prototype.contentReplaceRemove = function (sPath, sStart, sEnd, sWith) {
        var sContent = this.readFile(sPath);
        sContent = utilsString.replaceBetween(sContent, sStart, sEnd, sWith, true);
        this.writeFile(sPath, sContent);
    };
    MUtilsIo.prototype.contentReplaceBetween = function (sPath, sStart, sEnd, sWith) {
        var sContent = this.readFile(sPath);
        var sWrite = utilsString.replaceBetween(sContent, sStart, sEnd, sWith, false);
        this.writeFile(sPath, sWrite);
        return sWrite === sContent;
    };
    MUtilsIo.prototype.insertAfter = function (sPath, sIndex, sInsert) {
        var sContent = this.readFile(sPath);
        var iIndex = sContent.indexOf(sIndex);
        var sWrite = sContent.substring(0, iIndex + sIndex.length) + sInsert + sContent.substr(iIndex + sIndex.length);
        this.writeFile(sPath, sWrite);
    };
    MUtilsIo.prototype.insertAppend = function (sPath, sInsert) {
        var sContent = this.readFile(sPath);
        var sWrite = sContent + sInsert;
        this.writeFile(sPath, sWrite);
    };
    MUtilsIo.prototype.parentPath = function (sPath) {
        return path.dirname(sPath);
    };
    MUtilsIo.prototype.parentTop = function (sPath, iLevel) {
        var sReturn = sPath;
        for (var i = 0; i < iLevel; i++) {
            sReturn = this.parentPath(sReturn);
        }
        return sReturn;
    };
    MUtilsIo.prototype.pathJoin = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var sReturn = '';
        args.forEach(function (arg) {
            sReturn = path.join(sReturn, arg);
        });
        return sReturn;
    };
    MUtilsIo.prototype.pathNormalize = function (sPath) {
        return path.normalize(sPath);
    };
    /**
     * 平台的文件路径分隔符，'\\' 或 '/'。
     */
    MUtilsIo.prototype.upPathSeq = function () {
        return path.sep;
    };
    MUtilsIo.prototype.upRowSeq = function () {
        return "\n";
    };
    return MUtilsIo;
}());
;
module.exports = new MUtilsIo();
