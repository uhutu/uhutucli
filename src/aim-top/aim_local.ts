export class MAimLocalEnv {

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

    fileConfig="config.json"

    dirTemplateInit="files-template/project-init"

    /**
     * 参数 是否初始化
     */
    argsInit:boolean=false

}




export class MAimLocalConfig{


    env:MAimLocalEnv


}






/**
 * 定义初始化类
 */
export interface IAimLocalInit{

    initStart(envs:MAimLocalEnv)

}



export interface IInitProject extends IAimLocalInit{

    flagExistConfig(envs:MAimLocalEnv):boolean

}