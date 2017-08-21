import CommonRoot = require("../../base/common/root");
import CommonUtil = require("../../base/common/util");

import * as AimLocal from "../../cli/aim-top/aim_local";
import * as AimParse from "../../project/aim-project/aim_parse";


interface IregexMath {
    regStr: string
    regReplace: string
}

class Mexport {



    scssParse(oLocalConfig: AimLocal.IAimLocalConfig, oParseFile: AimParse.MprocessParseFile): string {


        let sContent = oParseFile.fileContent;



        let regList: IregexMath[] = [];

        regList.push({ regStr: '(align-items: center;)', regReplace: '$1 display:flex;' });
        regList.push({ regStr: '(flex-direction:\\s?row;)', regReplace: '$1 display:flex;' });
        
        regList.push({ regStr: 'line-height:(\\s?\\d*);', regReplace: 'line-height:$1px;' });
        //regList.push({regStr:'',regReplace:''});

        return this.replaceRegex(sContent, regList);


    }


    replaceRegex(sContent, regList: IregexMath[]) {
        regList.forEach((fItem) => {
            sContent = sContent.replace(new RegExp(fItem.regStr, 'igm'), fItem.regReplace);
        })

        return sContent;
    }



}


export =new Mexport();