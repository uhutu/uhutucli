var M = {
    temp: {
        EMPTY: "",
        INDEX_NOT_FOUND: -1
    },
    isEmpty: function (cs) {
        return cs == undefined || cs == null || cs.length == 0;
    },
    formatString: function (sString, oArgs) {
        var result = sString;
        if (oArgs != undefined) {
            if (oArgs instanceof Array) {
                for (var i = 0; i < oArgs.length; i++) {
                    if (oArgs[i] != undefined) {
                        //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                        var reg = new RegExp("\\{" + i + "\\}", "g");
                        result = result.replace(reg, oArgs[i]);
                    }
                }
            }
            else if (typeof (oArgs) == "string") {
                result = result.replace(/\{0\}/g, oArgs);
            }
            else if (typeof (oArgs) == "object") {
                for (var key in oArgs) {
                    if (oArgs[key] != undefined) {
                        var reg = new RegExp("(\\{" + key + "\\})", "g");
                        result = result.replace(reg, oArgs[key]);
                    }
                }
            }
        }
        return result;
    },
    substringAfterLast: function (str, separator) {
        if (this.isEmpty(str)) {
            return str;
        }
        if (this.isEmpty(separator)) {
            return this.temp.EMPTY;
        }
        var pos = str.lastIndexOf(separator);
        if (pos == this.temp.INDEX_NOT_FOUND
            || pos == str.length - separator.length) {
            return this.temp.EMPTY;
        }
        return str.substring(pos + separator.length);
    },
    contains: function (seq, searchSeq) {
        return seq.indexOf(searchSeq) > this.temp.INDEX_NOT_FOUND;
    },
    //替换内容中间的   fRemove标记是否将Start和end去掉
    replaceBetween: function (sInString, sStart, sEnd, sWith, fRemove) {
        //var reg=new RegExp("("+sStart.replace('/','\/')+")[\s\S]*?("+sEnd.replace('/','\/')+")","gm");
        //console.log(/(\/\/UhutuIncCodeClassAutoBegin)*?(\/\/UhutuIncCodeClassAutoEnd)/gm.test(sInString));
        //console.log(reg.test("//UhutuIncCodeClassAutoBegin//UhutuIncCodeClassAutoEnd"));
        var reg = new RegExp('(' + sStart + ')(.|\s|\S|\n)*?(' + sEnd + ')', 'gm');
        //console.log(reg.test(sInString));
        return sInString.replace(reg, (fRemove ? '' : sStart) + sWith + (fRemove ? '' : sEnd));
    },
    upSpace: function (iNumber) {
        var aStr = [];
        for (var i = 0; i < iNumber; i++) {
            aStr.push(' ');
        }
        return aStr.join('');
    },
    replaceAll: function (sInString, sReplace, sWith) {
        var sReturn = sInString.replace(new RegExp(sReplace, 'gm'), sWith);
        return sReturn;
    }
};
export=M;
