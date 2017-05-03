import {
    PlusOperateForm,
    PlusCommonWidget,
    PlusOperatePage
} from 'uhutu-plus';

import {
    Platform,
    NetInfo
} from 'react-native';
/**
 * 顶级操作类  该类由uhutucli项目维护并自动生成 请勿修改
 * 
 * @export
 * @class TopSupport
 */
export default class {

    static msgAlert(sMessage) {
        PlusCommonWidget.msgAlert(sMessage);
    }

    static pageNav(sPage, that) {
        //that.props.navigation.navigate(sPage);
        PlusOperatePage.pageNaviger(that, sPage);

    }

    static pageBack() {
        this.pageNav('?base_jump=back');
    }

    static upFLagAndroid() {
        return Platform.OS === 'android';

    }

    static NetConnectDone(fCallBack) {
        /*
        NetInfo.isConnected.fetch().done((isConnected) => {
            fCallBack(isConnected);
        });
        */
        return NetInfo.fetch().then((reach) => {
            this.msgAlert(reach);

            return reach.toLowerCase() != "none";

        });
    }



    static initPage(that, oPageProperty) {


        if (oPageProperty.formNames != undefined) {
            this.initForm(that, oPageProperty.formNames.join(','));
        }

    }


    static initForm(that, sFormName) {

        PlusOperateForm.initPageForm({
            formName: sFormName,
            formPage: PlusOperatePage.upNavigerValue(that, 'url')
        });
        //that.rootAsyncShow();
        //PlusOperatePage.asyncShowPage(that);
    }





}