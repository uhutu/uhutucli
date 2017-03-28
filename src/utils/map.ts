



class MutilsMap {


    initMap(oAttr){

        var mMap = new Map<string, string>();
        for (let k in oAttr) {
            mMap.set(k, oAttr[k]);
        }
        return mMap;
    }


    formatMapbyObject(oObject: Object, sPropName: string): Map<string, string> {

        var oMap = new Map<string, string>();


        if (oObject.hasOwnProperty(sPropName)) {


            for (var sKey in oObject[sPropName]) {

                var sVal = oObject[sPropName][sKey];

                oMap.set(sKey, sVal);
            }


        }



        return oMap;
    }


}

export = new MutilsMap();


