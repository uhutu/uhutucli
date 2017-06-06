
import * as CTF from "../../project/aim-project/aim_parse";

class CappElms implements CTF.ItransformElmentProcess {


    upProcess(oTransform: CTF.ItransformParse, oItem: CTF.ItransformItemInfo) {



        return new CTF.MtransformParseHelper().upBaseElm(oTransform, oItem);
    }


}



class CappSub implements CTF.ItransformSubExtend {
    static styleParse(sClassStyle) {

        var aStyle = [];

        sClassStyle.split(' ').forEach(
            function (f) {
                //判断如果有点 则是特殊定义操作
                if (f.indexOf('.') > -1) {
                    aStyle.push(f);
                }
                else {
                    aStyle.push( f);
                }

            }
        );
        
        return aStyle.length > 1 ? (aStyle.join(' ')) : aStyle[0];

    }

    formNameParse(sName:string)
    {
        return ""+sName+"";
    }

    attrParse(oItem: CTF.ItransformItemInfo) {


        oItem.sourceAttr.forEach(function (value, key) {
            
            if (key === "class") {
                
                
                oItem.targetAttr.set("class", "\"" + oItem.sourceAttr.get("class")  + "\"");

                

            }
        });

        return oItem;
    }
}


class CappOut implements CTF.ItransFormatOut {

    contentFormat(oOut: CTF.MtransformPageOut) {
        return oOut;
    }

}

class MappParse implements CTF.ItransformParse {
    elms = new CappElms();
    inc = {
        attr_replace: " {key}={value} "
    }
    parses = new CappSub();
    mould
    pageConfig = new CTF.MbasePageConfig();

    outFormat = new CappOut();
}




export =new MappParse();