import fs = require('fs');
import path = require('path');
import utilsString = require("./string");
import glob = require('glob');

class MUtilsIo {


    chmodSync(sPath, iMode) {
        if (iMode == undefined) {
            iMode = 774;
        }
        fs.chmodSync(sPath, iMode);
    }

    upFilePath(sPath) {

        return glob.sync(this.pathNormalize(sPath));
    }


    flagExist(sPath) {
        return fs.existsSync(sPath);
    }
    mkdir(dirpath, mode?) {
        var sFather = path.dirname(dirpath);
        if (!fs.existsSync(sFather)) {
            this.mkdir(sFather, mode);
        }
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, mode);
        }

        return true;
    }

    copyFileAsync(sSourcePath, sTargetPath) {
        this.mkdir(path.dirname(sTargetPath));
        fs.createReadStream(sSourcePath).pipe(fs.createWriteStream(sTargetPath));
    }

    listDir(sPath) {
        var aList = [];


        var stat = fs.statSync(sPath);

        if (stat.isDirectory()) {
            var readDir = fs.readdirSync(sPath);
            fs.readdirSync(sPath).forEach(
                function (file) {
                    var aFiles = new MUtilsIo().listDir(path.join(sPath, file));
                    if (aFiles.length > 0) {
                        aFiles.forEach(
                            function (sName) {
                                aList.push(sName);
                            }
                        );
                        //aList.concat(aFiles);
                    }
                }
            )
        } else {
            aList.push(sPath);
        }

        return aList;

    }
    //根据文件读取配置项
    upConfigByFile(sPath) {
        var sContent = this.readFile(sPath);
        return JSON.parse(sContent);
    }
    //将配置写入配置文件
    inFileByConfig(sPath, oJson) {
        this.writeFile(sPath, JSON.stringify(oJson));
    }


    writeFile(sPath, sContent) {

        this.mkdir(path.dirname(sPath));
        fs.writeFileSync(sPath, sContent);

    }
    readFile(sPath) {
        return fs.readFileSync(sPath, 'UTF-8');
    }
    copyFile(sSource, sTarget) {
        this.mkdir(path.dirname(sTarget));
        fs.writeFileSync(sTarget, fs.readFileSync(sSource));

    }

    contentIndexOf(sPath, sStr) {
        var sContent = this.readFile(sPath);
        return sContent.indexOf(sStr);

    }

    contentReplaceWith(sPath, sReplace, sWith) {
        var sContent = this.readFile(sPath);

        //sContent=sContent.replace(sReplace,sWith);
        sContent = utilsString.replaceAll(sContent, sReplace, sWith);
        this.writeFile(sPath, sContent);

    }
    contentReplaceRemove(sPath, sStart, sEnd, sWith) {

        var sContent = this.readFile(sPath);

        sContent = utilsString.replaceBetween(sContent, sStart, sEnd, sWith, true);

        this.writeFile(sPath, sContent);
    }

    contentReplaceBetween(sPath, sStart, sEnd, sWith) {
        var sContent = this.readFile(sPath);
        var sWrite = utilsString.replaceBetween(sContent, sStart, sEnd, sWith, false);

        this.writeFile(sPath, sWrite);
        return sWrite === sContent;
    }


    insertAfter(sPath, sIndex, sInsert) {
        var sContent = this.readFile(sPath);
        var iIndex = sContent.indexOf(sIndex);
        var sWrite = sContent.substring(0, iIndex + sIndex.length) + sInsert + sContent.substr(iIndex + sIndex.length);
        this.writeFile(sPath, sWrite);
    }
    insertAppend(sPath, sInsert) {
        var sContent = this.readFile(sPath);

        var sWrite = sContent + sInsert;
        this.writeFile(sPath, sWrite);
    }

    parentPath(sPath) {
        return path.dirname(sPath);
    }


    parentTop(sPath: string, iLevel: number) {
        var sReturn = sPath;
        for (var i = 0; i < iLevel; i++) {
            sReturn = this.parentPath(sReturn);
        }
        return sReturn;
    }

    pathJoin(...args) {

        var sReturn = '';
        args.forEach(function (arg) {
            sReturn = path.join(sReturn, arg);
        });

        return sReturn;
    }
    pathNormalize(sPath) {
        return path.normalize(sPath);
    }



};


export =new MUtilsIo();

