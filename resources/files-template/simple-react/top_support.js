import {PlusFunc} from 'uhutu-plus';

import {Platform} from 'react-native';  
/**
 * 顶级操作类  该类由uhutucli项目维护并自动生成 请勿修改
 * 
 * @export
 * @class TopSupport
 */
export default class {

    static pageNav(sPage,that){
        that.props.navigation.navigate(sPage);

    }

    static upFLagAndroid(){
        return Platform.OS === 'android';

    }
    

}