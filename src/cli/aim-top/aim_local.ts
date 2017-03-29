export interface IAimLocalNexusEnv {

    /**
     * start文件所在的路径
     */
    pathStart:string
    /**
     * uhutu-cli目录
     */
    pathCli: string
    /**
     * 项目路径
     */
    pathCwd:string

    fileConfig:string

    dirTemplateInit:string

    /**
     * 参数 是否初始化
     */
    argsConfig:boolean

    /**
     * 安装初始化
     */
    argsInstall:boolean

    /**
     * 是否强制操作  该操作执行会强制覆盖
     */
    argsForce:boolean

}




export interface IAimLocalConfig{


    envs:IAimLocalNexusEnv

    queues:IAimLocalNexusQueue[]


}


export interface IAimLocalNexusQueue{

    workName:string

}








/**
 * 定义初始化类
 */
export interface IAimLocalInit{

    initStart(envs:IAimLocalNexusEnv)

}



export interface IInitProject extends IAimLocalInit{

    flagExistConfig(envs:IAimLocalNexusEnv):boolean

}