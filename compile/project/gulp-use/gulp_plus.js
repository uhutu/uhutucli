"use strict";
var CommonUtil = require("../../base/common/util");
var AimParse = require("../../project/aim-project/aim_parse");
var through = require("through2");
var gutil = require("gulp-util");
var ParseHtml = require("../../project/gulp-use/parse_html");
var Mexport = (function () {
    function Mexport() {
    }
    Mexport.prototype.gulpContent = function (oLocalConfig, sType) {
        return through.obj(function (file, enc, cb) {
            // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
            if (file.isNull()) {
                this.push(file);
                return cb();
            }
            // 插件不支持对 Stream 对直接操作，跑出异常
            if (file.isStream()) {
                this.emit('error', new gutil.PluginError("GulpPlus", 'Streaming not supported'));
                return cb();
            }
            // 将文件内容转成字符串，并调用 preprocess 组件进行预处理
            // 然后将处理后的字符串，再转成Buffer形式
            var oParseFile = new AimParse.MprocessParseFile();
            oParseFile.parseType = sType;
            oParseFile.fileContent = file.contents;
            oParseFile.fileBasename = CommonUtil.utilsIo.upBaseName(file.relative, undefined);
            //var content = initWork.parseContent(oConfig, oParseFile);
            var content = ParseHtml.contentParse(oLocalConfig, oParseFile);
            file.contents = new Buffer(content);
            // 下面这两句基本是标配啦，可以参考下 through2 的API
            this.push(file);
            cb();
        });
    };
    return Mexport;
}());
module.exports = new Mexport();
