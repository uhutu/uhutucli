"use strict";
var currentConfig = {
    env: null,
    params: {
        codepushServer: "https://code-push.srnpr.com/",
        codepushKeyIos: "",
        codepushKeyAndroid: ""
    },
    project: {
        projectName: "demo",
        domainSpace: "com.uhutu.react.[@config:project.projectName]",
        versionName: "1.0.0",
        versionBuild: 1,
        displayName: "demodisplay"
    },
    define: {
        workSpace: "[@config:env.pathCwd]",
        cliSpace: "[@config:env.pathCli]",
        resourcePath: "[@config:define.cliSpace]/resources",
        devPath: "[@config:env.pathCwd]/dev",
        diskPath: "[@config:env.pathCwd]/disk"
    },
    inc: {
        projectPage: "pages",
        projectStatic: "statics"
    },
    appReact: {
        appType: "react",
        workName: "[@config:appReact.appType][@config:project.projectName]",
        workPath: "[@config:define.workSpace]/[@config:appReact.workName]",
        buildPath: "[@config:appReact.workPath]/project/",
        mouldPath: "[@config:define.resourcePath]/files-project/mould-file/[@config:appReact.appType].json",
        plugInfo: "[@config:define.resourcePath]/files-project/plug-info/[@config:appReact.appType]_plug.json",
        disable: false
    },
    appVue: {
        appType: "vue",
        workName: "[@config:appVue.appType][@config:project.projectName]",
        workPath: "[@config:define.workSpace]/[@config:appVue.workName]",
        buildPath: "[@config:appVue.workPath]",
        mouldPath: "[@config:define.resourcePath]/files-project/mould-file/[@config:appVue.appType].json",
        plugInfo: "[@config:define.resourcePath]/files-project/plug-info/[@config:appVue.appType]_plug.json",
        disable: false
    },
    appWeapp: {
        appType: "weapp",
        workName: "[@config:appWeapp.appType][@config:project.projectName]",
        workPath: "[@config:define.workSpace]/[@config:appWeapp.workName]",
        buildPath: "[@config:appWeapp.workPath]",
        mouldPath: "[@config:define.resourcePath]/files-project/mould-file/[@config:appWeapp.appType].json",
        plugInfo: "[@config:define.resourcePath]/files-project/plug-info/[@config:appWeapp.appType]_plug.json",
        disable: false
    },
    file: {
        diskConfigFile: "[@config:define.diskPath]/disk_config.json",
        reactPackage: "[@config:appReact.workPath]/package.json",
        reactStartPage: "./project/simple/main/layout/index",
        reactPlugPath: "[@config:define.resourcePath]/files-project/react-plug",
        vuePlugPath: "[@config:define.resourcePath]/files-project/vue-plug",
        reactIosWork: "[@config:appReact.workPath]/ios",
        reactIosInfoPlist: "[@config:file.reactIosWork]/[@config:appReact.workName]/Info.plist",
        reactAndroidWork: "[@config:appReact.workPath]/android",
        reactAndroidStringXml: "[@config:file.reactAndroidWork]/app/src/main/res/values/strings.xml"
    },
    /**
     * 参考plugInfo的定义
     */
    plugReact: {},
    plugVue: {},
    system: {
        editionCode: 1001,
        cliVersion: ''
    }
};
var MAimLocalEnv = /** @class */ (function () {
    function MAimLocalEnv() {
    }
    MAimLocalEnv.prototype.upConfig = function (oEnv) {
        var defineConfig = currentConfig;
        defineConfig.env = oEnv;
        return defineConfig;
    };
    return MAimLocalEnv;
}());
module.exports = new MAimLocalEnv();
