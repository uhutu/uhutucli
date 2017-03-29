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
        resourcePath: "[@config:define.cliSpace]/resources"
    },
    appReact: {
        appType: "react",
        workName: "[@config:appReact.appType][@config:project.projectName]",
        workPath: "[@config:define.workSpace]/[@config:appReact.workName]"
    },
    file: {
        reactPackage: "[@config:appReact.workPath]/package.json",
        reactPlugPath: "[@config:define.resourcePath]/files-local/react-plug",
        reactIosWork: "[@config:appReact.workPath]/ios",
        reactIosInfoPlist: "[@config:file.reactIosWork]/[@config:appReact.workName]/Info.plist",
        reactAndroidWork: "[@config:appReact.workPath]/android",
        reactAndroidStringXml: "[@config:file.reactAndroidWork]/app/src/main/res/values/strings.xml"
    },
    //react插件相关配置
    plugs: {
        "uhutu_version": {
            "name": "uhutu-version",
            "json": "[@config:file.reactPlugPath]/uhutu_version.json"
        },
        "uhutu_speed": {
            "name": "uhutu-speed",
            "json": "[@config:file.reactPlugPath]/uhutu_speed.json"
        },
        "socket_io": {
            "name": "socket.io",
            "version": "1.5.1"
        },
        "code_push": {
            "name": "react-native-code-push",
            "version": "1.17.0-beta",
            "json": "[@config:file.reactPlugPath]/code_push.json"
        },
        "rn_elements": {
            "name": "react-native-elements",
            "version": "0.9.2"
        },
        "vector_icons": {
            "name": "react-native-vector-icons",
            "version": "4.0.0",
            "json": "[@config:file.reactPlugPath]/vector_icons.json"
        },
        "router_flux": {
            "name": "react-native-router-flux",
            "version": "3.38.0"
        },
        "rn_webrtc": {
            "name": "react-native-webrtc",
            "version": "github:liudongpu/react-native-webrtc",
            "json": "[@config:file.reactPlugPath]/rn_webrtc.json"
        },
        "rn_storage": {
            "name": "react-native-storage",
            "version": "0.1.5"
        },
        /*
         "rn_realm": {
          "name": "realm",
          "version": "1.0.2",
          "json": "[@config:file.reactPlugPath]/rn_realm.json"
        },
        */
        "rn_sound": {
            "name": "react-native-sound",
            "version": "0.9.0",
            "json": "[@config:file.reactPlugPath]/rn_sound.json"
        },
    }
};
var MAimLocalEnv = (function () {
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
