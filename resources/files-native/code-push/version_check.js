import CodePush from "react-native-code-push";
import {
  Alert,
  AsyncStorage
} from 'react-native';

const top_version_update_key = "root_top_version_update_info_key";

export default class VersionCheck {

  static checkUpdate(that) {

    try {

      CodePush.sync({
          //installMode: CodePush.InstallMode.IMMEDIATE
        },
        (status) => {
          switch (status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              //更新前判断是否强制更新 如果是强制更新提示更新框
              CodePush.checkForUpdate().then((update) => {
                if (update) {
                  if (update.isMandatory) {
                    Alert.alert('', '正在更新中，请稍候……', [{
                      text: ' '
                    }]);
                  }
                  AsyncStorage.setItem(top_version_update_key, JSON.stringify(update));
                }
              });
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              // Hide "downloading" modal
              break;
          }
        }
      );




    } catch (e) {
      console.log(e);
    }


  }


  static upVersionInfo(fCallBack) {


    AsyncStorage.getItem(top_version_update_key, (error, result) => {
      if (result) {
        fCallBack(JSON.parse(result));
      } else {
        CodePush.getCurrentPackage()
          .then((update) => {
            fCallBack(update)
          });
      }

    });


  }


}