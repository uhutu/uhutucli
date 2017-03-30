

export class MprocessParseFile {

    parseType: string

    fileContent: string

    fileBasename: string

}


export class MtransformPageOut {
    content: string[] = []
    //pageConfig: AB.IbasePageConfig
    sourceFile: MprocessParseFile
}


/**
 * 处理转换接口
 */
export interface IparseProcessWork{



}
