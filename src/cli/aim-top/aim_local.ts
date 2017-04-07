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
    argsBuild: boolean

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
     * react的应用定义
     */
    appVue: IAimLocalNexusApp

    /**
     * 小程序的应用定义
     */
    appWeapp: IAimLocalNexusApp

    /**
     * 各种的路径
     */
    file: IAimLocalNexusFile
    /**
     * 应用的常量定义  该配置项不应修改
     */
    inc: IAimLocalNexusInc

    /**
     * react的模块功能
     */
    plugReact: IAimLocalNexusPlug

    system: IAimLocalNexusSystem
}



/**
 * 系统的定义
 */
export interface IAimLocalNexusPlug {


}

/**
 * 插件的定义标记
 */
export interface IAimLocalNexusPlugDefine {
    name: string
    version: string
    json: string
    disable: boolean


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
    devPath: string
    /**
     * 工程输出目录
     */
    diskPath: string

}

export interface IAimLocalNexusFile {

    /**
     * react的package.json文件的路径
     */
    reactPackage: string
    /**
     * react的启动页
     * 
     * @type {string}
     * @memberOf IAimLocalNexusFile
     */
    reactStartPage:string
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
    diskConfigFile: string

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
    buildPath: string
    /**
     * 加载的处理逻辑文件
     */
    mouldPath: string

    /**
     * 加载的插件配置文件
     */
    plugInfo:string

}

/**
 * 应用的定义
 */
export interface IAimLocalNexusInc {
    /**
     * 项目页面目录
     */
    projectPage: string
    /**
     * 静态资源目录
     */
    projectStatic:string

}



/**
 * 系统的定义
 */
export interface IAimLocalNexusSystem {
    /**
     * 系统当前版本 该参数用于代码升级兼容历史版本使用 
     */
    editionCode: number

}



/**
 * 插件的设置值 该接口仅用于命名的标记  无实际用途
 */
export interface IAimLocalPlugSet {
    /**
     * 描述信息
     */
    desc:string[]

    /**
     * 日志编号
     * 
     * @type {number}
     * @memberOf IAimLocalPlugSet
     */
    logCode:number

    /**
     * 日志参数
     * 
     * @type {string[]}
     * @memberOf IAimLocalPlugSet
     */
    logParams:string[]

    
    key:string
    value:string
    /**
     * 名称
     * 
     * @type {string}
     * @memberOf IAimLocalPlugSet
     */
    name:string
    /**
     * 属性
     * 
     * @type {any[]}
     * @memberOf IAimLocalPlugSet
     */
    attr:any[]
    /**
     * 文件路径
     * 
     * @type {string}
     * @memberOf IAimLocalPlugSet
     */
    filePath:string

    /**
     * 目标路径
     */
    targetPath:string

    /**
     * 替换源文本
     * 
     * @type {string}
     * @memberOf IAimLocalPlugSet
     */
    replaceText:string
    /**
     * 替换后内容
     * 
     * @type {string}
     * @memberOf IAimLocalPlugSet
     */
    withText:string
    /**
     * 内容
     * 
     * @type {string[]}
     * @memberOf IAimLocalPlugSet
     */
    contentInfo:string[]
    /**
     * 
     * 开始标记
     * @type {string}
     * @memberOf IAimLocalPlugSet
     */
    begin:string
    /**
     * 结束标记
     * 
     * @type {string}
     * @memberOf IAimLocalPlugSet
     */
    end:string
    /**
     * 注释的类型
     * 
     * @type {number}
     * @memberOf IAimLocalPlugSet
     */
    noteType:number
    /**
     * 操作类型
     * 
     * @type {number}
     * @memberOf IAimLocalPlugSet
     */
    optType:number

}

/**
 * 插件的设置
 */
export interface IAimLocalPlugExec {
    
    exec:string
    disable:boolean
    set:IAimLocalPlugSet

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