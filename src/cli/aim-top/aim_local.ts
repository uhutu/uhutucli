export interface IAimLocalEnv {

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
    argsInit:boolean

}




export interface IAimLocalConfig{


    env:IAimLocalEnv


}






/**
 * 定义初始化类
 */
export interface IAimLocalInit{

    initStart(envs:IAimLocalEnv)

}



export interface IInitProject extends IAimLocalInit{

    flagExistConfig(envs:IAimLocalEnv):boolean

}