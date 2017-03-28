export interface IAimLocalEnv {

    //项目路径
    dirPath: string

    //命令行参数
    argStart:{
        init:boolean
    }



}


/**
 * 定义初始化类
 */
export interface IAimLocalInit{

    initStart(envs:IAimLocalEnv)

}