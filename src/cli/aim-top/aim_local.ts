export interface IAimLocalNexusEnv {

    /**
     * start文件所在的路径
     */
    pathStart: string
    /**
     * uhutu-cli目录
     */
    pathCli: string
    /**
     * 项目路径
     */
    pathCwd: string

    fileConfig: string

    dirTemplateInit: string

    /**
     * 参数 是否初始化
     */
    argsConfig: boolean

    /**
     * 安装初始化
     */
    argsInstall: boolean

    /**
     * 是否强制操作  该操作执行会强制覆盖
     */
    argsForce: boolean

    /**
     * 是否强制操作  该操作执行会强制覆盖
     */
    argsLog: string

    /**
     * 是否编译操作  该操作会执行编译
     */
    argsBuild:boolean

}




export interface IAimLocalConfig {

    /**
     * 环境变量  该配置项一般不要引用 请引用define下的定义路径等参数
     */
    env: IAimLocalNexusEnv | null


    params: any

    /**
     * 系统定义  该配置由系统自动生成  请勿赋值 供各种读取使用
     */
    define: IaimLocalNexusDefine

    /**
     * 项目的配置
     */
    project: IAimLocalNexusProject

    /**
     * react的应用定义
     */
    appReact: IAimLocalNexusApp

    /**
     * 各种的路径
     */
    file: IAimLocalNexusFile

    inc:IAimLocalNexusInc

    plugs: any
}


export interface IAimLocalNexusProject {

    /**
     * 项目名称
     */
    projectName: string

    /**
     * 命名空间
     */
    domainSpace: string


    /**
     * 项目版本号
     */
    versionName: string
    /**
     * 版本编译号 每次更新需加1
     */

    versionBuild: number
    /**
     * 中文显示名称
     */
    displayName: string

}

export interface IaimLocalNexusDefine {

    /**
     * 当前所在工作目录
     */
    workSpace: string
    /**
     * Cli所在目录
     */
    cliSpace: string
    /**
     * 资源文件所在根目录
     */
    resourcePath: string
    /**
     * 开发代码目录
     */
    devPath:string
    /**
     * 工程输出目录
     */
    diskPath:string

}

export interface IAimLocalNexusFile {

    /**
     * react的package.json文件的路径
     */
    reactPackage: string
    /**
     * react插件配置目录
     */
    reactPlugPath: string
    /**
     * ios项目的配置文件
     */
    reactIosInfoPlist: string
    /**
     * android项目的资源文件
     */
    reactAndroidStringXml: string

    /**
     * android项目目录
     */
    reactAndroidWork: string

    /**
     * ios项目目录
     */
    reactIosWork: string

    /**
     * 工程配置文件输出
     */
    diskConfigFile:string

}




/**
 * 应用的定义
 */
export interface IAimLocalNexusApp {
    /**
     * 应用的类型
     */
    appType: string
    /**
     * 应用的名称
     */
    workName: string
    /**
     * 应用所在目录
     */
    workPath: string

    /**
     * 应用编译目录
     */
    buildPath:string
    /**
     * 加载的处理逻辑文件
     */
    mouldPath:string

}

/**
 * 应用的定义
 */
export interface IAimLocalNexusInc {
    /**
     * 项目页面目录
     */
    projectPage:string

}









/**
 * 定义初始化类
 */
export interface IAimLocalInit {

    initStart(envs: IAimLocalNexusEnv)

}



export interface IInitProject extends IAimLocalInit {

    flagExistConfig(envs: IAimLocalNexusEnv): boolean

}