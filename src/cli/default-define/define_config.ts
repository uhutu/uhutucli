import * as AimLocal from "../../cli/aim-top/aim_local";



let currentConfig: AimLocal.IAimLocalConfig = {
    env: null,

    project: {

        projectName: "demo"
    },
    define: {

        workSpace: "[@config:env.pathCwd]",
        cliSpace:"[@config:env.pathCli]",
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
        reactIosInfoPlist:"[@config:appReact.workPath]/ios/[@config:appReact.workName]/Info.plist",
        reactAndroidStringXml:"[@config:appReact.workPath]/android/app/src/main/res/values/strings.xml"
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
        /*
        "rn_mipush": {
          "name": "react-native-mipush",
          "version": "0.2.0",
          "json": "[@config:file.reactPlugPath]/rn_mipush.json"
        }
        */

    }
}


class MAimLocalEnv {
    upConfig(oEnv: AimLocal.IAimLocalNexusEnv): AimLocal.IAimLocalConfig {


        let defineConfig: AimLocal.IAimLocalConfig = currentConfig;

        defineConfig.env = oEnv;



        return defineConfig;
    }
}






export =new MAimLocalEnv();
