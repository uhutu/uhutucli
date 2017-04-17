import {
    PlusOperateForm,
    PlusOperatePage
} from 'uhutu-plus';

import {
    Platform
} from 'react-native';
/**
 * 顶级操作类  该类由uhutucli项目维护并自动生成 请勿修改
 * 
 * @export
 * @class TopSupport
 */
export default class {

    static pageNav(sPage, that) {
        //that.props.navigation.navigate(sPage);
        PlusOperatePage.pageNaviger(that, sPage);

    }

    static upFLagAndroid() {
        return Platform.OS === 'android';

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


    static submitForm(that, sFormName) {


        PlusOperateForm.submitFormData(sFormName);

        //PlusCommonWidget.msgAlert(JSON.stringify(o));


    }


}