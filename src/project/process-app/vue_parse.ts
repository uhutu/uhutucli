
import * as CTF from "../../project/aim-project/aim_parse";

class CappElms implements CTF.ItransformElmentProcess {


    upProcess(oTransform: CTF.ItransformParse, oItem: CTF.ItransformItemInfo) {



        return new CTF.MtransformParseHelper().upBaseElm(oTransform, oItem);
    }


}



class CappSub implements CTF.ItransformSubExtend {



    attrParse(oItem: CTF.ItransformItemInfo) {


        oItem.sourceAttr.forEach(function (value, key) {
            oItem.targetAttr.set(key, value);
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
        attr_replace: " {key}=\"{value}\" "
    }
    parses = new CappSub();
    mould
    pageConfig = new CTF.MbasePageConfig();

    outFormat = new CappOut();
}




export =new MappParse();