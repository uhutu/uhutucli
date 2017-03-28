export class MAimLocalEnv {

    /**
     * 执行文件目录
     */
    dirPath: string
    /**
     * 项目路径
     */
    cwdPath:string




    argsInit:boolean





}


/**
 * 定义初始化类
 */
export interface IAimLocalInit{

    initStart(envs:MAimLocalEnv)

}