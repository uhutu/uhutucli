import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import * as AimParse from "../../project/aim-project/aim_parse";

import through = require('through2');
import gutil = require('gulp-util');

import ParseHtml = require("../../project/gulp-use/parse_html");

class Mexport {


    gulpContent(oLocalConfig: AimLocal.IAimLocalConfig, sType: string) {


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
            let content = ParseHtml.contentParse(oLocalConfig, oParseFile);

            file.contents = new Buffer(content);


            // 下面这两句基本是标配啦，可以参考下 through2 的API
            this.push(file);

            cb();
        });


    }

}


export =new Mexport();